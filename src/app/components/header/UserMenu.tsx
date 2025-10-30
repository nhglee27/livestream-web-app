import { LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookies";
import { UserModel } from "../../model/user";



const UserMenu = ({ user }: { user: UserModel | null }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear cookies
    Cookies.removeItem("userData");

    // ✅ Navigate home
    navigate("/");

    // Optional: reload UI to reset state
    window.location.reload();
  };

  return user ? (
    <div className="hidden md:flex items-center gap-3 text-white font-medium">
      <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 shadow-md flex items-center gap-3">
        <span>Hi, {user.name || "User"} 👋</span>
        <button
          onClick={handleLogout}
          className="ml-3 flex items-center gap-1 text-sm bg-white/20 hover:bg-white/30 px-2 py-1 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  ) : (
    <Link
      to="/login"
      className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
    >
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </Link>
  );
};

export default UserMenu;
