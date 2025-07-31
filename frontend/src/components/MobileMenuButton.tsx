import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface MobileMenuButtonProps {
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="lg:hidden"
      onClick={onClick}
    >
      <Menu className="w-6 h-6" />
    </Button>
  );
};

export default MobileMenuButton;