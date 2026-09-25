import { XIcon } from "lucide-react";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B211B]/40 backdrop-blur-xs animate-fade-in"
    >
      <div
        className={`w-full ${maxWidth} bg-white border border-[#E5DEC9] rounded-2xl shadow-xl shadow-[#2B211B]/10 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DEC9]">
          <h3 className="text-base font-semibold text-[#2B211B]">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8C7A6B] hover:text-[#2B211B] hover:bg-[#F9F6F0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/50"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
