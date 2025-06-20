import { useState } from "react";
import FlexBox from "../FlexBox";
import Text from "../Text";
import Button from "../Button";
import { useBoundStore } from "~/store/base.store";
import Input from "../Input";
import { isPositiveFinite } from "~/utils/common";
import type { CharacterUpdateProps } from "~/types/common.type";
import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";

const CharacterUpdate = ({
  param,
  data,
  append,
  format,
  label,
}: CharacterUpdateProps) => {
  const updateCharacter = useBoundStore((state) => state.updateCharacter);
  const [toggleEditable, setToggleEditable] = useState(false);
  const [value, setValue] = useState("");

  const onValueChange = (value: string) => {
    if (format === "number" && isPositiveFinite(value)) {
      setValue(value);
    } else if (format === "string") {
      setValue(value);
    }
  };

  const updateValue = () => {
    if (value) {
      updateCharacter(value || "", param);
      setValue("");
    }
    setToggleEditable(false);
  };

  return (
    <FlexBox
      className="flex-1/2 bg-black-100/25"
      responsive="NONE"
      orientation="COLUMN"
    >
      <Text className="text-xs sm:text-sm" value={label} />
      {toggleEditable ? (
        <FlexBox responsive="NONE" className="gap-2">
          <Input
            onValueChange={onValueChange}
            maxLength={format === "number" ? 3 : 15}
            className="mt-1 px-2 py-0.5 border-2 border-orange-400 rounded-md outline-none w-20 text-sm"
            value={value}
          />
          <Button
            iconConfig={{
              icon: "check",
              label: ACCESIBILITY_TEXT.CHANGE_HEIGHT,
            }}
            styles={{ variant: "ICON", size: "XS" }}
            className={"text-orange-600"}
            onButtonClick={updateValue}
            iconWidth={"NORMAL"}
          />
        </FlexBox>
      ) : (
        <FlexBox responsive="NONE" className="gap-2">
          <Text
            className="text-md sm:text-lg capitalize"
            value={data}
            append={append}
          />
          <Button
            iconConfig={{ icon: "pen", label: ACCESIBILITY_TEXT.CHANGE_HEIGHT }}
            styles={{ variant: "ICON", size: "XS" }}
            className={"text-orange-600"}
            onButtonClick={() => setToggleEditable(!toggleEditable)}
            iconWidth={"NORMAL"}
          />
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default CharacterUpdate;
