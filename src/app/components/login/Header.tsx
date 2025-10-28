import { motion } from 'framer-motion';

 const LogoHeader = () => (
  <div className="text-center mb-8">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="inline-block"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
        <span className="text-2xl">L.S</span>
      </div>
    </motion.div>

    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
      Live Stream Web App
    </h1>
    <p className="text-gray-400 text-sm mt-1">Entertaiment and Connect Space</p>
  </div>
);


export default LogoHeader;