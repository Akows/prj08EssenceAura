import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ShopPage from './pages/ShopPage';
import MainPage from './pages/MainPage';
import ShopHomePage from './pages/ShopHomePage';
import ProductListPage from './pages/shop/ProductListPage';
import ProductDetailPage from './pages/shop/ProductDetailPage';
import CartPage from './pages/shop/CartPage';
import CheckoutPage from './pages/shop/CheckoutPage';
import RegistrationPage from './pages/auth/RegistrationPage';
import LoginPage from './pages/auth/LoginPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="shop" element={<ShopHomePage />} />
                    <Route path="shoplist" element={<ProductListPage />} />
                    <Route path="shopdetail" element={<ProductDetailPage />} />
                    <Route path="shopcart" element={<CartPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />

                    <Route path="home" element={<ShopPage />} />
                    <Route path="signup" element={<RegistrationPage />} />
                    <Route path="login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
