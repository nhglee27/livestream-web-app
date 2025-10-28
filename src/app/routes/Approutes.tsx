import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage,AboutPage } from '../pages';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* add more routes */}
      </Routes>
    </BrowserRouter>
  );
}