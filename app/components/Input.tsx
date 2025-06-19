import type { ComponentProps } from "react";

const Input = ({
  placeholder,
  className,
  defaultValue,
  value,
  onChange,
  onKeyDown,
  onKeyUp,
  onFocus,
  onBlur,
}: ComponentProps<"input">) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={className || ""}
      defaultValue={defaultValue}
      value={value}
      onKeyDown={onKeyDown}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default Input;
