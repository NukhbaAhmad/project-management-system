import { IconProps } from "@/types/general";
import React from "react";

const DashboardIcon: React.FC<IconProps> = ({
  size = "20px",
  className = "",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: size, height: size }}
      className={className}
      {...props}
    >
      <path
        d="M3 9L12 3L21 9L12 15L3 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 12V18H19V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashboardIcon;
