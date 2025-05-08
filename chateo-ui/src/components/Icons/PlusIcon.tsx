import React from "react";

interface PlusIconProps {
  onClick?: () => void;
  className?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({ onClick, className = "" }) => {
  return (
    <svg onClick={onClick} className={className} viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.4167 0.416504C21.9947 0.416504 23.2739 1.6957 23.2739 3.27365V37.5594C23.2739 39.1374 21.9947 40.4165 20.4167 40.4165C18.8387 40.4165 17.5596 39.1374 17.5596 37.5594V3.27365C17.5596 1.6957 18.8387 0.416504 20.4167 0.416504Z" />
      <path d="M0.416687 20.4162C0.416687 18.8382 1.69589 17.5591 3.27383 17.5591H37.5595C39.1375 17.5591 40.4167 18.8382 40.4167 20.4162C40.4167 21.9942 39.1375 23.2734 37.5595 23.2734H3.27383C1.69589 23.2734 0.416687 21.9942 0.416687 20.4162Z" />
    </svg>
  );
};
