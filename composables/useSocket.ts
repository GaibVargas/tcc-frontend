export const useSocket = (connect = true) => {
  const socket = useNuxtApp().$socket
  const auth = useAuthStore()

  onMounted(() => {
    if(!socket.connected && connect) {
      socket.auth.access_token = auth.access_token
      socket.connect()
    }
  })

  onUnmounted(() => {
    if (socket.connected) socket.disconnect()
  })

  return socket
}