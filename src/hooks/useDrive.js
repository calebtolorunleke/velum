import { useApp } from "@/context/AppContext";
import { toast } from "react-hot-toast";

export function useDrive() {
    const {
        fetchDriveContent,
        refreshUser,
        currentFolderId,
        isUploading,
        setIsUploading,
        uploadingProgress,
        setUploadingProgress,
    } = useApp();

    /**
     * Helper to normalize polymorphic parameters (item object or string ID)
     */
    const resolveItem = (itemOrId) => {
        if (typeof itemOrId === "object" && itemOrId !== null) {
            return {
                id: itemOrId._id || itemOrId.id,
                isFolder: Boolean(itemOrId.isFolder || itemOrId.type === "folder"),
                name: itemOrId.name || "Item",
                item: itemOrId,
            };
        }
        return { id: itemOrId, isFolder: false, name: "Item", item: null };
    };

    /**
     * Reusable API action runner with standard toast feedback and callbacks.
     */
    const runAction = async (apiCall, successMsg, errorMsg, afterSuccess) => {
        try {
            const res = await apiCall();

            if (successMsg) {
                toast.success(successMsg);
            }

            if (afterSuccess) {
                await afterSuccess(res);
            }

            return { success: true, data: res };
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                errorMsg ||
                "An error occurred";
            toast.error(message);
            return { success: false, error: err };
        }
    };

    // ==========================================
    // 1. FILE UPLOADS WITH PROGRESS SIMULATION
    // ==========================================
    const uploadFiles = async (files, uploadApiCall) => {
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setUploadingProgress(10);

        // Simulate steady upload progress for smoother UI feedback
        const progressInterval = setInterval(() => {
            setUploadingProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 15;
            });
        }, 200);

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });

        if (currentFolderId) {
            formData.append("parentId", currentFolderId);
        }

        const result = await runAction(
            () => uploadApiCall(formData),
            `${files.length} ${files.length === 1 ? "file" : "files"} uploaded successfully`,
            "Failed to upload files",
            async () => {
                setUploadingProgress(100);
                await fetchDriveContent(currentFolderId);
                await refreshUser(); // Update storage usage quota
            }
        );

        clearInterval(progressInterval);
        setTimeout(() => {
            setIsUploading(false);
            setUploadingProgress(0);
        }, 500);

        return result;
    };

    // ==========================================
    // 2. FOLDER CREATION
    // ==========================================
    const createFolder = async (folderName, createFolderApiCall) => {
        if (!folderName?.trim()) {
            toast.error("Folder name cannot be empty");
            return;
        }

        return runAction(
            () => createFolderApiCall({ name: folderName.trim(), parentId: currentFolderId }),
            "Folder created successfully",
            "Failed to create folder",
            () => fetchDriveContent(currentFolderId)
        );
    };

    // ==========================================
    // 3. POLYMORPHIC OPERATIONS (Item or ID)
    // ==========================================

    // Move item (File or Folder) to Trash
    const deleteItem = async (itemOrId, deleteApiCall) => {
        const { id, isFolder, name } = resolveItem(itemOrId);

        return runAction(
            () => deleteApiCall(id, isFolder),
            `"${name}" moved to trash`,
            `Failed to delete ${name}`,
            async () => {
                await fetchDriveContent(currentFolderId);
                await refreshUser();
            }
        );
    };

    // Rename item (File or Folder)
    const renameItem = async (itemOrId, newName, renameApiCall) => {
        const { id, isFolder } = resolveItem(itemOrId);

        return runAction(
            () => renameApiCall(id, newName, isFolder),
            "Renamed successfully",
            "Failed to rename item",
            () => fetchDriveContent(currentFolderId)
        );
    };

    // Toggle Star / Favorite on item
    const toggleStarItem = async (itemOrId, starApiCall) => {
        const { id, isFolder, item } = resolveItem(itemOrId);
        const isStarred = item?.isStarred;

        return runAction(
            () => starApiCall(id, isFolder, !isStarred),
            isStarred ? "Removed from starred" : "Added to starred",
            "Failed to update star status",
            () => fetchDriveContent(currentFolderId)
        );
    };

    // Download File (Ignores folders or triggers archive download)
    const downloadItem = async (itemOrId, downloadApiCall) => {
        const { id, isFolder, name } = resolveItem(itemOrId);

        if (isFolder) {
            toast.error("Folder downloads are not supported directly");
            return;
        }

        return runAction(
            () => downloadApiCall(id),
            `Downloading "${name}"...`,
            "Failed to download file"
        );
    };

    return {
        runAction,
        uploadFiles,
        createFolder,
        deleteItem,
        renameItem,
        toggleStarItem,
        downloadItem,
        currentFolderId,
        isUploading,
        uploadingProgress,
        refreshDrive: () => fetchDriveContent(currentFolderId),
    };
}