import styles from "./GreenButton2.style.module.css";
import { useMediaQuery } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
interface PageProps {
  executableFunction: () => void;
  buttonText: string;
  disabled?: boolean;
}

const GreenButton: React.FC<PageProps> = ({
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
          ? styles.greenButtonContainer
          : styles.greenButtonContainerDisabled
      }
      onClick={!disabled ? () => executableFunction() : undefined}
    >
      {buttonText}
      </h4>
    </div>
  );
};

export default GreenButton;
