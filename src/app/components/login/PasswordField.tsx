import { Lock } from 'lucide-react';
import React, { ChangeEvent } from 'react';

interface PasswordFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

 const PasswordField:React.FC<PasswordFieldProps> = ({ value, onChange }: PasswordFieldProps) => (
  <div>
    <label className="block text-sm text-gray-300 mb-2">Password</label>
    <div className="relative">
      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
      <input
        type="password"
        value={value}
        onChange={onChange}
        required
        placeholder="••••••••"
        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500"
      />
    </div>
  </div>
);

export default PasswordField;