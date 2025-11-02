import { motion } from "framer-motion"
import { PlayCircle, Users, Zap } from "lucide-react"
import { streamApi } from "../../api/authAPI"
import { StreamChannelRequest } from "../../dto/stream"
import { useNavigate } from "react-router-dom"
const git  HeroSection = () => {
  
    const navigate = useNavigate();
  // call request to server to  get StreamChannel 
  const handleGetStreamChannel = async () => {
    let credentials : StreamChannelRequest = {
      channelName: "jack_channel"
    };
     streamApi.getStreamChannel(credentials).then((response) => {
      console.log("Stream Channel Data:", response.data);
      //  navigate to the stream channel page
        navigate(`/live/${response.data.data.streamChannel}`);
    }
    ).catch((error) => {
      console.error("Error fetching stream channel:", error);
      // Handle the error as needed
    }
    );
  }


  return (
   <div className="relative z-10 text-center max-w-2xl mt-24 mx-auto">
      {/* Hiệu ứng nền */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-700/40 to-cyan-700/40 blur-3xl"
      />

      {/* Tiêu đề */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
      >
        Welcome to LiveSphere
      </motion.h1>

      {/* Mô tả */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-gray-400 text-lg mb-10"
      >
        The next generation livestream platform for creators, gamers, and communities.
      </motion.p>

      {/* Nút 1: Start Streaming */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
      >
        <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400 hover:shadow-lg hover:shadow-pink-500/30 transition-all font-semibold flex items-center gap-2 mx-auto text-white">
          <PlayCircle className="w-5 h-5" />
          Start Streaming
        </button>
      </motion.div>

      {/* Nút 2: Go Live */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="mt-6"
      >
        <button onClick={handleGetStreamChannel}  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all font-semibold flex items-center gap-2 mx-auto text-white">
          Go Live
        </button>
      </motion.div>

      {/* Nút 3: Explore Channels */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="mt-6"
      >
        <button className="px-8 py-4 rounded-2xl border border-gray-700 text-gray-300 hover:border-purple-400 hover:text-white hover:shadow-md hover:shadow-purple-400/20 transition-all font-semibold flex items-center gap-2 mx-auto">
          <Users className="w-5 h-5" />
          Explore Channels
        </button>
      </motion.div>

      {/* Ghi chú cuối */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-16 text-gray-500 flex items-center justify-center gap-2 text-sm"
      >
        <Zap className="w-4 h-4 text-purple-400" />
        Powered by AI-driven streaming infrastructure.
      </motion.div>
    </div>
  )
}

export default HeroSection
