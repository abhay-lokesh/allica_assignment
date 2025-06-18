import type { IconName } from "lucide-react/dynamic";
import type { ComponentProps } from "react";

export type Primitive = string | number | boolean;
export type Sizes = "SM" | "MD" | "LG";
export type Orientation = "ROW" | "COLUMN";

interface IconProps {
  icon?: IconName;
  iconPosition?: any;
  iconWidth?: "THIN" | "NORMAL" | "BOLD";
}

export interface TextProps extends ComponentProps<"p"> {
  value?: Primitive | null;
  prepend?: Primitive | null;
  append?: Primitive | null;
  formatter?: (val: Primitive) => Primitive;
  variant?: "HEADER" | "SUBHEADER" | "NORMAL";
}

export interface FlexboxProps extends ComponentProps<"div"> {
  orientation?: Orientation;
  usage?: "BASIC" | "STRUCTURED";
  responsive?: "ADAPTIVE" | "NONE";
}
export interface ButtonProps extends ComponentProps<"button">, IconProps {
  text?: string;
  variant?: "OUTLINE" | "FILLED" | "GHOST";
  onButtonClick?: () => void;
}
