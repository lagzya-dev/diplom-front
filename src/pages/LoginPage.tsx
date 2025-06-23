import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const LoginPage = ({ switchToRegister }: { switchToRegister: () => void }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, loading, error } = useAuth()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div
            className="min-h-screen w-full bg-gradient-to-r from-indigo-700 via-purple-900 to-pink-700 flex items-center justify-center px-4"
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full p-8 sm:p-12 space-y-8 text-gray-900 transition-shadow duration-300 hover:shadow-3xl"
            >
                <h2 className="text-3xl font-extrabold text-center">С возвращением!</h2>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
                    >
                        Электронная почта
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
                    >
                        Пароль
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                    />
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-md text-white font-semibold transition ${
                        loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-lg`}
                >
                    {loading ? 'Вход...' : 'Войти'}
                </button>

                <p className="text-center text-gray-600 text-sm sm:text-base">
                    Нет аккаунта?{' '}
                    <button
                        type="button"
                        onClick={switchToRegister}
                        className="text-indigo-600 font-semibold hover:underline focus:outline-none"
                    >
                        Зарегистрироваться
                    </button>
                </p>
            </form>
        </div>
    )
}
