
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Users,
  Calendar,
  CreditCard,
  BookOpen,
  Timer,
  LogOut,
  CalendarDays,
  X,
  UserPlus,
  Package
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const menuItems = [
  { icon: User, label: "Profil", path: "/profile" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: Calendar, label: "Séances", path: "/sessions" },
  { icon: CalendarDays, label: "Calendrier", path: "/calendar" },
  { icon: Package, label: "Forfaits", path: "/packages" },
  { icon: CreditCard, label: "Règlements", path: "/payments" },
  { icon: BookOpen, label: "Ateliers", path: "/workshops" },
  { icon: Timer, label: "Chronomètre", path: "/timer" },
  { icon: UserPlus, label: "Groupes", path: "/groups" },
];

export function Sidebar({ onClose, isMobile }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-secondary to-secondary-600 p-4 flex flex-col shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <h1 className="text-xl font-bold text-white leading-tight">
            Assistant
            <span className="block text-primary-foreground">Coaching Sportif</span>
          </h1>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="text-white md:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={isMobile ? onClose : undefined}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md transform scale-105"
                      : "text-gray-300 hover:bg-white/10 hover:text-white hover:transform hover:translate-x-1"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Button
        variant="ghost"
        className="mt-4 text-gray-300 hover:text-white hover:bg-white/10 w-full justify-start group transition-all duration-200"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-300" />
        Déconnexion
      </Button>
    </div>
  );
}
