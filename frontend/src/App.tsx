import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    RouteProps,
} from 'react-router-dom';
import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import ShopHomePage from './pages/ShopHomePage';
import ProductListPage from './pages/shop/ProductListPage';
import ProductDetailPage from './pages/shop/ProductDetailPage';
import CartPage from './pages/shop/CartPage';
import CheckoutPage from './pages/shop/CheckoutPage';
import RegistrationPage from './pages/auth/RegistrationPage';
import LoginPage from './pages/auth/LoginPage';
import UserProfilePage from './pages/auth/UserProfilePage';
import FindAccountPage from './pages/auth/FindAccountPage';
import PaymentConfirmationPage from './pages/shop/PaymentConfirmationPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import useCheckAuth from './hooks/auth/useCheckAuth';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

// 사용자 상태에 따라 특정 라우터에는 접근하지 못하도록 하는 기능
// 로그인하지 않은 사용자만 접근 가능한 라우트
const PublicRoute: React.FC<RouteProps> = ({ children }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    return isLoggedIn ? <Navigate to="/" /> : <>{children}</>;
};

// 관리자만 접근 가능한 라우트
const AdminRoute: React.FC<RouteProps> = ({ children }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isAdmin = useSelector(
        (state: RootState) => state.auth.userInfo?.isAdmin
    );
    return isLoggedIn && isAdmin ? <>{children}</> : <Navigate to="/" />;
};

// 일반 사용자만 접근 가능한 라우트
const NonAdminRoute: React.FC<RouteProps> = ({ children }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isAdmin = useSelector(
        (state: RootState) => state.auth.userInfo?.isAdmin
    );
    return isLoggedIn && !isAdmin ? <>{children}</> : <Navigate to="/admin" />;
};

function App() {
    useCheckAuth();

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
                    <Route
                        path="confirm"
                        element={<PaymentConfirmationPage />}
                    />
                    <Route
                        path="signup"
                        element={
                            <PublicRoute>
                                <RegistrationPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="find"
                        element={
                            <PublicRoute>
                                <FindAccountPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="user"
                        element={
                            <NonAdminRoute>
                                <UserProfilePage />
                            </NonAdminRoute>
                        }
                    />
                    <Route
                        path="admin"
                        element={
                            <AdminRoute>
                                <AdminDashboardPage />
                            </AdminRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
