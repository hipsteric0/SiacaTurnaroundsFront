import styles from "./RecoverPasswordStep3.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { ClassNames } from "@emotion/react";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import router from "next/router";
interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  return (
    <div
      className={
        isMobile
          ? styles.mainContainerRecoverPassword3Mobile
          : styles.mainContainerRecoverPassword3
      }
    >
      <div className={styles.icon}>
        <CheckCircleOutlineRoundedIcon fontSize="inherit" />
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

      <button
        className={styles.ingresarButton}
        onClick={() => router.push("/")}
      >
        REGRESAR
      </button>
    </div>
  );
};

export default LoginMainPage;
