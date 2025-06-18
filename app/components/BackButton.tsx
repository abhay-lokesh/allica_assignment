import { useNavigate } from "react-router";
import Button from "./Button";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back one entry in the history stack
  };
  return <Button icon="circle-chevron-left" onButtonClick={handleGoBack} />;
};

export default BackButton;
