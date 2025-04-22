<script lang="ts" setup>
import { useConfetti } from '~/composables/useConfetti'
import { QuestionType } from '~/types/quiz'
import type { SessionQuestion, ParticipantSessionQuestionFeedback } from '~/types/session'

const props = defineProps<{
  question: SessionQuestion
  feedback: ParticipantSessionQuestionFeedback
}>()

const show_error_animation = ref(false)
const confetti = useConfetti()
watchEffect(() => {
  if (props.feedback.is_correct) confetti.fireConfetti()
  else show_error_animation.value = true
})
</script>

<template>
  <v-container fluid class="ma-0 pa-0 flex-fill fill-height flex-column justify-center position-relative">
    <span class="position-absolute top-0 right-0 text-caption">{{ props.question.index }} / {{
      props.question.total }}</span>
    <div v-if="props.feedback.is_correct"
      class="position-absolute top-0 d-flex flex-column align-center justify-center py-4 px-8 rounded feedback">
      <v-icon color="success" size="x-large">mdi-check</v-icon>
      <p class="font-weight-bold">+{{ props.feedback.points }} pts</p>
      <p class="font-weight-bold" v-if="props.feedback.velocity_bonus > 0">+{{ props.feedback.velocity_bonus }} pts
        muito rápido!</p>
      <p class="font-weight-bold" v-if="props.feedback.streak_bonus > 0">+{{ props.feedback.streak_bonus }} pts
        sequência de acertos!</p>
    </div>
    <div v-else
      class="position-absolute top-0 d-flex flex-column align-center justify-center py-4 px-8 rounded feedback">
      <v-icon color="error" size="x-large">mdi-close</v-icon>
      <p>Que pena</p>
      <p>Você não pontuou nessa pergunta</p>
      <p>:(</p>
    </div>
    <p class="my-auto text-center">{{ props.question.description }}</p>
    <div v-if="props.question.type === QuestionType.MULTI_CHOICE || props.question.type === QuestionType.TRUE_OR_FALSE"
      class="w-100 d-flex ga-2 flex-wrap">
      <SessionQuestionOption v-for="(option, index) in props.question.options" class="option" :key="option.public_id"
        :prepend="`${alphabet[index]}.`" :description="option.description"
        :correct="props.feedback.correct_answer === option.public_id"
        :incorrect="!props.feedback.is_correct && props.feedback.given_answer === option.public_id" disabled />
    </div>
    <div v-else class="w-100">
      <p class="text-center pa-2 border-thin rounded text-truncate"
        :class="[props.feedback.is_correct ? 'correct' : 'incorrect']">{{
          props.feedback.given_answer }}</p>
      <p class="mt-2 text-center pa-2 border-thin rounded text-truncate correct" v-if="!props.feedback.is_correct">{{
        props.feedback.correct_answer }}
      </p>
    </div>
    <div v-if="show_error_animation" class="error-x-background d-flex align-center justify-center">
      <v-icon size="200" color="error">mdi-close</v-icon>
    </div>
  </v-container>
</template>

<style lang="sass" scoped>
.option
  --gap: 8px
  width: calc(50% - var(--gap) / 2)
  @media (max-width: 960px)
    width: 100%
.feedback
  background-color: #f8f9faee
.correct
  border-color: rgb(var(--v-theme-success)) !important
  background-color: rgba(var(--v-theme-success), .1) !important
.incorrect
  border-color: rgb(var(--v-theme-error)) !important
  background-color: rgba(var(--v-theme-error), .1) !important

@keyframes pulseFadeOut
  0%
    transform: scale(0.8)
    opacity: 0.6
  50%
    transform: scale(1.3)
    opacity: 1
  100%
    transform: scale(1)
    opacity: 0

.error-x-background
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  z-index: 2
  opacity: .2
  background-color: transparent
  pointer-events: none
  animation: pulseFadeOut 1.2s ease-out forwards
</style>
