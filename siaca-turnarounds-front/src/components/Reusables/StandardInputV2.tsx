import styles from "./StandardInput.style.module.css";
import { useMediaQuery } from "@mui/material";
import { Input } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
interface PageProps {
  setValue: (inputValue: string) => void;
  labelText: string; //permanent value of animation
  placeholderText?: string; //disappearing value of placeholder text
  inputWidth?: string;
  inputHeight?: string;
  inputDisabled?: boolean;
}

const StandardInput: React.FC<PageProps> = ({
  setValue,
  labelText,
  placeholderText,
  inputWidth,
  inputHeight,
  inputDisabled,
}) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  return (
    <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
      <Input
        aria-label="Standard input"
        disabled={inputDisabled}
        bordered
        label={labelText}
        placeholder={placeholderText}
        color={inputDisabled ? "error" : "success"}
        width={
          inputWidth == undefined ? (isMobile ? "85%" : "225px") : inputWidth
        }
        height={"10px"}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </div>
  );
};

export default StandardInput;
