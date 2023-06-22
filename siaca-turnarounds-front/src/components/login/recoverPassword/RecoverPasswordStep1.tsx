import styles from "./recoverPasswordStep1.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  return <div className={styles.clase1}>recoverpassword step 1</div>;
};

export default LoginMainPage;
