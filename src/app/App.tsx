import { BrowserRouter } from 'react-router-dom'
import { Header, Footer } from './layout'
import { AppRoutes } from './routes'
import { Toaster } from "react-hot-toast"
import './styles'

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="min-h-screen pt-20">
        <AppRoutes />
      </main>

      <Footer />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#1f2937",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#1f2937",
            },
          },
        }}
      />
    </BrowserRouter>
  )
}
