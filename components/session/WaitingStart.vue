<script lang="ts" setup>
const props = defineProps<{ quiz_title: string }>()
const user = useUser()
</script>

<template>
  <v-container fluid class="ma-0 pa-0 d-flex flex-column">
    <div class="d-flex flex-column align-center">
      <p>Curso: {{ user.context.course }}</p>
      <p>Atividade: {{ user.context.activity }}</p>
    </div>
    <div class="text-center my-auto">
      <h2 class="text-center mb-12">Espere o organizador iniciar o jogo</h2>
      <p>Responda corretamente às questões para ganhar pontos e subir no ranking!</p>
      <p>Responda rapidamente e ganhe pontos bônus.</p>
      <p>Acerte perguntas em sequência e pontue mais.</p>
    </div>
  </v-container>
</template>
