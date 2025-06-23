import axios from 'axios'

export const loginRequest = (email: string, password: string) => {
    return axios.post('https://api-diplom.lagzya.top/auth/login', { email, password })
}

export const registerRequest = (name: string, email: string, password: string, phone: string) => {
    return axios.post('https://api-diplom.lagzya.top/auth/register', { name, email, password, phone })
}