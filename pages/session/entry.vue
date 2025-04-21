<script lang="ts" setup>
import type { VTextField } from 'vuetify/components'

definePageMeta({
  middleware: 'has-user',
})

const user = useUser()

const loading = ref(false)
const code = ref('')

function required(v: string) {
  return !!v || 'Sessão é obrigatório.'
}

const session_ref: Ref<InstanceType<typeof VTextField> | null> = ref(null)
async function enterSession() {
  if (!session_ref.value || !code.value) return
  const result = await session_ref.value.validate()
  if (result.length) return
  const session = useSessionStore()
  try {
    loading.value = true
    await useApiFetch(`/session/join/${code.value}`, { method: 'POST' })
    session.setCode(code.value)
    navigateTo('/session/game')
  } catch (error) {
    console.error(error)
    useNuxtApp().$toast.error('Erro ao entrar na sessão. Tente novamente mais tarde.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container fluid class="ma-0 pa-sm-2 pa-md-8 d-flex flex-column fill-height position-relative">
    <div class="w-100 position-absolute d-flex flex-column align-center">
      <p>Curso: {{ user.context.course }}</p>
      <p>Atividade: {{ user.context.activity }}</p>
    </div>
    <main class="ma-auto d-flex flex-column w-100 align-center">
      <div class="welcome w-100 mb-8">
        <h2 class="text-center">Bem vindo,</h2>
        <h2 class="text-center">{{ user.name }}!</h2>
      </div>
      <div class="inputs w-100 justify-center">
        <v-text-field
          ref="session_ref"
          name="session"
          label="Código da sessão"
          id="session"
          variant="outlined"
          :readonly="loading"
          :rules="[required]"
          v-model="code"
        ></v-text-field>
        <v-btn class="w-100 mt-2" color="primary" :loading="loading" @click.stop="enterSession">Entrar</v-btn>
      </div>
    </main>
  </v-container>
</template>

<style lang="sass" scoped>
.inputs
  max-width: 300px
</style>

