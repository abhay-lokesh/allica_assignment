import { useNavigate } from "react-router";
import Button from "./Button";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back one entry in the history stack
  };
  return (
    <Button
      styles={{ variant: "ICON", size: "SM" }}
      icon="circle-chevron-left"
      onButtonClick={handleGoBack}
    />
  );
};

export default BackButton;
