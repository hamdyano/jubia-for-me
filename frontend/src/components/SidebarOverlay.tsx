import React from 'react';

interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarOverlay: React.FC<SidebarOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      onClick={onClose}
    />
  );
};

export default SidebarOverlay;