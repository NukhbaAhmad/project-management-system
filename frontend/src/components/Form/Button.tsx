import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  text: string;
  icon?: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  text,
  icon,
  className = "",
  disabled,
  type = "submit",
  ...props
}) => {
  const defaultButtonStyles =
    "flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0d1527] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2";

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${defaultButtonStyles} ${className}`.trim()}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex items-center shrink-0">{icon}</span>}
          <span>{text}</span>
        </>
      )}
    </button>
  );
};

export default Button;
