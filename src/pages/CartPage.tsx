import { useCart } from '../hooks/useCart'
import { useNavigate } from 'react-router-dom'
import {api} from "../api/axios.ts";

export const CartPage = () => {
    const { cart, loading, error, updateCart, removeFromCart, clearCart } = useCart()
    const navigate = useNavigate()

    if (loading) return <p className="text-center p-4">Загрузка корзины...</p>
    if (error) return <p className="text-center p-4 text-red-600">{error}</p>

    if (!cart || cart.items.length === 0)
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl mb-4">Корзина пуста</h2>
                <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded"
                    onClick={() => navigate('/products')}
                >
                    Вернуться к товарам
                </button>
            </div>
        )

    const totalPrice = cart.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0,
    )
    const handleCreateOrder = async () => {
        const address = prompt('Введите адрес доставки')
        const phone = prompt('Введите телефон для связи')

        if (!address || !phone) {
            alert('Адрес и телефон обязательны')
            return
        }

        try {
            await api.post(
                '/orders/create',
                { address, phone }
            )
            alert('Заказ успешно создан')
            // Очистить корзину и перейти на страницу заказов
            // Например, если есть метод очистки корзины:
            // clearCart()
            navigate('/orders')
        } catch (err) {
            alert('Ошибка при создании заказа')
        }
    }
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl mb-6">Ваша корзина</h1>

            <ul>
                {cart.items.map((item) => (
                    <li
                        key={item.productId}
                        className="flex items-center mb-4 border-b pb-4"
                    >
                        {item.product.imageUrl && (
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-20 h-20 object-cover rounded mr-4"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="font-semibold">{item.product.name}</h3>
                            <p>{item.product.price} ₽ за шт.</p>
                            <div className="flex items-center mt-2">
                                <button
                                    onClick={() =>
                                        updateCart(item.productId, -1).subscribe()
                                    }
                                    className="px-3 py-1 bg-gray-300 rounded-l hover:bg-gray-400"
                                >
                                    -
                                </button>
                                <span className="px-4">{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        updateCart(item.productId, 1).subscribe()
                                    }
                                    className="px-3 py-1 bg-gray-300 rounded-r hover:bg-gray-400"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.productId).subscribe()}
                                    className="ml-4 text-red-600 hover:underline"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                        <div className="font-semibold ml-4">
                            {(item.product.price * item.quantity).toFixed(2)} ₽
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex justify-between items-center font-bold text-xl">
                <span>Итого: {totalPrice.toFixed(2)} ₽</span>
                <button
                    onClick={handleCreateOrder}
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
                >
                    Оформить заказ
                </button>
            </div>

            <button
                onClick={() => clearCart().subscribe()}
                className="mt-4 text-sm text-gray-600 hover:underline"
            >
                Очистить корзину
            </button>
        </div>
    )
}
