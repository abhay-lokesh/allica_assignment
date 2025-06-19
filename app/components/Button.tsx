import { DynamicIcon } from "lucide-react/dynamic";
import type React from "react";
import type { ButtonProps } from "~/types/common.type";
const IconWidth = { THIN: 1, NORMAL: 2, BOLD: 3 };
const variantMap = {
  OUTLINE: " border border-orange-400 text-orange-400 rounded-full",
  FILLED: "px-4 py-1 bg-orange-400 text-white rounded-full",
  GHOST: "px-4 py-1 bg-orange-100 rounded-full",
  ICON: "",
};
const sizeMap = {
  SM: "px-2 py-0.5 text-xs",
  MD: "px-5 py-0.5 text-sm",
  LG: "px-7 py-1 text-base",
};
const Button = ({
  text,
  icon,
  iconPosition,
  onButtonClick,
  className,
  iconWidth,
  state,
  styles = { variant: "OUTLINE", size: "MD" },
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onButtonClick) {
      onButtonClick();
    }
  };
  const { variant = "OUTLINE", size = "MD" } = styles || {};
  return (
    <button
      type="button"
      disabled={state === "DISABLED"}
      className={`transition-all ${className || ""}
      ${variantMap[variant]}
      ${sizeMap[size]}
    ${
      state === "DISABLED"
        ? "pointer-none bg-black/5 border-slate-500 text-slate-500"
        : "cursor-pointer hover:bg-orange-50"
    }`}
      onClick={handleClick}
    >
      {iconPosition === "LEFT" && icon ? (
        <DynamicIcon
          name={icon}
          className="hover:stroke-orange-600"
          strokeWidth={IconWidth[iconWidth || "NORMAL"]}
        />
      ) : null}
      {text ? <span>{text}</span> : null}
      {icon && !text ? (
        <DynamicIcon
          name={icon}
          className="hover:stroke-orange-600"
          strokeWidth={IconWidth[iconWidth || "NORMAL"]}
        />
      ) : null}
      {iconPosition === "RIGHT" && icon ? (
        <DynamicIcon
          name={icon}
          className="hover:stroke-orange-600"
          strokeWidth={IconWidth[iconWidth || "NORMAL"]}
        />
      ) : null}
    </button>
  );
};

export default Button;
