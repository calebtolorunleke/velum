import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { ChevronRight, HardDrive } from "lucide-react";

const Breadcrumbs = () => {
  const { breadcrumbs = [] } = useApp();

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 overflow-x-auto text-sm text-[#8C7A6B] py-1 no-scrollbar"
    >
      {/* Root "My Drive" Nav Link */}
      <Link
        to="/"
        className="flex items-center gap-1.5 font-medium text-[#8C7A6B] hover:text-[#2B211B] transition-colors shrink-0"
      >
        <HardDrive className="size-4 text-[#C49A6C]" />
        <span>My Drive</span>
      </Link>

      {/* Dynamic Folder Trail */}
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const folderId = crumb._id || crumb.id;

        return (
          <React.Fragment key={folderId || index}>
            <ChevronRight className="size-3.5 text-[#8C7A6B]/50 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-[#2B211B] truncate max-w-[180px]">
                {crumb.name}
              </span>
            ) : (
              <Link
                to={`/folder/${folderId}`}
                className="font-medium text-[#8C7A6B] hover:text-[#2B211B] transition-colors truncate max-w-[150px]"
              >
                {crumb.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
