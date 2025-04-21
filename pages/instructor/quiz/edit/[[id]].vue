<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app'
import type { InstructorQuizQuestionList } from '#components'
import { QuestionType, type QuestionOption, type Quiz, type QuizPayload, type QuizUpdatePayload } from '~/types/quiz'

definePageMeta({
  middleware: 'is-instructor',
})

const quiz: Quiz = reactive(baseQuiz())
const currentQuestionIndexOnEdit = ref(0)

const route = useRoute()
const { id } = route.params

const edit_response = ref<{
  data: Ref<QuizPayload | null>
  refresh: () => Promise<void>
  execute: () => Promise<void>
  clear: () => void
  error: Ref<any>
  status: Ref<AsyncDataRequestStatus>
} | null>(null)
if (id) {
  edit_response.value = await useApiUseFetch<QuizPayload>(`/quiz/${id}`, { lazy: true })
}
watch(() => edit_response?.value?.status, (new_status) => {
  if (new_status !== 'success') return
  if (!edit_response.value?.data) return
  formatQuizToEdit(edit_response.value.data)
})

function formatQuizToEdit(payload: QuizPayload) {
  quiz.title = payload.title
  quiz.questions = payload.questions.map(q => {
    const options = q.options.map(o => ({
      ...o,
      id: o.public_id,
    }))
    return {
      ...q,
      id: q.public_id,
      options: q.options.map(o => ({
        ...o,
        id: o.public_id,
      })),
      multi_choice_options: q.type === QuestionType.MULTI_CHOICE
        ? options
        : [
          baseOption(),
          baseOption(),
          baseOption(),
          baseOption(),
        ],
      true_or_false_options: q.type === QuestionType.TRUE_OR_FALSE
        ? options
        : [baseOption("Verdadeiro"), baseOption("Falso")]
    }
  })
}

function selectQuestion(questionIndex: number) {
  currentQuestionIndexOnEdit.value = questionIndex
}

const questionListRef: Ref<InstanceType<typeof InstructorQuizQuestionList> | null> = ref(null)

function addQuestion() {
  quiz.questions.push(baseQuestion())
  nextTick(() => {
    const el = questionListRef?.value?.$el
    if (el instanceof HTMLElement) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    }
    selectQuestion(quiz.questions.length - 1)
  })
}

function removeQuestion(questionId: string | number) {
  quiz.questions = quiz.questions.filter(q => q.id !== questionId)
  if (!quiz.questions.length)
    quiz.questions.push(baseQuestion())
  if (currentQuestionIndexOnEdit.value >= quiz.questions.length) currentQuestionIndexOnEdit.value = quiz.questions.length - 1
}

const toast = useNuxtApp().$toast

function isValidTitle(quiz: QuizUpdatePayload) {
  const result = quiz.title.trim().length > 0
  if (!result) toast.error('Título do quiz é obrigatório', { autoClose: 5000 })
  return result
}

function isValidQuestionsDescription(quiz: QuizUpdatePayload) {
  let result = true
  for (const [index, question] of quiz.questions.entries()) {
    if (question.description.trim().length <= 0) {
      result = false;
      toast.error(`Questão ${index + 1}: informe uma descrição`, { autoClose: 5000 })
      continue
    }
  }
  return result
}

function isValidOptionsDescription(quiz: QuizUpdatePayload) {
  let result = true
  for (const [index, question] of quiz.questions.entries()) {
    if (question.type === QuestionType.TEXT) continue
    if (question.options.some(o => o.description.trim().length <= 0)) {
      result = false;
      toast.error(
        `Questão ${index + 1}: informe todas as opções de resposta`,
        { autoClose: 5000 }
      )
    }
  }
  return result
}

function isValidQuestionsCorrectAnswers(quiz: QuizUpdatePayload) {
  let result = true
  for (const [index, question] of quiz.questions.entries()) {
    if (question.type === QuestionType.TEXT && question.correct_text_answer.trim().length <= 0) {
      result = false;
      toast.error(`Questão ${index + 1}: informe resposta correta`, { autoClose: 5000 })
      continue
    }
    if (question.type !== QuestionType.TEXT && !question.options.some(o => o.is_correct_answer)) {
      result = false;
      toast.error(`Questão ${index + 1}: informe resposta correta`, { autoClose: 5000 })
    }
  }
  return result
}

function isValidQuiz(quiz: QuizUpdatePayload) {
  const validations = [
    isValidTitle(quiz),
    isValidQuestionsDescription(quiz),
    isValidOptionsDescription(quiz),
    isValidQuestionsCorrectAnswers(quiz)
  ]
  return validations.every(result => result)
}

function formatQuizToSave(quiz: Quiz): QuizUpdatePayload {
  return {
    ...quiz,
    title: quiz.title.trim(),
    questions: quiz.questions.map(q => {
      let options: QuestionOption[] = []
      if (q.type === QuestionType.MULTI_CHOICE)
        options = q.multi_choice_options
      else if (q.type === QuestionType.TRUE_OR_FALSE)
        options = q.true_or_false_options
      const { id, ...question } = q
      return {
        ...question,
        description: question.description.trim(),
        options: options.map(o => ({ ...o, description: o.description.trim() })),
        correct_text_answer: q.type === QuestionType.TEXT ? q.correct_text_answer : '',
      }
    })
  }
}

const is_edit = computed(() => !!id)
const loading_save = ref(false)
async function saveQuiz() {
  try {
    loading_save.value = true
    const formattedQuiz = formatQuizToSave(quiz)
    if (!isValidQuiz(formattedQuiz)) return
    let save_url = '/quiz'
    if (is_edit.value) save_url += `/${id}`
    await useApiFetch(`/quiz/${id}`, {
      method: 'POST',
      body: formattedQuiz,
    })
    useNuxtApp().$toast.success('Quiz salvo!')
    navigateTo('/instructor/quiz')
  } catch (error) {
    console.error(error)
    useNuxtApp().$toast.error('Erro ao salvar quiz. Tente novamente mais tarde.')
  } finally {
    loading_save.value = false
  }
}

function cancelQuiz() {
  const router = useRouter()
  router.back()
}
</script>

<template>
  <v-container v-if="edit_response?.status === 'error'">
    <v-alert class="ma-4" variant="outlined" color="error">
      Erro ao buscar quiz.
    </v-alert>
  </v-container>
  <v-container v-else-if="edit_response?.status === 'pending'">
    <v-alert class="ma-4" variant="outlined">
      Buscando quiz.
    </v-alert>
  </v-container>
  <v-container v-else fluid class="ma-0 pa-0 fill-height w-100 flex-column">
    <div class="border-b-thin w-100">
      <InstructorQuizHeader v-model="quiz.title" :loading="loading_save" @save="saveQuiz" @cancel="cancelQuiz" />
    </div>
    <v-container fluid class="ma-0 pa-0 flex-fill d-flex align-center justify-center">
      <v-container fluid class="ma-0 pa-0 fill-height d-flex flex-column w-33 border-e-thin">
        <InstructorQuizQuestionList ref="questionListRef" class="w-100 flex-grow-1 overflow-y-auto quiz-list"
          :questions="quiz.questions" :highlighted-question-index="currentQuestionIndexOnEdit"
          @question-select="selectQuestion" @question-remove="removeQuestion" />
        <v-container class="ma-0 pa-0 py-4 mt-auto d-flex align-center justify-center">
          <v-btn color="secondary" size="large" @click.stop="addQuestion">
            <span class="font-weight-bold">Adicionar pergunta</span>
          </v-btn>
        </v-container>
      </v-container>
      <InstructorQuizQuestion class="pa-8" v-model="quiz.questions[currentQuestionIndexOnEdit]" />
    </v-container>
  </v-container>
</template>

<style lang="sass" scoped>
.quiz-list
  --quiz-header-height: 100px
  --add-question-btn-height: 76px
  max-height: calc(100vh - (var(--quiz-header-height) + var(--add-question-btn-height)))
</style>
