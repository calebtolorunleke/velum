import { FolderOpenIcon } from "lucide-react";

export function EmptyState({
  title = "No items found",
  description = "Drag & drop files here or click New to get started.",
  icon: Icon = FolderOpenIcon,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="size-16 rounded-2xl bg-[#F9F6F0] border border-[#E5DEC9] flex items-center justify-center mb-4 text-[#8C7A6B]">
        <Icon className="size-8" />
      </div>
      <h3 className="text-base font-semibold text-[#2B211B] mb-1">{title}</h3>
      <p className="text-sm text-[#8C7A6B] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
