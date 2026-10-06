import api from "@/config/api";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

const ROOT_BREADCRUMB = [{ id: null, name: "My Drive" }];

const getErrMsg = (err, fallBack) => err.response?.data?.error || fallBack;

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // upload global state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // drive view state
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState(ROOT_BREADCRUMB);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [isDriveLoading, setIsDriveLoading] = useState(false);

  // filter & sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");

  // refresh user profile & storage status
  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get("/api/auth/me");
      setUser(data.user);
      return data.user;
    } catch (error) {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  // auth action helper
  const authAction = async (requestFn, successMsg, errorFallback) => {
    try {
      const { data } = await requestFn();
      setUser(data.user);
      if (successMsg) toast.success(successMsg);
      return true;
    } catch (err) {
      toast.error(getErrMsg(err, errorFallback));
      return false;
    }
  };

  const login = (email, password) => {
    return authAction(
      () => api.post("/api/auth/login", { email, password }),
      "Welcome back!",
      "Login failed",
    );
  };

  const register = (name, email, password) => {
    return authAction(
      () => api.post("/api/auth/register", { name, email, password }),
      "Account created successfully!",
      "Registration failed",
    );
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out");
    } catch (error) {
      toast.error("Logout error");
    }
  };

  // AppContext.jsx
  const fetchDriveContent = useCallback(
    async (folderId = null, search = searchQuery, sort = sortBy) => {
      if (!user) return;
      setIsDriveLoading(true);
      try {
        const parentParam = folderId || "null";
        const [folderRes, fileRes, detailRes] = await Promise.all([
          api.get("/api/folders", { params: { parent_id: parentParam } }),
          api.get("/api/files", {
            params: { folder_id: parentParam, search, sort },
          }),
          folderId ? api.get(`/api/folders/${folderId}`) : null,
        ]);

        setFolders(folderRes.data.folders);
        setFiles(fileRes.data.files);
        setBreadcrumbs(detailRes?.data?.breadcrumbs || ROOT_BREADCRUMB);
      } catch (error) {
        toast.error("Error loading drive contents");
      } finally {
        setIsDriveLoading(false);
      }
    },
    [user, searchQuery, sortBy], // Removed currentFolderId
  );
  const value = {
    user,
    setUser,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
    isUploading,
    setIsUploading,
    uploadProgress,
    setUploadProgress,
    refreshUser,
    currentFolderId,
    setCurrentFolderId,
    breadcrumbs,
    folders,
    setFolders,
    files,
    setFiles,
    isDriveLoading,
    fetchDriveContent,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
