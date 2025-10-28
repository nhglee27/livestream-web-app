import React from "react";

 const SocialButtons: React.FC = () => (
  <div className="grid grid-cols-2 gap-3">
    <button className="flex items-center justify-center space-x-2 py-3 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
      <span className="text-sm text-gray-300">Google AI</span>
    </button>

    <button className="flex items-center justify-center space-x-2 py-3 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
        <span className="text-xs text-white">GH</span>
      </div>
      <span className="text-sm text-gray-300">GitHub Copilot</span>
    </button>
  </div>
);

export default SocialButtons;