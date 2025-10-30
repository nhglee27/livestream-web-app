import { Routes, Route } from 'react-router-dom'
import { HomePage, AboutPage, LoginPage, RegisterPage , LiveStreamPage } from '../pages'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/live" element={<LiveStreamPage />} />
    </Routes>
  )
}
