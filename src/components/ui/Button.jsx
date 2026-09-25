import { Spinner } from "./Spinner";

export function Button({
  children,
  variant = "primary", // primary | secondary | ghost | danger
  size = "md", // sm | md
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  icon: Icon,
  ...props
}) {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variants = {
    primary: "bg-[#C49A6C] hover:bg-[#B3895B] text-white focus:ring-[#C49A6C]",
    secondary:
      "bg-[#F9F6F0] hover:bg-[#EFEADF] text-[#2B211B] border border-[#E5DEC9] focus:ring-[#C49A6C]",
    ghost:
      "bg-transparent hover:bg-[#F9F6F0] text-[#8C7A6B] hover:text-[#2B211B] focus:ring-[#C49A6C]",
    danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500",
  };

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Spinner size="sm" className="text-current" />
      ) : Icon ? (
        <Icon className="size-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
}
