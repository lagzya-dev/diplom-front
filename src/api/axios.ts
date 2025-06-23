import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api-diplom.lagzya.top',
})

// Интсептор на случай, если вы храните JWT в обычных куках:
api.interceptors.request.use((config) => {
    const token = Cookies.get('access_token')
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
