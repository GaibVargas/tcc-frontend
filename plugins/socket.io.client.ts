import { defineNuxtPlugin } from '#app'
import { io } from 'socket.io-client'
import type { CustomSocket } from '~/types/socket.io'

let refreshPromise: (() => Promise<boolean>) | null = null

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const auth = useAuthStore()
  const router = useRouter()

  const socket: CustomSocket = io(config.public.apiBaseUrl, {
    autoConnect: false,
    auth: {
      access_token: auth.access_token
    }
  })

  socket.on('connect_error', async(error) => {
    if (error.message === 'Authorization token is required') {
      auth.logout()
      router.push('/')
      return
    }
    if (error.message === 'Token has expired') {
      if (!refreshPromise) refreshPromise = auth.refreshToken
      if (refreshPromise) {
        const result = await refreshPromise()
        if (!result) return auth.logout()
        socket.auth.access_token = auth.access_token
        return socket.connect()
      }
    }
    useNuxtApp().$toast.error('Erro desconhecido ao conectar a sessão.')
    console.error('socket unknown error', error)
  })

  nuxtApp.provide('socket', socket)
})