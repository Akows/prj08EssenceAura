import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ShopPage from './pages/ShopPage';
import SignupPage from './pages/auth/SignupPage';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/shop/ProductListPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="shop" element={<HomePage />} />
                    <Route path="shoplist" element={<ProductListPage />} />

                    <Route path="home" element={<ShopPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
