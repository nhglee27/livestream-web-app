import { Loader2 } from 'lucide-react';
import React from 'react';

interface SubmitButtonProps {
  loading: boolean;
}

 const SubmitButton:React.FC<SubmitButtonProps> = ({ loading }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
  >
    {loading ? (
      <>
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Initializing...</span>
      </>
    ) : (
      <span>Sign In</span>
    )}
  </button>
);



export default SubmitButton;