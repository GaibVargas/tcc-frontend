<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  text: string
}>()

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Erro ao copiar para a área de transferência:', err)
  }
}
</script>

<template>
  <v-tooltip location="top">
    <template #activator="{ props: tooltipProps }">
      <v-btn icon density="compact" v-bind="tooltipProps" @click="copyToClipboard" variant="flat">
        <v-icon>
          {{ copied ? 'mdi-check' : 'mdi-content-copy' }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ copied ? 'Copiado!' : 'Copiar para área de transferência' }}</span>
  </v-tooltip>
</template>

<style scoped>
.v-icon {
  font-size: 16px;
}
</style>
