import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-zinc-900 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onCreateFolderClick={() => setIsCreateFolderOpen(true)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        {/* Header Placeholder */}
        <header className="h-16 border-b border-[#E5DEC9] bg-white/80 backdrop-blur-sm px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
          <p className="text-sm font-medium text-[#8C7A6B]">Header</p>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet context={{ setIsCreateFolderOpen }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
