import { Sidebar } from "./Sidebar";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div 
          className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <Sidebar 
            onClose={() => setIsSidebarOpen(false)} 
            isMobile={isMobile}
          />
        </div>
        
        <main className="flex-1 w-full transition-all duration-300 md:pl-64">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {isMobile && !isSidebarOpen && (
              <Button
                variant="outline"
                size="icon"
                className="mb-4 md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}