import { motion } from "framer-motion"
import { Radio, Flame, MessageSquare } from "lucide-react"

const FeatureSection = () => {
  const features = [
    {
      title: "Live Streaming",
      icon: <Radio className="w-10 h-10 text-purple-400 mx-auto mb-4" />,
      desc: "Watch your favorite gamers live with high-quality streams and minimal latency.",
    },
    {
      title: "Trending Content",
      icon: <Flame className="w-10 h-10 text-cyan-400 mx-auto mb-4" />,
      desc: "Discover the hottest streams and trending gaming content from top creators.",
    },
    {
      title: "Community Hub",
      icon: <MessageSquare className="w-10 h-10 text-purple-300 mx-auto mb-4" />,
      desc: "Engage with fellow gamers, share moments, and be part of the conversation.",
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative z-10 mt-32 mb-24 grid md:grid-cols-3 gap-10 max-w-6xl w-full text-center"
    >
      {features.map((f, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05, y: -4 }}
          className="bg-white/5 rounded-2xl p-8 hover:bg-white/10 transition-all shadow-lg shadow-black/20"
        >
          {f.icon}
          <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
          <p className="text-gray-400 text-sm">{f.desc}</p>
        </motion.div>
      ))}
    </motion.section>
  )
}

export default FeatureSection
