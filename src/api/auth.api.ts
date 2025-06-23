import axios from 'axios'

export const loginRequest = (email: string, password: string) => {
    return axios.post('http://localhost:3001/auth/login', { email, password })
}

export const registerRequest = (name: string, email: string, password: string, phone: string) => {
    return axios.post('http://localhost:3001/auth/register', { name, email, password, phone })
}