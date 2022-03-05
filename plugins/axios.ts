import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      axios: () => {
        return axios.create({
          withCredentials: true,
          baseURL: useRuntimeConfig().API_URL
        })
      }
    }
  }
})