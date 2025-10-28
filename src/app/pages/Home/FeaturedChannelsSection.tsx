import { motion } from "framer-motion"
import { UserCircle2 } from "lucide-react"

const FeaturedChannelsSection = () => {
  const channels = [
    { name: "GamerOne", viewers: "12.4K", game: "Valorant" },
    { name: "ProStreamer", viewers: "9.8K", game: "League of Legends" },
    { name: "PixelHero", viewers: "7.1K", game: "Minecraft" },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative z-10 text-center max-w-6xl w-full mb-32"
    >
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        Featured Channels
      </h2>
      <p className="text-gray-400 mb-12">Top streamers live right now</p>

      <div className="grid md:grid-cols-3 gap-10">
        {channels.map((ch, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 rounded-2xl p-6 text-left hover:bg-white/10 transition-all shadow-lg shadow-black/20"
          >
            <div className="flex items-center gap-4">
              <UserCircle2 className="w-10 h-10 text-purple-400" />
              <div>
                <h3 className="text-lg font-semibold">{ch.name}</h3>
                <p className="text-gray-400 text-sm">{ch.viewers} watching • {ch.game}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default FeaturedChannelsSection
