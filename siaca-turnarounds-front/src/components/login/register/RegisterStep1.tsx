import styles from "./RegisterStep1.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  return <div>register step 1</div>;
};

export default LoginMainPage;
