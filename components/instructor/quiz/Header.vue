<script lang="ts" setup>
interface Props {
  loading: boolean
}
const props = defineProps<Props>()

const modelValue = defineModel<string>()

const emit = defineEmits<{
  (e: 'save'): void
  (e: 'cancel'): void
}>()
</script>


<template>
  <v-container fluid class="px-16">
    <v-row align="center" justify="space-between" class="flex-fill ma-0">
      <v-text-field name="name" label="Título do quiz" variant="plain" :hide-details="true"
        class="quiz-title font-weight-black" autocomplete="off" v-model="modelValue"></v-text-field>
      <div class="btns ml-2">
        <v-btn color="primary" class="mr-2" @click="emit('save')" :loading="props.loading">Salvar</v-btn>
        <v-btn @click="emit('cancel')" :disabled="props.loading">Cancelar</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<style lang="sass" scoped>
.quiz-title
  :deep(.v-field__input)
    font-size: 1.8rem !important
</style>
