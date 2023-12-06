import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import AboutPage from './pages/AboutPage';
import SignupPage from './pages/auth/SignupPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
