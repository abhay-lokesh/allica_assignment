import type { TextProps } from "~/types/common.type";
import { Fragment } from "react";

const Text = ({
  value,
  className,
  prepend,
  append,
  variant = "NORMAL",
}: TextProps) =>
  value ? (
    <Fragment>
      {variant === "NORMAL" ? (
        <p className={className}>
          {prepend ? <span>{prepend}</span> : null}
          {value}
          {append ? <span>{append}</span> : null}
        </p>
      ) : null}
      {variant === "HEADER" ? (
        <h1 className={className}>
          {prepend ? <span>{prepend}</span> : null}
          {value}
          {append ? <span>{append}</span> : null}
        </h1>
      ) : null}
      {variant === "SUBHEADER" ? (
        <h3 className={className}>
          {prepend ? <span>{prepend}</span> : null}
          {value}
          {append ? <span>{append}</span> : null}
        </h3>
      ) : null}
    </Fragment>
  ) : null;
export default Text;
