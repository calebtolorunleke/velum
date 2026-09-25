import React from "react";

export function ProgressBar({
  progress = 0,
  className = "",
  color = "bg-[#C49A6C]",
}) {
  return (
    <div
      className={`w-full bg-[#F9F6F0] border border-[#E5DEC9]/50 rounded-full h-2 overflow-hidden ${className}`}
    >
      <div
        className={`h-full ${color} transition-all duration-300 rounded-full`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
