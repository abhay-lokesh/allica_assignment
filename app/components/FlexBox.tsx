import type { FlexboxProps } from "~/types/common.type";

const FlexBox = ({
  orientation = "ROW",
  children,
  className,
  usage = "BASIC",
  responsive = "ADAPTIVE",
}: FlexboxProps) => {
  let modifiedClass = `flex ${orientation === "COLUMN" ? "flex-col" : ""} ${
    className || ""
  } ${
    responsive === "ADAPTIVE" && orientation === "ROW"
      ? "flex-col sm:flex-row"
      : ""
  }`;
  return usage === "BASIC" ? (
    <div className={modifiedClass}>{children}</div>
  ) : (
    <article className={modifiedClass}>{children}</article>
  );
};

export default FlexBox;
