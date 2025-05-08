import React from "react";

interface BackIconProps {
  onClick?: () => void;
  className?: string;
}

export const BackIcon: React.FC<BackIconProps> = ({ onClick, className = "" }) => {
  return (
    <svg onClick={onClick} className={className} viewBox="0 0 20 35" xmlns="http://www.w3.org/2000/svg">
      <rect width="23.9282" height="4.78564" transform="matrix(0.696521 -0.717537 0.696521 0.717537 0 17.1694)" />
      <rect width="23.9282" height="4.78564" transform="matrix(0.696521 0.717537 -0.696521 0.717537 3.3335 14.397)" />
    </svg>
  );
};
