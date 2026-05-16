import React from "react";

interface NoDataProps {
  title?: string;
  message?: string;
}

const NoData: React.FC<NoDataProps> = ({
  title = "No Data Found",
  message = "There are currently no records available to display.",
}) => {
  return (
    <div className="flex w-full items-center justify-center py-12 px-4">
      <div className="flex max-w-sm flex-col items-center rounded-2xl border border-[#1f2937] bg-[#111827]/60 p-8 text-center shadow-xl backdrop-blur-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5865f2]/10 text-[#5865f2]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="M3.3 7 12 12l8.7-5" />
            <path d="M12 22V12" />
          </svg>
        </div>

        {/* Text Messaging Content */}
        <h3 className="text-base font-semibold text-[#e2e8f0] tracking-wide">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-[#94a3b8] leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

export default NoData;
