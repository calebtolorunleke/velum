import { useApp } from "@/context/AppContext";
import React from "react";
import { Spinner } from "../ui/Spinner";
import { EmptyState } from "../ui/EmptyState";
import FolderCard from "../folders/FolderCard";
import FileCard from "../files/FileCard"; // Import your FileCard component

const FileGrid = ({
  onFolderClick,
  onPreviewFile,
  onShareItem,
  onRenameItem,
  onMoveItem,
  onDeleteItem,
}) => {
  const { folders, files, isDriveLoading } = useApp();

  if (isDriveLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#8C7A6B]">
        <Spinner size="lg" className="text-[#C49A6C]" />
        <p className="text-sm font-semibold">Loading items...</p>
      </div>
    );
  }

  const hasFolders = folders && folders.length > 0;
  const hasFiles = files && files.length > 0;

  if (!hasFolders && !hasFiles) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {/* Folders Section */}
      {hasFolders && (
        <div>
          <h3 className="text-xs font-semibold text-[#8C7A6B] uppercase tracking-wider mb-3">
            Folders
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <FolderCard
                key={folder._id || folder.id}
                folder={folder}
                onClick={onFolderClick}
                onShare={(item) =>
                  onShareItem({ ...item, item_type: "folder" })
                }
                onRename={(item) =>
                  onRenameItem({ ...item, item_type: "folder" })
                }
                onMove={(item) => onMoveItem({ ...item, item_type: "folder" })}
                onDelete={(item) =>
                  onDeleteItem({ ...item, item_type: "folder" })
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Files Section */}
      {hasFiles && (
        <div>
          <h3 className="text-xs font-semibold text-[#8C7A6B] uppercase tracking-wider mb-3">
            Files
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <FileCard
                key={file._id || file.id}
                file={file}
                onClick={onPreviewFile}
                onShare={(item) => onShareItem({ ...item, item_type: "file" })}
                onRename={(item) =>
                  onRenameItem({ ...item, item_type: "file" })
                }
                onMove={(item) => onMoveItem({ ...item, item_type: "file" })}
                onDelete={(item) =>
                  onDeleteItem({ ...item, item_type: "file" })
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileGrid;
