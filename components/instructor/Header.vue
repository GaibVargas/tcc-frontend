<script lang="ts" setup>
import { UserRoles } from '~/types/user'

const user = useUser()
const isInstructor = user.role === UserRoles.INSTRUCTOR
</script>

<template>
  <v-container fluid class="ma-0 px-8 border-b-thin">
    <ul class="d-flex ga-8 align-center justify-end" style="list-style: none;">
      <li><NuxtLink active-class="link-active" to="/" class="text-decoration-none link">LMS</NuxtLink></li>
      <li v-if="isInstructor"><NuxtLink active-class="link-active" to="/instructor/quiz" class="text-decoration-none link">Quizzes</NuxtLink></li>
      <li v-if="isInstructor"><NuxtLink active-class="link-active" to="/instructor/session" class="text-decoration-none link">Sessões</NuxtLink></li>
      <li v-if="isInstructor"><InstructorAvatar /></li>
    </ul>
  </v-container>
</template>

<style lang="sass" scoped>
.link
  color: var(--v-theme-primary)
  opacity: .6
  &:hover
    opacity: 1
  &-active
    opacity: 1
</style>

