import {
  MoreVerticalIcon,
  EyeIcon,
  Share2Icon,
  Edit2Icon,
  FolderInputIcon,
  Trash2Icon,
} from "lucide-react";
import { Dropdown, DropdownItem } from "./Dropdown";

export function ItemDropdown({
  item,
  onPreview,
  onShare,
  onRename,
  onMove,
  onDelete,
}) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown
        trigger={
          <button
            type="button"
            className="p-1.5 rounded-lg text-[#8C7A6B] hover:text-[#2B211B] hover:bg-[#F9F6F0] opacity-0 group-hover:opacity-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/50"
          >
            <MoreVerticalIcon className="size-4" />
          </button>
        }
      >
        {onPreview && (
          <DropdownItem icon={EyeIcon} onClick={() => onPreview(item)}>
            Preview
          </DropdownItem>
        )}
        <DropdownItem icon={Share2Icon} onClick={() => onShare(item)}>
          Share Link
        </DropdownItem>
        <DropdownItem icon={Edit2Icon} onClick={() => onRename(item)}>
          Rename
        </DropdownItem>
        <DropdownItem icon={FolderInputIcon} onClick={() => onMove(item)}>
          Move to...
        </DropdownItem>
        <DropdownItem icon={Trash2Icon} danger onClick={() => onDelete(item)}>
          Delete
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
