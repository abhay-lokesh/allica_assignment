import type { InputProps } from "~/types/common.type";

const Input = ({
  placeholder,
  className,
  defaultValue,
  value,
  onFocus,
  onBlur,
  onValueChange,
  onEnter,
  ...props
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      e.stopPropagation();
      if (onValueChange) {
        const value = e.target.value;
        onValueChange(value);
      }
    }
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e && e.key === "Enter") {
      e.stopPropagation();
      if (onEnter) {
        onEnter();
      }
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={className || ""}
      defaultValue={defaultValue}
      value={value}
      {...props}
      onChange={handleChange}
      onKeyUp={handleEnter}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default Input;
