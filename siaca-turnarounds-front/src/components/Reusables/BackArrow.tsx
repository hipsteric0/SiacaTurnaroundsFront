import styles from "./BackArrow.style.module.css";
import { useMediaQuery } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
interface PageProps {
  executableFunction: () => void;
}

const BackArrow: React.FC<PageProps> = ({ executableFunction }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  return (
    <div
      className={styles.backArrowContainer}
      onClick={() => executableFunction()}
    >
      <ArrowBackRoundedIcon />
    </div>
  );
};

export default BackArrow;
