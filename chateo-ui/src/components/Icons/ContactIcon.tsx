import React from "react";

interface ContactIconProps {
  onClick?: () => void;
  className?: string;
}

export const ContactIcon: React.FC<ContactIconProps> = ({ onClick, className = "" }) => {
  return (
    <svg onClick={onClick} className={className} viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5C3 2.23858 5.23858 0 8 0C10.7614 0 13 2.23858 13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5ZM8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" />
      <path d="M2.34315 13.3431C0.842855 14.8434 0 16.8783 0 19H2C2 17.4087 2.63214 15.8826 3.75736 14.7574C4.88258 13.6321 6.4087 13 8 13C9.5913 13 11.1174 13.6321 12.2426 14.7574C13.3679 15.8826 14 17.4087 14 19H16C16 16.8783 15.1571 14.8434 13.6569 13.3431C12.1566 11.8429 10.1217 11 8 11C5.87827 11 3.84344 11.8429 2.34315 13.3431Z" />
    </svg>
  );
};
