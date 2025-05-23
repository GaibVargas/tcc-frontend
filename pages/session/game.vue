<script lang="ts" setup>
import { SessionStatus, type ParticipantSessionState } from '~/types/session'

const session_store = useSessionStore()
if (!session_store.code) {
  navigateTo('/session/entry')
}

const session = ref<ParticipantSessionState>({
  code: session_store.code,
  quiz: {
    public_id: session_store.quiz.public_id,
    title: session_store.quiz.title
  },
  participants: [],
  status: SessionStatus.WAITING_START,
})

const socket = useSocket()
socket.emit('participant:connect', { code: session_store.code })

const { data, error } = await useApiUseFetch<ParticipantSessionState>(`/session/sync/${session_store.code}`)
if (error.value) {
  navigateTo('/session/entry')
}
if (data.value) {
  session.value = data.value
}

onMounted(() => {
  socket.on('game:participant:update-state', (payload) => {
    if (session.value.code !== payload.code) return
    session.value = payload
  })
  socket.on('game:end', (payload) => {
    if (session.value.code !== payload.code) return
    useNuxtApp().$toast.info("Sessão encerrada")
    session_store.$reset()
    navigateTo('/session/entry')
    socket.disconnect()
  })
})

onBeforeUnmount(() => {
  socket.removeListener('game:participant:update-state')
  socket.removeListener('game:end')
})

const ranking_label = computed(() => {
  if (session.value.status === SessionStatus.ENDING) return 'Ranking Final'
  if (session.value.status === SessionStatus.FEEDBACK_SESSION) return `Ranking Top 3`
  return ''
})
</script>

<template>
  <v-container fluid class="ma-0 pa-sm-4 pa-md-8 fill-height flex-column">
    <SessionWaitingStart v-if="session.status === SessionStatus.WAITING_START" class="fill-height flex-column"
      :quiz_title="session.quiz.title" />
    <SessionQuestion v-else-if="session.status === SessionStatus.SHOWING_QUESTION" v-bind:question="session.question"
      :has-answered="session.answered" />
    <SessionQuestionFeedback v-else-if="session.status === SessionStatus.FEEDBACK_QUESTION" :question="session.question"
      :feedback="session.feedback" />
    <SessionRanking
      v-else-if="session.status === SessionStatus.FEEDBACK_SESSION || session.status === SessionStatus.ENDING"
      class="flex-fill d-flex flex-column align-center justify-center" :ranking="session.ranking"
      :label="ranking_label" />
    <div v-else class="text-center">Sessão desconhecida</div>
  </v-container>
</template>
