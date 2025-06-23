import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const RegisterPage = ({ switchToLogin }: { switchToLogin: () => void }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { register, loading, error } = useAuth()
    const [localError, setLocalError] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLocalError(null)

        if (password !== confirmPassword) {
            setLocalError('Пароли не совпадают')
            return
        }

        register(name, email, password, phone)
    }

    return (
        <div
            className="min-h-screen w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center px-4"
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full p-8 sm:p-12 space-y-8 text-gray-900 transition-shadow duration-300 hover:shadow-3xl"
            >
                <h2 className="text-3xl font-extrabold text-center">Создать аккаунт</h2>
                <div>
                    <label
                        htmlFor="name"
                        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
                    >
                        Имя
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Алексей"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
                    />
                </div>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
                    />
                </div>
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
                    >
                        Телефон
                    </label>
                    <input
                        id="phone"
                        type="number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Номер телефона"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
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
                        placeholder="Придумайте пароль"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
                    />
                </div>

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
                    >
                        Подтверждение пароля
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Повторите пароль"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
                    />
                </div>

                {(error || localError) && (
                    <p className="text-red-600 text-sm text-center">{localError || error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-md text-white font-semibold transition ${
                        loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    } text-lg`}
                >
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>

                <p className="text-center text-gray-600 text-sm sm:text-base">
                    Уже есть аккаунт?{' '}
                    <button
                        type="button"
                        onClick={switchToLogin}
                        className="text-green-600 font-semibold hover:underline focus:outline-none"
                    >
                        Войти
                    </button>
                </p>
            </form>
        </div>
    )
}
