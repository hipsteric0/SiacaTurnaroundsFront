import styles from "./StandardInput.style.module.css";
import { useMediaQuery } from "@mui/material";
import { Input } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
interface PageProps {
  setValue: (inputValue: string) => void;
  inputText: string;
}

const StandardInput: React.FC<PageProps> = ({ setValue, inputText }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  return (
    <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
      <Input
        bordered
        labelPlaceholder={inputText}
        color="success"
        width={isMobile ? "85%" : "225px"}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </div>
  );
};

export default StandardInput;
