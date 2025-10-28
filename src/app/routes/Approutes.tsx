import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage,AboutPage , LoginPage } from '../pages';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* add more routes */}
      </Routes>
    </BrowserRouter>
  );
}