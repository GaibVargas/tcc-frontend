<script lang="ts" setup>
import { UserRoles } from '~/types/user'

const user = useUser()
const isInstructor = user.role === UserRoles.INSTRUCTOR
</script>

<template>
  <v-container fluid class="d-flex align-center justify-space-between ma-0 px-8 border-b-thin">
    <h2><span class="text-secondary">Q</span>AV</h2>
    <ul class="d-flex ga-8 align-center justify-end" style="list-style: none;">
      <li v-if="isInstructor"><NuxtLink active-class="link-active" to="/instructor/quiz" class="text-decoration-none link">Quizzes</NuxtLink></li>
      <li v-if="isInstructor"><NuxtLink active-class="link-active" to="/instructor/session" class="text-decoration-none link">Sessões</NuxtLink></li>
      <li><NuxtLink active-class="link-active" to="/" class="text-decoration-none link">LMS</NuxtLink></li>
      <li><NuxtLink active-class="link-active" to="/about" class="text-decoration-none link">Sobre</NuxtLink></li>
      <li v-if="isInstructor"><InstructorAvatar /></li>
    </ul>
  </v-container>
</template>

<style lang="sass" scoped>
.link
  color: rgb(var(--v-theme-primary)) !important
  opacity: .6
  &:hover
    opacity: 1
  &-active
    opacity: 1
    color: rgb(var(--v-theme-secondary)) !important
</style>

