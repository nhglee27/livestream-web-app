import { LogIn, LogOut, AlertTriangle, User, ChevronDown } from "lucide-react"; // ✅ Import thêm icon
import { Link, useNavigate } from "react-router-dom";
// @ts-ignore
import Cookies from "js-cookies";
import { UserModel } from "../../model/user";
import { useState } from "react";
import { createPortal } from "react-dom";

const UserMenu = ({ user }: { user: UserModel | null }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // ✅ State điều khiển menu dropdown

  const handleLogoutClick = () => {
    setShowMenu(false); // Đóng menu khi bấm logout
    setShowConfirm(true); // Mở popup xác nhận
  };

  const confirmLogout = () => {
    Cookies.removeItem("userData");
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* --- Phần nút bấm trên Menu --- */}
      {user ? (
        <div className="relative hidden md:block"> {/* ✅ Thêm relative để định vị menu con */}
          
          {/* Nút chính hiển thị tên User */}
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 shadow-md flex items-center gap-2 text-white font-medium hover:brightness-110 transition active:scale-95"
          >
            <span>Hi, {user.name || "User"}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`} />
          </button>

          {/* --- DROPDOWN MENU --- */}
          {showMenu && (
            <>
              {/* Lớp nền trong suốt để click ra ngoài thì đóng menu */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowMenu(false)}
              ></div>

              {/* Danh sách menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-1">
                  
                  {/* Item 1: My Info */}
                  <Link 
                    to="/my-info" 
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
                    onClick={() => setShowMenu(false)}
                  >
                    <User className="w-4 h-4 text-cyan-400" />
                    My Info
                  </Link>

                  {/* Divider */}
                  <div className="h-px bg-gray-700 my-1 mx-2"></div>

                  {/* Item 2: Logout */}
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
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

      {/* --- LOGOUT CONFIRMATION POPUP (Giữ nguyên) --- */}
      {showConfirm && createPortal(
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