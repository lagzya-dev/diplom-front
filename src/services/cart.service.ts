import { BehaviorSubject, from, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { api } from '../api/axios'
import type {AxiosResponse} from "axios";

type TCartItem = {
    productId: number
    quantity: number
    product: {
        id: number
        name: string
        price: number
        imageUrl?: string
    }
}
type TCart = {
    id: number
    items: TCartItem[]
}

class CartService {
    private cartSubject = new BehaviorSubject<TCart | null>(null)

    // Слушатель текущей корзины
    cart$ = this.cartSubject.asObservable()

    // Получить или создать корзину
    loadCart(): Observable<AxiosResponse<TCart, any>> {
        return from(api.get<TCart>('/carts')).pipe(
            tap(({ data }) => this.cartSubject.next(data))
        )
    }

    // Добавить товар
    addToCart(productId: number, quantity = 1): Observable<AxiosResponse<TCart, any>>{
        return from(api.post<TCart>('/carts/add', { productId, quantity })).pipe(
            tap(({ data }) => this.cartSubject.next(data))
        )
    }

    // Обновить количество товара
    updateCart(productId: number, quantity: number): Observable<AxiosResponse<TCart, any>> {
        return from(api.post<TCart>('/carts/update', { productId, quantity })).pipe(
            tap(({ data }) => this.cartSubject.next(data))
        )
    }

    // Удалить товар из корзины
    removeFromCart(productId: number): Observable<AxiosResponse<TCart, any>> {
        return from(api.delete<TCart>(`/carts/remove/${productId}`)).pipe(
            tap(({ data }) => this.cartSubject.next(data))
        )
    }

    // Очистить корзину
    clearCart(): Observable<AxiosResponse<TCart, any>> {
        return from(api.post<TCart>('/carts/clear')).pipe(
            tap(({ data }) => this.cartSubject.next(data))
        )
    }
}
const cartService = new CartService()
export {cartService, type TCart, type TCartItem}
