import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
      <p className="text-lg text-gray-600 mb-8">
      ABOUT PAGE
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>
  );
};

export default About;
