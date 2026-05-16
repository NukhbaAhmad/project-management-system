const LoadingSpinner = ({ size = "h-12 w-12", className = "" }) => {
  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-[#0d1321] ${className}`}
    >
      <div
        className={`animate-spin rounded-full border-[3px] border-transparent border-t-[#5865f2] border-r-[#5865f2] ${size}`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
