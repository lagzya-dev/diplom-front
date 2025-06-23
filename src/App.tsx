import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ProductsPage } from './pages/ProductsPage'
import {Header} from "./components/Header.tsx";
import {CartPage} from "./pages/CartPage.tsx";
import {OrdersPage} from "./pages/OrdersPage.tsx";

// Простая проверка авторизации по наличию токена
const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const token = document.cookie.match(/access_token=([^;]+)/)?.[1]
    return token ? children : <Navigate to="/login" />
}

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/login" element={<LoginPage switchToRegister={() => window.location.href = '/register'} />} />
                <Route path="/register" element={<RegisterPage switchToLogin={() => window.location.href = '/login'} />} />
                <Route path="/products" element={
                    <RequireAuth>
                        <ProductsPage />
                    </RequireAuth>
                } />
                <Route path="/orders" element={
                    <RequireAuth>
                        <OrdersPage />
                    </RequireAuth>
                } />
                <Route path="/cart" element={
                    <RequireAuth>
                        <CartPage />
                    </RequireAuth>
                } />

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;