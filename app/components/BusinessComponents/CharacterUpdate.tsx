import { Fragment, useState } from "react";
import FlexBox from "../FlexBox";
import Text from "../Text";
import Button from "../Button";
import { useBoundStore } from "~/store/base.store";
import Input from "../Input";
import { isPositiveFinite } from "~/utils/common";
import type { CharacterUpdateProps } from "~/types/common.type";
import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";

const CharacterUpdate = ({
  prop,
  param,
  data,
  append,
  format,
  label,
}: CharacterUpdateProps) => {
  const updateCharacter = useBoundStore((state) => state.updateCharacter);
  const [toggleEditable, setToggleEditable] = useState(false);
  const [value, setValue] = useState("");
  console.log("DATA", data);

  const onValueChange = (value: string) => {
    if (format === "number" && isPositiveFinite(value)) {
      setValue(value);
    }
  };

  const updateValue = () => {
    updateCharacter(value || "", prop, param);
    setValue("");
    setToggleEditable(false);
  };

  return (
    <FlexBox>
      <Text className="text-sm" value={label} />
      {toggleEditable ? (
        <Fragment>
          <Input onValueChange={onValueChange} value={value} />
          <Button
            iconConfig={{
              icon: "check",
              label: ACCESIBILITY_TEXT.CHANGE_HEIGHT,
            }}
            styles={{ variant: "ICON", size: "SM" }}
            className={`"text-orange-600"`}
            onButtonClick={updateValue}
            iconWidth={"THIN"}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Text className="text-sm" value={data} append={append} />
          <Button
            iconConfig={{ icon: "pen", label: ACCESIBILITY_TEXT.CHANGE_HEIGHT }}
            styles={{ variant: "ICON", size: "SM" }}
            className={`"text-orange-600"`}
            onButtonClick={() => setToggleEditable(!toggleEditable)}
            iconWidth={"BOLD"}
          />
        </Fragment>
      )}
    </FlexBox>
  );
};

export default CharacterUpdate;
