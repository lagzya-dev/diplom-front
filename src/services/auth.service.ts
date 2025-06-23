import { from } from 'rxjs'
import {loginRequest, registerRequest} from '../api/auth.api'

export const login$ = (email: string, password: string) => {
    return from(loginRequest(email, password))
}

export const register$ = (name: string, email: string, password: string, phone: string) => {
    return from(registerRequest(name, email, password, phone))
}