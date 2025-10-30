import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Tv, Users, Home, LogIn } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: "Home", icon: <Home className="w-4 h-4" />, path: "/" },
    { name: "Channels", icon: <Tv className="w-4 h-4" />, path: "/channels" },
    { name: "Community", icon: <Users className="w-4 h-4" />, path: "/community" },
    {name : "About", icon: <Users className="w-4 h-4" />, path: "/about" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 cursor-pointer select-none"
        >
          <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md">
            G
          </div>
          <span className="font-semibold text-white text-lg tracking-wide">
            LiveSphere
          </span>
        </motion.div>

       {/* Navigation (Desktop) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-16">
          {navItems.map((item) => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-2 text-base font-medium transition-colors ${
                  active
                    ? "text-white border-b-2 border-purple-500 pb-1"
                    : "text-gray-300 hover:text-white hover:border-b-2 hover:border-purple-400 pb-1 border-transparent"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>




        {/* Login Button */}
        <Link
          to="/login"
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          <LogIn className="w-4 h-4" />
          <span>Login</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="flex flex-col space-y-4 px-6 py-5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 text-gray-300 hover:text-white transition-colors ${
                    location.pathname === item.path ? "text-white font-semibold" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 rounded-xl justify-center"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
