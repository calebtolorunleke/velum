import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  Search,
  SlidersHorizontal,
  LogOut,
  User as UserIcon,
  X,
  ChevronDown,
  MenuIcon,
} from "lucide-react";

const Header = ({ onMobileMenuToggle }) => {
  const { user, logout, searchQuery, setSearchQuery, sortBy, setSortBy } =
    useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[#E5DEC9]/60 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      {/* Left Section: Mobile Toggle & Search Bar */}
      <div className="flex flex-1 items-center gap-3 md:gap-4 w-full">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="rounded-lg p-2 text-[#8C7A6B] hover:bg-[#E5DEC9]/30 hover:text-[#2B211B] md:hidden"
          aria-label="Open sidebar menu"
        >
          <MenuIcon className="size-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8C7A6B]" />
          <input
            type="text"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files, folders, and storage..."
            className="w-full rounded-lg border border-[#E5DEC9]/80 bg-white py-2 pl-9 pr-8 text-sm text-[#2B211B] placeholder-[#8C7A6B]/70 shadow-sm transition-colors focus:border-[#C49A6C] focus:outline-none focus:ring-1 focus:ring-[#C49A6C]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#2B211B]"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Right Section: Sort Selector & User Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Sort Filter Selector */}
        <div className="relative hidden items-center sm:flex">
          <SlidersHorizontal className="absolute left-3 size-4 text-[#8C7A6B]" />
          <select
            value={sortBy || "name_asc"}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-lg border border-[#E5DEC9]/80 bg-white py-2 pl-9 pr-8 text-xs font-medium text-[#2B211B] shadow-sm transition-colors focus:border-[#C49A6C] focus:outline-none"
          >
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="date_desc">Date (Newest first)</option>
            <option value="date_asc">Date (Oldest first)</option>
            <option value="size_desc">Size (Largest first)</option>
            <option value="size_asc">Size (Smallest first)</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 size-3.5 text-[#8C7A6B]" />
        </div>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-[#E5DEC9]/30"
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user?.name || "User Avatar"}
                className="size-8 rounded-full object-cover border border-[#C49A6C]"
              />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-full bg-[#C49A6C] text-xs font-semibold text-white">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <span className="hidden text-sm font-medium text-[#2B211B] md:inline-block">
              {user?.name || "Account"}
            </span>
            <ChevronDown className="hidden size-4 text-[#8C7A6B] md:inline-block" />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#E5DEC9]/80 bg-white p-1.5 shadow-lg ring-1 ring-black/5">
              <div className="px-3 py-2 border-b border-[#E5DEC9]/50">
                <p className="text-xs font-medium text-[#2B211B] truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-[11px] text-[#8C7A6B] truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="size-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
