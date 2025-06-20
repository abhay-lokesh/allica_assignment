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
    } else if (format === "string" && value !== "") {
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
    <FlexBox responsive="NONE" orientation="COLUMN">
      <Text className="text-xs" value={label} />
      {toggleEditable ? (
        <FlexBox responsive="NONE" className="gap-1">
          <Input
            onValueChange={onValueChange}
            className="mt-0.5 px-1 py-0.5 border-2 border-orange-400 rounded-3xl outline-none w-20 text-xs"
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
            iconWidth={"THIN"}
          />
        </FlexBox>
      ) : (
        <FlexBox responsive="NONE" className="gap-1">
          <Text className="text-sm" value={data} append={append} />
          <Button
            iconConfig={{ icon: "pen", label: ACCESIBILITY_TEXT.CHANGE_HEIGHT }}
            styles={{ variant: "ICON", size: "XS" }}
            className={"text-orange-600"}
            onButtonClick={() => setToggleEditable(!toggleEditable)}
            iconWidth={"BOLD"}
          />
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default CharacterUpdate;
