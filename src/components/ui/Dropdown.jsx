import { useState, useRef, useEffect } from "react";

export function Dropdown({
  trigger,
  children,
  align = "right",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alignStyle = align === "right" ? "right-0" : "left-0";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute ${alignStyle} mt-2 w-56 rounded-xl bg-white border border-[#E5DEC9] py-1.5 shadow-lg shadow-[#2B211B]/5 z-50 animate-fade-in ${className}`}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  children,
  icon: Icon,
  onClick,
  danger = false,
  disabled = false,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${
        danger
          ? "text-rose-600 hover:bg-rose-50/80 hover:text-rose-700"
          : "text-[#2B211B] hover:bg-[#F9F6F0] hover:text-[#C49A6C]"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      <span className="font-medium">{children}</span>
    </button>
  );
}
