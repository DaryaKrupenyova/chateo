import React from "react";

interface LogoutIconProps {
  onClick?: () => void;
  className?: string;
}

export const LogoutIcon: React.FC<LogoutIconProps> = ({ onClick, className = "" }) => {
  return (
    <svg onClick={onClick} className={className} viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.32997 4.41992L6.99998 5.70992L8.79998 7.50992L9.96998 7.99995H0V9.99992H9.94997L8.76 10.5299L6.99 12.29L8.34 13.5699L12.91 8.99994L8.32997 4.41992Z" />
      <path d="M6.00002 0H4V2.00002V3.99998H6.00002V2.00002H15V16H6.00002V14H4V16V18H6.00002H17V0H6.00002Z" />
    </svg>
  );
};
