import { useState } from "react";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { RegisterCredentials } from "../../dto/register";

interface Props {
  loading: boolean;
  onSubmit: (data: RegisterCredentials) => void;
}

const RegisterForm: React.FC<Props> = ({ loading, onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🟣 Form submitted"); // ✅ giúp debug

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match!");
      return;
    }

    console.log("🟢 Sending data:", { fullName, email, password });
    onSubmit({ email, password, fullName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500"
            placeholder="John Neural"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500"
            placeholder="you@neural.net"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold flex items-center justify-center space-x-2 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          <span>Register Now</span>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
