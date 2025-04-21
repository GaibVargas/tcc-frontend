<script lang="ts" setup>
import type { InstructorSessionWaitingState } from '~/types/session'

const props = defineProps<{
  session: InstructorSessionWaitingState
  loadingStart: boolean
  loadingEnd: boolean
}>()
const emit = defineEmits<{
  (e: 'start'): void
  (e: 'early-end'): void
}>()

const user = useUser()
</script>

<template>
  <v-container fluid class="ma-0 pa-4 flex-fill d-flex flex-column align-center justify-center position-relative">
    <div class="w-100 position-absolute top-0 d-flex flex-column align-center">
      <p>Curso: {{ user.context.course }}</p>
      <p>Atividade: {{ user.context.activity }}</p>
    </div>
    <h2 class="mb-8 text-h4">{{ props.session.quiz.title }}</h2>
    <p class="text-body-1">Código para entrar no quiz game</p>
    <h1 class="text-h1 font-weight-bold mt-4 mb-8">{{ props.session.code }}</h1>
    <p class="text-body-1 mb-8">{{ props.session.participants.length }} participantes</p>
    <div class="btns d-flex ga-4">
      <v-btn variant="outlined" @click="emit('early-end')" :disabled="loadingStart"
        :loading="loadingEnd">Cancelar</v-btn>
      <v-btn color="primary" @click="emit('start')" :loading="loadingStart" :disabled="loadingEnd">Iniciar</v-btn>
    </div>
  </v-container>
</template>
