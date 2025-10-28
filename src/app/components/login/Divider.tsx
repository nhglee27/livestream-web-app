import React from "react";

 const Divider: React.FC = () => (
  <div className="relative my-8">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-700" />
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-4 bg-gray-900 text-gray-500">OR CONNECT VIA</span>
    </div>
  </div>
);


export default Divider;