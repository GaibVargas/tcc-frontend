import type { LoggedUserTokens } from "~/types/user"
import { useApiRequestHeaders } from "./useApiRequestHeaders"

export const useAuthStore = defineStore('auth', {
  state: () => ({ access_token: '', refresh_token: '', is_refreshing: false }),
  actions: {
    setAccessToken(token: string) {
      this.access_token = token
    },
    setRefreshToken(token: string) {
      this.refresh_token = token
    },
    setIsRefreshing(v: boolean) {
      this.is_refreshing = v
    },
    logout() {
      this.access_token = ''
      this.refresh_token = ''
      const user = useUser()
      user.$reset()
    },
    async refreshToken(): Promise<boolean> {
      try {
        const config = useRuntimeConfig()
        const headers = useApiRequestHeaders()
        const baseURL = config.public.apiBaseUrl
        const data = await $fetch<LoggedUserTokens>(`${baseURL}/auth/refresh`, {
          headers,
        })
        this.setAccessToken(data.access_token)
        this.setRefreshToken(data.refresh_token)
        return true
      } catch (error) {
        console.error('Error refreshing access token', error)
        this.logout()
        navigateTo('/')
        return false
      }
    },
  },
  persist: { storage: piniaPluginPersistedstate.localStorage() }
})