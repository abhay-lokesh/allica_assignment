import type { InputProps } from "~/types/common.type";

const Input = ({
  placeholder,
  className,
  defaultValue,
  value,
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

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key === "Enter") {
      e.stopPropagation();
      if (onEnter) {
        onEnter();
      } else if (onValueChange) {
        onValueChange((e.target as HTMLInputElement).value);
      }
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={className || ""}
      defaultValue={defaultValue}
      value={value ? value : defaultValue}
      {...props}
      onChange={handleChange}
      onKeyUp={handleEnter}
    />
  );
};

export default Input;
