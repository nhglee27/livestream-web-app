import { motion } from "framer-motion"
import { Heart, Cpu } from "lucide-react"

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-tr from-purple-700/40 to-cyan-700/40 blur-3xl"
      />

      <div className="relative z-10 max-w-2xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          About LiveSphere
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-400 text-lg mb-8"
        >
          LiveSphere is a next-gen livestream platform built for creators and AI enthusiasts.  
          We combine seamless broadcasting, real-time interactivity, and smart content analytics — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center gap-6 mt-8 text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Powered by AI</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-400" />
            <span>Built with passion</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
