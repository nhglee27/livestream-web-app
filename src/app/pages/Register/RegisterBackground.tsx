import { motion } from "framer-motion"

const RegisterBackground = () => (
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
)

export default RegisterBackground
