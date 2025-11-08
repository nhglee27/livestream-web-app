import { motion } from "framer-motion";

const Logo = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-2 cursor-pointer select-none"
  >
    <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md">
      Halo
    </div>
    <span className="font-semibold text-white text-lg tracking-wide">
      KastStream
    </span>
  </motion.div>
);

export default Logo;
