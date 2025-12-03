import { Link, Location } from "react-router-dom";
import { Home, Tv, Users } from "lucide-react";

interface NavMenuProps {
  location: Location;
}

const navItems = [
  { name: "Home", icon: <Home className="w-4 h-4" />, path: "/" },
  // { name: "Channels", icon: <Tv className="w-4 h-4" />, path: "/channels" },
  // { name: "Community", icon: <Users className="w-4 h-4" />, path: "/community" },
  { name: "About", icon: <Users className="w-4 h-4" />, path: "/about" },
];

const NavMenu = ({ location }: NavMenuProps) => (
  <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-16">
    {navItems.map((item) => {
      const active = location.pathname === item.path;
      return (
        <Link
          key={item.name}
          to={item.path}
          className={`flex items-center gap-3 px-2 text-base font-medium transition-colors ${
            active
              ? "text-white border-b-2 border-purple-500 pb-1"
              : "text-gray-300 hover:text-white hover:border-b-2 hover:border-purple-400 pb-1 border-transparent"
          }`}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      );
    })}
  </nav>
);

export default NavMenu;
