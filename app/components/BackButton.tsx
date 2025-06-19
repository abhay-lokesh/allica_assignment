import { useNavigate } from "react-router";
import Button from "./Button";
import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back one entry in the history stack
  };
  return (
    <Button
      styles={{ variant: "ICON", size: "XS" }}
      iconConfig={{
        icon: "circle-chevron-left",
        label: ACCESIBILITY_TEXT.BACK_NAVIGATE,
      }}
      onButtonClick={handleGoBack}
    />
  );
};

export default BackButton;
