import { useApp } from "@/context/AppContext";
import { toast } from "react-hot-toast";
import api from "@/config/api";

/**
 * Helper to determine if an item is a folder regardless of structure
 */
const isFolderItem = (item) => {
    if (!item) return false;
    if (typeof item === "boolean") return item;
    return (
        item.isFolder === true ||
        item.type === "folder" ||
        item.item?.type === "folder" ||
        item.item?.isFolder === true
    );
};

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
     * Helper to normalize polymorphic parameters (item object, boolean, or string ID)
     */
    const resolveItem = (itemOrId) => {
        if (typeof itemOrId === "object" && itemOrId !== null) {
            return {
                id: itemOrId._id || itemOrId.id,
                isFolder: isFolderItem(itemOrId),
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

            return { success: true, data: res.data || res };
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
    // 1. FILE UPLOADS DIRECTLY TO /api/files/upload
    // ==========================================
    const uploadFiles = async (files) => {
        if (!files || files.length === 0) return;

        const formData = new FormData();

        if (files instanceof FileList || Array.isArray(files)) {
            Array.from(files).forEach((file) => formData.append("files", file));
        } else {
            formData.append("files", files);
        }

        if (currentFolderId) {
            formData.append("parentId", currentFolderId);
        }

        setIsUploading(true);
        setUploadingProgress(0);

        const result = await runAction(
            () =>
                api.post("/api/files/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setUploadingProgress(percentCompleted);
                        }
                    },
                }),
            "File(s) uploaded successfully",
            "Failed to upload file(s)",
            async () => {
                await fetchDriveContent(currentFolderId);
                await refreshUser();
            }
        );

        setIsUploading(false);
        setUploadingProgress(0);

        return result;
    };

    // ==========================================
    // 2. FOLDER CREATION
    // ==========================================
    const createFolder = async (folderName, parentId = currentFolderId) => {
        if (!folderName?.trim()) {
            toast.error("Folder name cannot be empty");
            return;
        }

        const targetParentId = parentId || null;

        return runAction(
            () =>
                api.post("/api/folders/create", {
                    name: folderName.trim(),
                    parentId: targetParentId,
                }),
            "Folder created successfully",
            "Failed to create folder",
            () => fetchDriveContent(targetParentId)
        );
    };

    // ==========================================
    // 3. POLYMORPHIC OPERATIONS (Accepts Item object or ID string)
    // ==========================================

    // Delete Item
    const deleteItem = async (itemOrId) => {
        const { id, isFolder, name } = resolveItem(itemOrId);
        const endpoint = isFolder ? `/api/folders/${id}` : `/api/files/${id}`;

        return runAction(
            () => api.delete(endpoint),
            `"${name}" moved to trash`,
            `Failed to delete ${name}`,
            async () => {
                await fetchDriveContent(currentFolderId);
                await refreshUser();
            }
        );
    };

    // Rename Item
    const renameItem = async (itemOrId, newName) => {
        const { id, isFolder } = resolveItem(itemOrId);
        const endpoint = isFolder
            ? `/api/folders/${id}/rename`
            : `/api/files/${id}/rename`;

        return runAction(
            () => api.patch(endpoint, { name: newName }),
            "Renamed successfully",
            "Failed to rename item",
            () => fetchDriveContent(currentFolderId)
        );
    };

    // Star / Favorite Toggle
    const toggleStarItem = async (itemOrId) => {
        const { id, isFolder, item } = resolveItem(itemOrId);
        const endpoint = isFolder
            ? `/api/folders/${id}/star`
            : `/api/files/${id}/star`;
        const isStarred = Boolean(item?.isStarred);

        return runAction(
            () => api.patch(endpoint, { isStarred: !isStarred }),
            isStarred ? "Removed from starred" : "Added to starred",
            "Failed to update star status",
            () => fetchDriveContent(currentFolderId)
        );
    };

    // Move Item (File or Folder) to a target folder
    const moveItem = async (itemOrId, targetFolderId) => {
        const { id, isFolder, name } = resolveItem(itemOrId);

        // Prevent moving a folder into itself
        if (isFolder && id === targetFolderId) {
            toast.error("Cannot move a folder into itself");
            return { success: false };
        }

        const endpoint = isFolder
            ? `/api/folders/${id}/move`
            : `/api/files/${id}/move`;

        return runAction(
            () => api.patch(endpoint, { targetFolderId: targetFolderId || null }),
            `"${name}" moved successfully`,
            `Failed to move ${name}`,
            async () => {
                await fetchDriveContent(currentFolderId);
            }
        );
    };

    return {
        runAction,
        uploadFiles,
        createFolder,
        deleteItem,
        renameItem,
        toggleStarItem,
        moveItem,
        currentFolderId,
        isUploading,
        uploadingProgress,
        refreshDrive: () => fetchDriveContent(currentFolderId),
    };
}