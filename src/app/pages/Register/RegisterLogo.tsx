import { motion } from "framer-motion"

const RegisterLogo = () => (
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
)

export default RegisterLogo
