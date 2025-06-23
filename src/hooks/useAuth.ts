import { useState } from 'react'
import { login$, register$ } from '../services/auth.service'
import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()
    const login = (email: string, password: string) => {
        setLoading(true)
        setError(null)

        const subscription = login$(email, password).subscribe({
            next: (res) => {
                console.log('Успешный вход:', res.data)
                Cookies.set('access_token', res.data.access_token, { expires: 7, secure: true, sameSite: 'strict' })
                Cookies.set('refresh_token', res.data.refresh_token, { expires: 7, secure: true, sameSite: 'strict' })
                navigate('/products')

                // Сохраняем токен, если нужно: localStorage.setItem('token', res.data.token)
            },
            error: () => setError('Неверный email или пароль'),
            complete: () => setLoading(false),
        })

        return () => subscription.unsubscribe()
    }

    const register = (name: string, email: string, password: string, phone: string) => {
        setLoading(true)
        setError(null)

        const subscription = register$(name, email, password, phone).subscribe({
            next: (res) => {
                console.log('Успешная регистрация:', res.data)
                Cookies.set('access_token', res.data.access_token, { expires: 7, secure: true, sameSite: 'strict' })
                Cookies.set('refresh_token', res.data.refresh_token, { expires: 7, secure: true, sameSite: 'strict' })
                navigate('/products')
                // expires — число дней хранения токена в куках

            },
            error: () => setError('Ошибка регистрации'),
            complete: () => setLoading(false),
        })

        return () => subscription.unsubscribe()
    }

    return { login, register, loading, error }
}
