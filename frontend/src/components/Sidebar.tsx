import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  Database, 
  Settings, 
  Image, 
  Wrench, 
  ShoppingCart,
  Users,
  BarChart3} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}



const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      
    },
    {
      title: "Main Data",
      icon: Database,
      href: "/main-data",

    },
    {
      title: "Media Settings",
      icon: Settings,
      href: "/media-settings"
    },
    {
      title: "Service Settings",
      icon: Settings,
      href: "/service-settings"
    },
    {
      title: "General Settings",
      icon: Settings,
      href: "/general-settings"
    }
  ];

  const productItems = [
    {
      title: "Media Management",
      icon: Image,
      href: "/media-management"
    },
    {
      title: "Service Management",
      icon: Wrench,
      href: "/service-management"
    },
    {
      title: "Product Management",
      icon: ShoppingCart,
      href: "/product-management"
    }
  ];

  const otherItems = [
    {
      title: "User Settings",
      icon: Users,
      href: "/user-settings"
    },
    {
      title: "Maintenance",
      icon: Wrench,
      href: "/maintenance"
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: "/reports"
    }
  ];

  const handleItemClick = (href: string) => {
    // Navigate to the route (you'll implement this with your router)
    console.log(`Navigate to: ${href}`);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] border-r border-gray-200 transform transition-transform duration-300 ease-in-out rounded-xl mt-4 mb-12 ml-4
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0`}
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <div className="px-3 space-y-1">
              {/* Main Menu Items */}
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className="w-full justify-start h-10 px-3 text-white hover:bg-orange-700 hover:text-white transition duration-300 ease-in-out"
                  onClick={() => handleItemClick(item.href)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{item.title}</span>
                </Button>
              ))}

              <Separator className="my-4" />

              {/* Products Section */}
              <div className="px-3 mb-2">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Products
                </h3>
              </div>
              {productItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className="w-full justify-start h-10 px-3 text-white hover:bg-orange-700 hover:text-white transition duration-300 ease-in-out"
                  onClick={() => handleItemClick(item.href)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{item.title}</span>
                </Button>
              ))}

              <Separator className="my-4" />

              {/* Other Items */}
              {otherItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className="w-full justify-start h-10 px-3 text-white hover:bg-orange-700 hover:text-white transition duration-300 ease-in-out"
                  onClick={() => handleItemClick(item.href)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{item.title}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Sidebar;