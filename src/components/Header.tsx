import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export const Header = () => {
    const navigate = useNavigate()
    const { cart } = useCart()
    const itemsCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0

    return (
        <header className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
            <h1
                className="text-xl font-bold cursor-pointer"
                onClick={() => navigate('/products')}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter') navigate('/products') }}
            >
                Локальный рынок
            </h1>

            <nav className="flex items-center space-x-4">
                <button
                    className="relative focus:outline-none"
                    onClick={() => navigate('/cart')}
                    aria-label="Корзина"
                >
                    {/* Иконка корзины (как раньше) */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                        <circle cx="7" cy="21" r="2" />
                        <circle cx="17" cy="21" r="2" />
                    </svg>
                    {itemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
              {itemsCount}
            </span>
                    )}
                </button>

                <button
                    onClick={() => navigate('/orders')}
                    className="bg-white text-indigo-600 px-3 py-1 rounded font-semibold hover:bg-indigo-100 transition"
                >
                    Мои заказы
                </button>
            </nav>
        </header>
    )
}
