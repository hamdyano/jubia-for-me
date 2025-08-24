import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import buildings from '@/assets/buildings.jpg';

interface Props {
  children: React.ReactNode;
}

const LayoutWithSidebar = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div 
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${buildings})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Header - always visible */}
      <Header onMenuToggle={toggleSidebar} />
      
      <div className="flex flex-1">
        {/* Sidebar - always visible regardless of authentication status */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={closeSidebar} 
        />
        
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
          <div className="container mx-auto py-6 px-4 min-h-full">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer - always visible */}
      <Footer />
    </div>
  );
};

export default LayoutWithSidebar;









/*

 <SearchBar />


*/
