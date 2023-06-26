import styles from "./RecoverPasswordStep2.style.module.css";
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
      <BackArrow executableFunction={() => setStep(1)} />
      <div className={styles.icon}>
        <LockResetRoundedIcon fontSize="inherit" />
      </div>

      <p className={styles.recoverPasswordText}>Recuperación de contraseña</p>
      <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
        <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
          Código recibido
        </p>
        <input
          className={
            isMobile
              ? styles.singleInputContainerMobile
              : styles.singleInputContainer
          }
          type="password"
        />
      </div>
      <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
        <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
          Nueva contraseña
        </p>
        <input
          className={
            isMobile
              ? styles.singleInputContainerMobile
              : styles.singleInputContainer
          }
          type="password"
        />
      </div>
      <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
        <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
          Confirme nueva contraseña
        </p>
        <input
          className={
            isMobile
              ? styles.singleInputContainerMobile
              : styles.singleInputContainer
          }
          type="password"
        />
      </div>

      <button className={styles.ingresarButton} onClick={() => setStep(3)}>
        ENVIAR
      </button>
    </div>
  );
};

export default LoginMainPage;
