import { formatBytes, getFileIcon } from "@/assets/assets";
// import { format } from "date-fns";
import React from "react";
import { ItemDropdown } from "../ui/ItemDropdown";

const FileCard = ({ file, onPreview, onShare, onRename, onMove, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <div
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-orange-200 cursor-pointer"
      onClick={() => onPreview && onPreview(file)}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
          {getFileIcon(file?.mime_type, "size-6")}
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <ItemDropdown
            item={file}
            onPreview={onPreview}
            onShare={onShare}
            onRename={onRename}
            onMove={onMove}
            onDelete={onDelete}
          />
        </div>
      </div>

      <div>
        <h4
          className="truncate text-sm font-medium text-slate-800 transition-colors group-hover:text-orange-700"
          title={file?.name}
        >
          {file?.name}
        </h4>

        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>{file?.size ? formatBytes(file.size) : "0 B"}</span>
          <span>{formatDate(file?.created_at)}</span>
          <span>{formatDate(file?.created_at)}</span>
          <span>{formatDate(file?.created_at)}</span>
          <span>{formatDate(file?.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
