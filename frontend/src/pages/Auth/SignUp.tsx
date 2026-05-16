import { useState } from "react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1527] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sign Up
          </h1>
          <p className="text-sm text-slate-400">
            Enter your email and password to sign up!
          </p>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative bg-[#0d1527] px-4 text-sm text-slate-400">
            Or
          </div>
        </div>

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* First Name & Last Name row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-slate-300"
              >
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded-xl bg-[#111928] border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-slate-300"
              >
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded-xl bg-[#111928] border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Email input */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl bg-[#111928] border border-slate-800 px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-xl bg-[#111928] border border-slate-800 px-4 py-3.5 pr-11 text-sm text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  /* Eye Off Icon */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  /* Eye Icon */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-start text-sm pt-1">
            <input
              id="terms"
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 rounded-md border-slate-800 bg-[#111928] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#0d1527] transition-all mr-2.5"
              required
            />
            <label
              htmlFor="terms"
              className="text-slate-300 leading-snug cursor-pointer select-none"
            >
              By creating an account means you agree to the{" "}
              <a href="#" className="font-semibold text-white hover:underline">
                Terms and Conditions
              </a>
              , and our{" "}
              <a href="#" className="font-semibold text-white hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0d1527] transition-all cursor-pointer mt-2"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold text-blue-500 hover:text-blue-400 transition-colors"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
