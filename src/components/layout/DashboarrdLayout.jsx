import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B211B] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onCreateFolderClick={() => setIsCreateFolderOpen(true)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col">
        {/* Header Placeholder */}
        <Header onMobileMenuToggle={() => setIsMobileOpen(!isMobileOpen)} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet context={{ setIsCreateFolderOpen }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
