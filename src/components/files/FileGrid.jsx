import { useApp } from "@/context/AppContext";
import React from "react";
import { Spinner } from "../ui/Spinner";
import { EmptyState } from "../ui/EmptyState";

const FileGrid = ({
  onFolderClick,
  onPreeviewFile,
  onShareItem,
  onRenameItem,
  onMoveItem,
  onDeleteItem,
}) => {
  const { folders, files, isDriveLoading } = useApp();

  if (isDriveLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
        <Spinner size="lg" className="text-orange-600" />
        <p className="text-sm font-semibold">Loading items....</p>
      </div>
    );
  }

  const hashFolders = folders && folders.length > 0;
  const hashFiles = files && files.length > 0;

  if (!hashFolders && !hashFiles) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* folders section  */}
      {hashFolders && (
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Folders
          </h3>
          <div className=""></div>
        </div>
      )}

      {/* folders section  */}
    </div>
  );
};

export default FileGrid;
