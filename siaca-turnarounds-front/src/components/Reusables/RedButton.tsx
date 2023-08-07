import styles from "./RedButton.style.module.css";
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
    <button
      className={
        !disabled
          ? styles.redButtonContainer
          : styles.redButtonContainerDisabled
      }
      onClick={!disabled ? () => executableFunction() : undefined}
    >
      <p>{buttonText}</p>
    </button>
  );
};

export default RedButton;
