import styles from "./RecoverPasswordStep2.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { ClassNames } from "@emotion/react";
import BackArrow from "@/components/Reusables/BackArrow";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import { Input, Grid, Spacer } from "@nextui-org/react";

interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  return (
    <div
      className={
        isMobile
          ? styles.mainContainerRecoverPassword2Mobile
          : styles.mainContainerRecoverPassword2
      }
    >
      <BackArrow executableFunction={() => setStep(1)} />
      <div className={styles.icon}>
        <LockResetRoundedIcon fontSize="inherit" />
      </div>

      <p className={styles.recoverPasswordText}>Recuperación de contraseña</p>
      <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
      <Spacer y={0.1} />
            <Input
              type="text"
              bordered
              labelPlaceholder="Código recibido"
              color="success"
            />
      </div>
      <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
      <Spacer y={0.1} />
            <Input
              type="password"
              bordered
              labelPlaceholder="Nueva contraseña"
              color="success"
            />
      </div>
      <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
      <Spacer y={0.1} />
            <Input
              type="password"
              bordered
              labelPlaceholder="Confirmar contraseña"
              color="success"
            />
      </div>

      <button className={styles.ingresarButton} onClick={() => setStep(3)}>
        ENVIAR
      </button>
    </div>
  );
};

export default LoginMainPage;
