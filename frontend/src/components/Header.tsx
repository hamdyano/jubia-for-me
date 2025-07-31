import React from 'react';
import { Link } from "react-router-dom";
import transLogo from "@/assets/transLogo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastProvider";
import MobileMenuButton from './MobileMenuButton';

interface HeaderProps {
  onMenuToggle?: () => void;
  showSidebar?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, showSidebar = false }) => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const { showInfo } = useToast();

  const handleLogout = () => {
    logout();
    showInfo("You have been logged out successfully");
  };

  return (
    <div className="bg-[#111827] py-4 text-white rounded-b-3xl shadow-lg mb-8">
      <div className="w-full flex justify-between items-center px-4 md:px-8">
        {/* Left side - Mobile menu button (only shown when sidebar is enabled) and Logo */}
        <div className="flex items-center space-x-4">
          {showSidebar && onMenuToggle && (
            <MobileMenuButton onClick={onMenuToggle} />
          )}
          
          {/* Logo Section */}
          <Link
            to="/"
            className={`flex flex-col items-center text-center ${
              showSidebar ? 'lg:hidden' : 'lg:ml-38'
            }`}
          >
            <img
              src={transLogo}
              alt="Logo"
              className="h-28 w-auto md:h-36 lg:h-44 object-contain"
            />
          </Link>
        </div>

        {/* Right side - User authentication section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center">
                <span className="mr-2">Welcome,</span>
                <span className="font-semibold truncate max-w-[120px] md:max-w-[200px]">
                  {userEmail ? userEmail.split('@')[0] : ''}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 font-bold hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="bg-white text-blue-600 px-3 py-1 font-bold hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out rounded"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-3 py-1 font-bold hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;



