import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface LinkProps {
  to: string;
  linkText: string;
  message?: string;
  className?: string;
  containerClassName?: string;
}

const Link: React.FC<LinkProps> = ({
  message,
  linkText,
  to,
  className = "",
  containerClassName = "",
}) => {
  const defaultLinkStyles =
    "font-semibold text-blue-500 hover:text-blue-400 transition-colors";

  return (
    <span className={containerClassName}>
      {message && `${message} `}
      <RouterLink
        to={to}
        className={`${defaultLinkStyles} ${className}`.trim()}
      >
        {linkText}
      </RouterLink>
    </span>
  );
};

export default Link;
