import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageSquare, BookOpen, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/chat', icon: MessageSquare, label: 'Assistente' },
    { path: '/learn', icon: BookOpen, label: 'Aprender' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-200">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-slate-200 px-4 py-2 flex justify-between items-center z-50 safe-area-bottom">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-full py-1 transition-colors duration-200 ${
              isActive(item.path)
                ? 'text-indigo-600'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <item.icon
              size={24}
              strokeWidth={isActive(item.path) ? 2.5 : 2}
            />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;