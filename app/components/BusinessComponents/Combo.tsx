import type { ComboProps } from "~/types/common.type";
import FlexBox from "../FlexBox";
import Text from "../Text";

const Combo = ({ value, append, prepend, label }: ComboProps) => {
  return value ? (
    <FlexBox orientation="COLUMN" className="justify-start gap-0 capitalize">
      <Text className="text-xs" value={label} />
      <Text
        className="text-sm"
        value={value}
        append={append}
        prepend={prepend}
      />
    </FlexBox>
  ) : null;
};

export default Combo;
