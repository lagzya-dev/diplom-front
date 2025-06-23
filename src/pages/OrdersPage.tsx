import  { useEffect, useState } from 'react'
import { api } from '../api/axios'

interface OrderItem {
    id: number
    quantity: number
    price: number
    product: {
        id: number
        name: string
        imageUrl?: string
    }
}

interface Order {
    id: number
    total: number
    status: string
    address: string
    phone: string
    createdAt: string
    items: OrderItem[]
}

export const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        api
            .get<Order[]>('/orders') // ставь нужный baseURL
            .then((res) => {
                console.log(res.data)
                setOrders(res.data)
            })
            .catch(() => {
                setError('Ошибка загрузки заказов')
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div>Загрузка...</div>
    if (error) return <div className="text-red-600">{error}</div>

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Мои заказы</h1>
            {orders.length === 0 && <p>Заказов нет</p>}

            {orders.map((order) => (
                <div key={order.id} className="border rounded p-4 mb-4 shadow-sm">
                    <div className="flex justify-between mb-2">
                        <div>
                            <b>Заказ #{order.id}</b> — {new Date(order.createdAt).toLocaleString()}
                        </div>
                        <div className="font-semibold">Статус: {order.status}</div>
                    </div>
                    <div className="mb-2">Адрес: {order.address}</div>
                    <div className="mb-2">Телефон: {order.phone}</div>

                    <div className="mb-2">
                        <b>Товары:</b>
                        <ul className="list-disc list-inside">
                            {order.items.map((item) => (
                                <li key={item.id} className="flex items-center space-x-2">
                                    {item.product.imageUrl && (
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                    )}
                                    <span>
                    {item.product.name} — {item.quantity} × {item.price} ₽
                  </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-right font-bold">Итого: {order.total} ₽</div>
                </div>
            ))}
        </div>
    )
}
