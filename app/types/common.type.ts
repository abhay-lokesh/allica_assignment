import type { IconName } from "lucide-react/dynamic";
import type { ComponentProps } from "react";
import type { CharacterDisplay } from "./character.type";

export type Primitive = string | number | boolean;
export type Sizes = "XS" | "SM" | "MD" | "LG";
export type Orientation = "ROW" | "COLUMN";

interface IconProps {
  iconConfig?: { icon: IconName; label: string };
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
  onButtonClick: () => void;
  text?: string;
  state?: "DISABLED" | "LOADING" | null;
  styles?: { variant?: "OUTLINE" | "FILLED" | "GHOST" | "ICON"; size?: Sizes };
}

export interface ComboProps {
  label: string;
  value?: string;
  append?: string;
  prepend?: string;
}

export interface CharacterUpdateProps {
  prop: string;
  param: keyof CharacterDisplay;
  data: string | number;
  format: "string" | "number";
  label: string;
  append?: string;
}

export interface InputProps extends ComponentProps<"input"> {
  onValueChange: (val: string) => void;
  onEnter?: () => void;
}
