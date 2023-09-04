import styles from "./RedButton2.style.module.css";
import { useMediaQuery } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
interface PageProps {
  executableFunction: () => void;
  buttonText: string;
  disabled?: boolean;
}

const RedButton: React.FC<PageProps> = ({
  executableFunction,
  buttonText,
  disabled = false,
}) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  return (
    <div>
    <h4
      className={
        !disabled
          ? styles.redButtonContainer
          : styles.redButtonContainerDisabled
      }
      onClick={!disabled ? () => executableFunction() : undefined}
    >
      {buttonText}
    </h4>
    </div>
  );
};

export default RedButton;
