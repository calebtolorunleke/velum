// import FileGrid from "@/components/files/FileGrid";
// import Breadcrumbs from "@/components/layout/Breadcrums";
// import { useApp } from "@/context/AppContext";
// import { useDrive } from "@/hooks/useDrive";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const Drive = () => {
//   const navigate = useNavigate();
//   const { folderId } = useParams();
//   const { fetchDriveContent, setCurrentFolderId } = useApp();
//   const { deleteItem: executeDelete } = useDrive();

//   // Active item modals state
//   const [previewFile, setPreviewFile] = useState(null);
//   const [shareItem, setShareItem] = useState(null);
//   const [renameItem, setRenameItem] = useState(null);
//   const [moveItem, setMoveItem] = useState(null);
//   const [itemToDelete, setItemToDelete] = useState(null);

//   useEffect(() => {
//     const id = folderId || null;
//     setCurrentFolderId(id);
//     fetchDriveContent(id);
//   }, [folderId]); // Keeps only folderId in dependencies to prevent fetch loops

//   return (
//     <div className="space-y-4">
//       {/* Breadcrumbs Navigation */}
//       <Breadcrumbs />

//       {/* Folders & Files Grid */}
//       <FileGrid
//         onFolderClick={(folder) =>
//           navigate(`/folder/${folder._id || folder.id}`)
//         }
//         onPreviewFile={setPreviewFile}
//         onShareItem={setShareItem}
//         onRenameItem={setRenameItem}
//         onMoveItem={setMoveItem}
//         onDeleteItem={setItemToDelete}
//       />
//     </div>
//   );
// };

// export default Drive;

// import FileGrid from "@/components/files/FileGrid";
// import Breadcrumbs from "@/components/layout/Breadcrums";
// import { useApp } from "@/context/AppContext";
// import { useDrive } from "@/hooks/useDrive";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const Drive = () => {
//   const navigate = useNavigate();
//   const { folderId } = useParams();
//   const { fetchDriveContent, setCurrentFolderId } = useApp();
//   const { deleteItem: executeDelete } = useDrive();

//   // Active item modals state
//   const [previewFile, setPreviewFile] = useState(null);
//   const [shareItem, setShareItem] = useState(null);
//   const [renameItem, setRenameItem] = useState(null);
//   const [moveItem, setMoveItem] = useState(null);
//   const [itemToDelete, setItemToDelete] = useState(null);

//   // Sync URL folderId to AppContext whenever the URL or route changes (including refresh)
//   useEffect(() => {
//     const targetId = folderId || null;
//     setCurrentFolderId(targetId);
//     fetchDriveContent(targetId);
//   }, [folderId]);

//   return (
//     <div className="space-y-4">
//       {/* Breadcrumbs Navigation */}
//       <Breadcrumbs />

//       {/* Folders & Files Grid */}
//       <FileGrid
//         onFolderClick={(folder) => {
//           const targetId = folder._id || folder.id;
//           setCurrentFolderId(targetId);
//           fetchDriveContent(targetId);
//           navigate(`/folder/${targetId}`);
//         }}
//         onPreviewFile={setPreviewFile}
//         onShareItem={setShareItem}
//         onRenameItem={setRenameItem}
//         onMoveItem={setMoveItem}
//         onDeleteItem={setItemToDelete}
//       />
//     </div>
//   );
// };

// export default Drive;

import FileGrid from "@/components/files/FileGrid";
import Breadcrumbs from "@/components/layout/Breadcrums";
import { useApp } from "@/context/AppContext";
import { useDrive } from "@/hooks/useDrive";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Drive = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { fetchDriveContent, setCurrentFolderId, user, isLoading } = useApp();
  const { deleteItem: executeDelete } = useDrive();

  // Active item modals state
  const [previewFile, setPreviewFile] = useState(null);
  const [shareItem, setShareItem] = useState(null);
  const [renameItem, setRenameItem] = useState(null);
  const [moveItem, setMoveItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch content whenever route param or user auth state settles
  useEffect(() => {
    if (!isLoading) {
      const targetId = folderId || null;
      setCurrentFolderId(targetId);
      fetchDriveContent(targetId);
    }
  }, [folderId, isLoading, user]);

  return (
    <div className="space-y-4">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs />

      {/* Folders & Files Grid */}
      <FileGrid
        onFolderClick={(folder) => {
          const targetId = folder._id || folder.id;
          setCurrentFolderId(targetId);
          fetchDriveContent(targetId);
          navigate(`/folder/${targetId}`);
        }}
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
