import { EyeIcon, HideEyeIcon } from "@/icons";
import React, { InputHTMLAttributes, useState } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  placeholder,
  type = "text",
  required = false,
  className = "",
  labelClassName = "",
  containerClassName = "",
  ...props
}) => {
  // Local state to track visibility ONLY if it's a password field
  const [showPassword, setShowPassword] = useState(false);

  const defaultContainerStyles = "space-y-1.5 w-full";
  const defaultLabelStyles = "block text-sm font-medium text-slate-300";
  const defaultInputStyles =
    "w-full rounded-xl bg-[#111928] border border-slate-800 px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all";

  const isPasswordField = type === "password";

  // Determine the actual HTML input type to apply
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className={`${defaultContainerStyles} ${containerClassName}`.trim()}>
      <label
        htmlFor={id}
        className={`${defaultLabelStyles} ${labelClassName}`.trim()}
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {/* Relative wrapper needed so the eye icon sits on top of the input right side */}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          required={required}
          className={`${defaultInputStyles} ${isPasswordField ? "pr-11" : ""} ${className}`.trim()}
          {...props}
        />

        {/* Conditionally render the show/hide password button */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            {showPassword ? (
              /* Hide Eye */
              <HideEyeIcon />
            ) : (
              /* View Icon */
              <EyeIcon />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
