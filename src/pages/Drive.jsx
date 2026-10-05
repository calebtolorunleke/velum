import FileGrid from "@/components/files/FileGrid";
import Breadcrumbs from "@/components/layout/Breadcrums";
import { useApp } from "@/context/AppContext";
import { useDrive } from "@/hooks/useDrive";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Drive = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { fetchDriveContent, setCurrentFolderId } = useApp();
  const { deleteItem: executeDelete } = useDrive();

  useEffect(() => {
    const id = folderId || null;
    setCurrentFolderId(id);
    fetchDriveContent(id);
  }, [folderId, fetchDriveContent, setCurrentFolderId]);

  // Active item modals state
  const [previewFile, setPreviewFile] = useState(null);
  const [shareItem, setShareItem] = useState(null);
  const [renameItem, setRenameItem] = useState(null);
  const [moveItem, setMoveItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteItem, setItemToDelete] = useState(null);

  return (
    <div className="space-y-4">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs />

      {/* Folders & Files Grid */}
      <FileGrid
        onFolderClick={(folder) =>
          navigate(`/folder/${folder._id || folder.id}`)
        }
        onPreviewFile={setPreviewFile}
        onShareItem={setShareItem}
        onRenameItem={setRenameItem}
        onMoveItem={setMoveItem}
        onDeleteItem={setItemToDelete}
      />
    </div>
  );
};

export default Drive;
