import { LogIn, LogOut, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// @ts-ignore
import Cookies from "js-cookies";
import { UserModel } from "../../model/user";
import { useState } from "react";
import { createPortal } from "react-dom"; // ✅ 1. Import createPortal

const UserMenu = ({ user }: { user: UserModel | null }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    Cookies.removeItem("userData");
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* --- Phần nút bấm trên Menu (Giữ nguyên) --- */}
      {user ? (
        <div className="hidden md:flex items-center gap-3 text-white font-medium">
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 shadow-md flex items-center gap-3">
            <span>Hi, {user.name || "User"} 👋</span>
            <button
              onClick={handleLogoutClick}
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
      )}

      {/* --- LOGOUT CONFIRMATION POPUP (Dùng Portal) --- */}
      {showConfirm && createPortal( // ✅ 2. Bọc Modal trong createPortal
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 h-screen w-screen">
          
          <div 
            className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="p-3 bg-red-500/10 rounded-full mb-4">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Logout?</h3>
            <p className="text-gray-400 text-center text-sm mb-6">
              Are you sure you want to sign out?
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-800 text-gray-300 font-medium hover:bg-gray-700 hover:text-white transition border border-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition shadow-lg shadow-red-600/20"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default UserMenu;