import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length <= 8) return "Password must be longer than 8 characters!";
    if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter!";
    if (!/[0-9]/.test(pwd)) return "Password must contain at least one number!";
    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\];'`~+=/]/.test(pwd))
      return "Password must contain at least one special character!";
    if (!/^[ -~]+$/.test(pwd)) // kiểm tra ký tự ASCII (32–126)
      return "Password contains invalid characters (non-standard keyboard)!";

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match!");
      return;
    }

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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          <input
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
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
