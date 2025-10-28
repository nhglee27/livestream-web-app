import { motion } from "framer-motion"
import { PlayCircle, Users, Zap } from "lucide-react"

const HeroSection = () => {
  return (
    <div className="relative z-10 text-center max-w-2xl mt-24">
      {/* Hiệu ứng nền */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-700/40 to-cyan-700/40 blur-3xl"
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
      >
        Welcome to LiveSphere
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-gray-400 text-lg mb-8"
      >
        The next generation livestream platform for creators, gamers, and communities.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex justify-center gap-4"
      >
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium flex items-center gap-2">
          <PlayCircle className="w-5 h-5" />
          Go Live
        </button>
        <button className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-purple-400 hover:text-white transition-all flex items-center gap-2">
          <Users className="w-5 h-5" />
          Explore Channels
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-16 text-gray-500 flex items-center justify-center gap-2 text-sm"
      >
        <Zap className="w-4 h-4 text-purple-400" />
        Powered by AI-driven streaming infrastructure.
      </motion.div>
    </div>
  )
}

export default HeroSection
