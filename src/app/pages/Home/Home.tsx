import React from "react"
import HeroSection from "./HeroSection"
import FeatureSection from "./FeatureSection"
import FeaturedChannelsSection from "./FeaturedChannelsSection"

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      <HeroSection />
      <FeatureSection />
      <FeaturedChannelsSection />
    </div>
  )
}

export default HomePage
