<script lang="ts" setup>
definePageMeta({
  middleware: 'is-instructor',
  layout: 'header',
})
</script>

<template>
  <v-container fluid class="ma-0 pa-sm-2 pa-md-8">
    <v-row class="ma-0 mb-4" align="center">
      <h2 class="mr-4">Quizzes</h2>
      <v-btn color="secondary" @click="navigateTo('/instructor/quiz/edit/')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row class="ma-0 pa-0">
      <InstructorQuizList />
    </v-row>
  </v-container>
</template>
