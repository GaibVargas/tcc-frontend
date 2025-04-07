<script lang="ts" setup>
import type { Question } from '~/types/quiz'

interface Props {
  questions: Question[]
  highlightedQuestionIndex: number
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'questionSelect', questionIndex: number): void
  (e: 'questionRemove', questionId: string | number): void
}>()
</script>

<template>
  <ul class="list">
    <li v-for="(question, index) in props.questions">
      <InstructorQuizQuestionListItem :question="question" :highlight="index === props.highlightedQuestionIndex"
        :key="question.id" :index="index + 1" @click.stop="emit('questionSelect', index)"
        @question-remove="v => emit('questionRemove', v)" />
    </li>
  </ul>
</template>

<style lang="sass" scoped>
.list
  list-style: none
</style>
