import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, Building, Home, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

// Logo import
import Logo from '/images/logos/khanchuwa-logo.png';

// Global Context
import {useAuth} from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  collapsed = false,
  onToggleCollapse 
}) => {


    const { isAuthenticated, user, logout } = useAuth();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
      const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.name) {
      const names = user.name.split(' ');
      return names.length > 1
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : user.name.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

      const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.name) {
      return user.name;
    }
    return 'User';
  };

  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/dashboard/places', label: 'Places', icon: <Building size={20} /> },
    { path: '/dashboard/users', label: 'Users', icon: <Users size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-64'} 
        bg-white border-r border-gray-100 text-black z-50
        flex flex-col shadow-sm
      `}>
        
        {/* Header */}
        <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'} border-b border-gray-100`}>
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="Khanchuwa Logo" className="w-8 h-8" />
              <span className="text-green-600 font-semibold text-lg">Khanchuwa</span>
            </div>
          )}
          {collapsed && (
            <img src={Logo} alt="Khanchuwa Logo" className="w-8 h-8" />
          )}
          
          {/* Collapse toggle button - hidden on mobile */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={`
                    flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} 
                    px-3 py-3 rounded-xl transition-all duration-200 group
                    ${isActive(item.path) 
                      ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  title={collapsed ? item.label : ''}
                >
                  <div className={`
                    ${isActive(item.path) 
                      ? 'text-green-600' 
                      : 'text-gray-400 group-hover:text-gray-600'
                    }
                  `}>
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <span className="text-xs font-mono">{item.label}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Logout Section */}
            {!collapsed &&
            (
                      <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-all duration-300 cursor-pointer"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
            )}
        {/* Footer - User profile or additional info */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-medium">{getInitials()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{getUserDisplayName()}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>

              </div>
            </div>
          </div>
        )}
        
        {collapsed && (
          <div className="p-4 border-t border-gray-100 flex justify-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-medium">{getInitials()}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;