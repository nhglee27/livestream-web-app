// import { motion } from "framer-motion"
// import { Heart, Cpu } from "lucide-react"

// const AboutPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.2 }}
//         transition={{ duration: 2 }}
//         className="absolute inset-0 bg-gradient-to-tr from-purple-700/40 to-cyan-700/40 blur-3xl"
//       />

//       <div className="relative z-10 max-w-2xl text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
//         >
//           About LiveSphere
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//           className="text-gray-400 text-lg mb-8"
//         >
//           LiveSphere is a next-gen livestream platform built for creators and AI enthusiasts.  
//           We combine seamless broadcasting, real-time interactivity, and smart content analytics — all in one place.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.8 }}
//           className="flex justify-center gap-6 mt-8 text-gray-400"
//         >
//           <div className="flex items-center gap-2">
//             <Cpu className="w-5 h-5 text-cyan-400" />
//             <span>Powered by AI</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Heart className="w-5 h-5 text-purple-400" />
//             <span>Built with passion</span>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default AboutPage
import React from "react";
import { motion } from "framer-motion";
import { Users, Radio, Cpu, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6"
        >
          About LiveSphere
        </motion.h1>

        <p className="text-gray-400 text-lg mb-12">
          LiveSphere is the next-generation livestream platform built for
          creators, gamers, and communities. We combine cutting-edge streaming
          technology with AI-driven insights to deliver an interactive and
          seamless experience for everyone.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-neutral-900 rounded-2xl p-6 shadow-md"
        >
          <Radio className="w-10 h-10 text-purple-400 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Powerful Streaming</h3>
          <p className="text-gray-400 text-sm">
            Broadcast with low-latency and adaptive quality powered by Node Media
            Server and HLS technology.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-neutral-900 rounded-2xl p-6 shadow-md"
        >
          <Users className="w-10 h-10 text-cyan-400 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Creator Community</h3>
          <p className="text-gray-400 text-sm">
            Connect with other streamers and audiences in real time through
            chat, collaboration, and shared events.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-neutral-900 rounded-2xl p-6 shadow-md"
        >
          <Cpu className="w-10 h-10 text-purple-400 mb-3" />
          <h3 className="text-xl font-semibold mb-2">AI-Driven Experience</h3>
          <p className="text-gray-400 text-sm">
            Leverage AI to highlight trending content, optimize recommendations,
            and enhance viewer engagement.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-neutral-900 rounded-2xl p-6 shadow-md"
        >
          <Heart className="w-10 h-10 text-cyan-400 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Built with Passion</h3>
          <p className="text-gray-400 text-sm">
            Created by a team of developers and gamers who love building
            immersive digital experiences for everyone.
          </p>
        </motion.div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-400">
          🎥 Powered by modern technologies: <span className="text-white">React</span>,{" "}
          <span className="text-white">Node.js</span>, <span className="text-white">Socket.IO</span>,{" "}
          and <span className="text-white">HLS.js</span>.
        </p>
      </div>
    </div>
  );
}
