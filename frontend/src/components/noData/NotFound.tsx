const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d1321] px-4 text-center font-sans select-none">
      {/* ERROR Header */}
      <h2 className="text-4xl font-extrabold tracking-wider text-[#e2e8f0] uppercase md:text-5xl">
        Error
      </h2>

      {/* Not Found */}
      <div className="my-6 flex items-center justify-center gap-2 text-7xl font-black text-[#5865f2] sm:text-8xl md:text-9xl">
        <span className="font-mono tracking-tighter">4</span>

        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-8 border-[#5865f2] bg-transparent sm:h-32 sm:w-32 md:h-36 md:w-36">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="flex gap-3 sm:gap-4">
              <div className="h-3 w-3 bg-[#5865f2] sm:h-4 sm:w-4" />
              <div className="h-3 w-3 bg-[#5865f2] sm:h-4 sm:w-4" />
            </div>
            <div className="relative h-3 w-8 bg-[#5865f2] sm:h-4 sm:w-10">
              <div className="absolute bottom-0 left-2 right-2 top-1/2 bg-[#0d1321]" />
            </div>
          </div>
        </div>

        <span className="font-mono tracking-tighter">4</span>
      </div>

      {/* Description Text */}
      <p className="mb-8 text-base font-medium text-[#94a3b8] sm:text-lg md:text-xl">
        We can’t seem to find the page you are looking for!
      </p>

      {/* Action Button */}
      <a
        href="/"
        className="rounded-lg border border-[#1e293b] bg-[#1e293b]/40 px-6 py-3 text-sm font-semibold text-[#94a3b8] transition-all duration-200 hover:bg-[#1e293b]/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2] focus:ring-offset-2 focus:ring-offset-[#0d1321]"
      >
        Back to Home Page
      </a>
    </div>
  );
};
export default NotFound;
