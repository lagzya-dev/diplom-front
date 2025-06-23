import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import {useCart} from "../hooks/useCart.ts";

type Product = {
    id: number
    name: string
    description?: string
    price: number
    imageUrl?: string
    category?: { id: number; name: string }
    vendor: { id: number; name: string; marketName: string }
}

export const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { addToCart } = useCart()
    useEffect(() => {
        setLoading(true)
        api
            .get<Product[]>('/products')
            .then((res) => {
                setProducts(res.data)
            })
            .catch(() => setError('Не удалось загрузить товары'))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="p-4 text-center">Загрузка товаров...</p>
    if (error) return <p className="p-4 text-center text-red-600">{error}</p>

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Каталог товаров</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div key={p.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                        {p.imageUrl && (
                            <img src={p.imageUrl} alt={p.name} className="mb-4 rounded h-64 object-cover" />
                        )}
                        <h2 className="text-xl font-semibold mb-1">{p.name}</h2>
                        {p.category && (
                            <span className="text-sm text-gray-500 mb-2">{p.category.name}</span>
                        )}
                        <p className="flex-1 text-gray-700 mb-2">{p.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-indigo-600 font-bold text-lg">{p.price} ₽</span>
                            <span className="text-sm text-gray-500">{p.vendor.marketName}</span>
                        </div>
                        <button
                            onClick={() => addToCart(p.id, 1).subscribe()}
                            className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                        >
                            В корзину
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
