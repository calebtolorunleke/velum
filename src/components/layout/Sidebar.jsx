import { useApp } from "@/context/AppContext";
import {
  FolderPlusIcon,
  HardDriveIcon,
  HardDriveUploadIcon,
  PlusIcon,
  Trash2Icon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, DropdownItem } from "../ui/Dropdown";

const Sidebar = ({
  onCreateFolderClick,
  isMobileOpen,
  setIsMobileOpen,
  isUploading,
}) => {
  const { user } = useApp();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const storageUsed = Number(user?.storage_used ?? 0);
  const storageLimit = Number(user?.storage_limit ?? 1073741824); // 1GB
  const usedPercentage = Math.min(
    100,
    Math.round((storageUsed / storageLimit) * 100),
  );

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const navItems = [
    { label: "My Drive", path: "/", icon: HardDriveIcon },
    { label: "Shared Files", path: "/shared", icon: UsersIcon },
    { label: "Trash", path: "/trash", icon: Trash2Icon },
  ];

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Handle upload logic here
    }
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#F9F6F0] border-r border-[#E5DEC9] flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Header & Brand */}
          <div className="flex items-center justify-between px-2 pt-2">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Velum Logo" className="h-8 w-auto" />
              <div>
                <h1 className="text-xl font-medium uppercase tracking-wide text-zinc-900">
                  Velum
                </h1>
                <p className="text-[10px] text-[#8C7A6B] tracking-wider font-semibold uppercase">
                  Cloud Storage
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 rounded-lg text-[#8C7A6B] hover:text-zinc-900 hover:bg-white/60 md:hidden transition-colors"
            >
              <XIcon className="size-5" />
            </button>
          </div>

          {/* Action Area */}
          <div className="pt-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />

            <Dropdown
              trigger={
                <button
                  type="button"
                  disabled={isUploading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#C49A6C] hover:bg-[#A87E52] text-white font-medium text-sm rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <PlusIcon className="size-5" />
                  <span>New item</span>
                  <span>New item</span>
                  <span>New item</span>
                  <span>New item</span>
                </button>
              }
              align="left"
              className="w-48"
            >
              <DropdownItem
                icon={HardDriveUploadIcon}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Files
              </DropdownItem>
              <DropdownItem icon={FolderPlusIcon} onClick={onCreateFolderClick}>
                New Folder
              </DropdownItem>
            </Dropdown>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white text-[#2B211B] shadow-sm border border-[#E5DEC9]/60"
                      : "text-[#8C7A6B] hover:text-[#2B211B] hover:bg-white/50"
                  }`}
                >
                  <Icon
                    className={`size-4 ${
                      isActive ? "text-[#C49A6C]" : "text-[#8C7A6B]"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Storage Meter Widget */}
        <div className="p-4 border-t border-[#E5DEC9] bg-[#F4EFE6]/50">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
              <span>Storage</span>
              <span className="font-medium text-[#2B211B]">
                {usedPercentage}% used
              </span>
            </div>

            <div className="h-1.5 w-full bg-[#E5DEC9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C49A6C] rounded-full transition-all duration-300"
                style={{ width: `${usedPercentage}%` }}
              />
            </div>

            <p className="text-[11px] text-[#8C7A6B]">
              {formatSize(storageUsed)} of {formatSize(storageLimit)} used
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
