import { motion } from "framer-motion";
import { Link, Location } from "react-router-dom";
import { LogIn, Home, Tv, Users } from "lucide-react";

interface MobileMenuProps {
  setMenuOpen: (value: boolean) => void;
  user: { name?: string } | null;
  location: Location;
}

const navItems = [
  { name: "Home", icon: <Home className="w-4 h-4" />, path: "/" },
  { name: "Channels", icon: <Tv className="w-4 h-4" />, path: "/channels" },
  { name: "Community", icon: <Users className="w-4 h-4" />, path: "/community" },
  { name: "About", icon: <Users className="w-4 h-4" />, path: "/about" },
];

const MobileMenu = ({ setMenuOpen, user, location }: MobileMenuProps) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
  >
    <div className="flex flex-col space-y-4 px-6 py-5">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex items-center gap-3 text-gray-300 hover:text-white transition-colors ${
            location.pathname === item.path ? "text-white font-semibold" : ""
          }`}
          onClick={() => setMenuOpen(false)}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}

      {user ? (
        <div
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center gap-2 text-white bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 rounded-xl"
        >
          Hi, {user.name || "User"} 👋
        </div>
      ) : (
        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 rounded-xl justify-center"
        >
          <LogIn className="w-4 h-4" />
          Login
        </Link>
      )}
    </div>
  </motion.div>
);

export default MobileMenu;
