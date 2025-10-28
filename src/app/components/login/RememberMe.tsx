import React from "react";

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

 const RememberMe: React.FC<RememberMeProps> = ({ checked, onChange }: RememberMeProps) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
    />
    <span className="text-gray-400">Remember this session</span>
  </label>
);

export default RememberMe;