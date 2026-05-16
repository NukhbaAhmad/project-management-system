import { useState } from "react";
import { DropdownItem } from "@/ui/dropdown/DropdownItem";
import { Dropdown } from "@/ui/dropdown/Dropdown";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { ProfileIcon, SignOut } from "@/icons";
import { useNavigate } from "react-router-dom";

export default function UserDropdown() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function handleSignOut(e: React.MouseEvent) {
    e.preventDefault(); 
    logoutUser();
    closeDropdown();
    navigate("/signin");
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-white dropdown-toggle"
      >
        <span className="block mr-1 font-semibold text-sm">
          {user?.name || "User"}
        </span>
        <svg
          className={`text-[#94a3b8] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="18"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-3 flex w-[260px] flex-col rounded-xl border border-[#1f2937] bg-[#111827] p-3 shadow-xl shadow-black/50"
      >
        <div className="px-2 py-1">
          <span className="block font-semibold text-sm text-black">
            {user?.name || "User"}
          </span>
          <span className="mt-0.5 block text-xs text-[#94a3b8] truncate">
            {user?.email || "user@gmail.com"}
          </span>
        </div>

        <hr className="my-2 border-[#1f2937]" />

        <ul className="flex flex-col gap-0.5">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#94a3b8] rounded-lg group transition-colors duration-150 hover:bg-[#1e293b]/50 hover:text-[#e2e8f0]"
            >
              <span className="text-[#94a3b8] group-hover:text-[#5865f2] transition-colors">
                <ProfileIcon />
              </span>
              Profile
            </DropdownItem>
          </li>

          <li>
            <Link
              to=""
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#94a3b8] rounded-lg group transition-colors duration-150 hover:bg-red-500/10 hover:text-red-400"
            >
              <span className="text-[#94a3b8] group-hover:text-red-400 transition-colors">
                <SignOut />
              </span>
              Sign out
            </Link>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
