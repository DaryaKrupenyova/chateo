import React from "react";

interface ArrowIconProps {
  onClick?: () => void;
  className?: string;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ onClick, className = "" }) => {
  return (
    <svg onClick={onClick} className={className} viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.71296 6.00023L1.70196 -0.00976562L0.287964 1.40423L4.88796 6.00423L0.287964 10.5972L1.70196 12.0112L7.71296 6.00023Z" />
    </svg>
  );
};
