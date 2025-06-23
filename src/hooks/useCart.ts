import { useEffect, useState } from 'react'
import { cartService, type TCart } from '../services/cart.service'
import { Subscription } from 'rxjs'

export const useCart = () => {
    const [cart, setCart] = useState<TCart | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const sub: Subscription = cartService.cart$.subscribe({
            next: (c) => {
                setCart(c)
                setLoading(false)
            },
            error: (e) => {
                setError(`Ошибка загрузки корзины: ${e.message}`)
                setLoading(false)
            },
        })

        // Инициируем загрузку корзины при монтировании
        cartService.loadCart().subscribe({
            error: () => {
                setError('Ошибка загрузки корзины')
                setLoading(false)
            },
        })

        return () => sub.unsubscribe()
    }, [])

    return {
        cart,
        loading,
        error,
        addToCart: (productId: number, quantity?: number) =>
            cartService.addToCart(productId, quantity),
        updateCart: (productId: number, quantity: number) =>
            cartService.updateCart(productId, quantity),
        removeFromCart: (productId: number) => cartService.removeFromCart(productId),
        clearCart: () => cartService.clearCart(),
    }
}
