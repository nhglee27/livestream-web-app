import { Mail } from 'lucide-react';
import React, { ChangeEvent } from 'react';

interface EmailFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

 const EmailField: React.FC<EmailFieldProps> = ({ value, onChange }) => (
  <div>
    <label className="block text-sm text-gray-300 mb-2">Email Address</label>
    <div className="relative">
      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
      <input
        type="email"
        value={value}
        onChange={onChange}
        required
        placeholder="you@email.com"
        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500"
      />
    </div>
  </div>
);


export default EmailField;