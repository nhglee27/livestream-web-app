import { useState } from "react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { Mail, Lock, User, Loader2 } from "lucide-react"

const Register: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }, 2000)
  }

  return (
    <>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Hiệu ứng nền động */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-64 h-64 rounded-full opacity-10 blur-3xl ${
                i % 2 === 0 ? "bg-purple-500" : "bg-cyan-500"
              }`}
              animate={{
                x: [0, 100, 0, -100, 0],
                y: [0, -100, 0, 100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                top: `${20 + (i * 15) % 80}%`,
                left: `${10 + (i * 20) % 80}%`,
              }}
            />
          ))}
        </div>

        {/* Thẻ đăng ký */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 bg-gray-900 bg-opacity-80 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-800"
        >
          {/* Logo & Tiêu đề */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-2xl">Neural</span>
              </div>
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Create Neural Account
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Join the next generation AI network
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500"
                  placeholder="John Neural"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500"
                  placeholder="you@neural.net"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors text-white placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Register Now</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-500">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* Social Register */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 py-3 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Google AI</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">GH</span>
              </div>
              <span className="text-sm text-gray-300">GitHub Copilot</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Sign in
            </a>
          </p>
        </motion.div>
      </div>
    </>
  )
}

export default Register
