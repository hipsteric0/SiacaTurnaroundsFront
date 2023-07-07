import styles from "./RecoverPasswordStep1.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { ClassNames } from "@emotion/react";
import BackArrow from "@/components/Reusables/BackArrow";
import { Input, Grid, Spacer } from "@nextui-org/react";
import { useState } from "react";
import router from "next/router";

interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [email, setEmail] = useState("");
  let inputEmail = "";
  return (
    <div
      className={
        isMobile
          ? styles.mainContainerRecoverPassword1Mobile
          : styles.mainContainerRecoverPassword1
      }
    >
      <BackArrow executableFunction={() => router.push("/")} />
      <div className={styles.icon}>
        <PasswordIcon fontSize="inherit" />
      </div>
      <p className={styles.recoverPasswordText}>Recuperación de contraseña</p>
      <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
        <Spacer y={0.1} />
        <Input
          type="email"
          bordered
          labelPlaceholder="Correo Electrónico"
          color="success"
          width={isMobile ? "85%" : "335px"}
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </div>
      <p
        className={
          isMobile
            ? styles.willRecieveCodeTextMobile
            : styles.willRecieveCodeText
        }
      >
        Le enviaremos un correo electrónico con un código para restablecer su
        contraseña.
      </p>
      <button className={styles.ingresarButton} onClick={() => setStep(2)}>
        ENVIAR
      </button>
    </div>
  );
};

export default LoginMainPage;
