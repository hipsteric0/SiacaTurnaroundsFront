import styles from "./RecoverPasswordStep2.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  return <div>step 2 recuperar contrasena</div>;
};

export default LoginMainPage;
