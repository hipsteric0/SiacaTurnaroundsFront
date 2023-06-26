import styles from "./RecoverPasswordStep3.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { ClassNames } from "@emotion/react";
import BackArrow from "@/components/Reusables/BackArrow";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  return (
    <div
      className={
        isMobile
          ? styles.mainContainerRecoverPassword1Mobile
          : styles.mainContainerRecoverPassword1
      }
    >
      <div className={styles.icon}>
        <LockResetRoundedIcon fontSize="inherit" />
      </div>

      <p
        className={
          isMobile
            ? styles.recoverPasswordTextMobile
            : styles.recoverPasswordText
        }
      >
        ¡Tu contraseña ha sido cambiada con éxito!
      </p>

      <button className={styles.ingresarButton} onClick={() => setStep(0)}>
        REGRESAR
      </button>
    </div>
  );
};

export default LoginMainPage;
