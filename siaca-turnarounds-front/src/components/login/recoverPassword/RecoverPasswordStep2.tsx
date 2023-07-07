import styles from "./RecoverPasswordStep2.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { ClassNames } from "@emotion/react";
import BackArrow from "@/components/Reusables/BackArrow";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import { Input, Grid, Spacer } from "@nextui-org/react";
import router from "next/router";
import { useState } from "react";

interface PageProps {
  setStep: (value: number) => void;
  email?: string;
  token?: string;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep, email, token }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);

  const validateContinueButton = () => {
    if ((password && confirmPassword) === "") {
      if (allowContinue === true) setAllowContinue(false);
    } else if (password != confirmPassword) {
      if (allowContinue === true) setAllowContinue(false);
    } else {
      if (allowContinue === false) setAllowContinue(true);
    }
    return <></>;
  };
  const sendNewPassword = () => {
    const fetchData = async () => {
      try {
        const url = "/api/recoverPasswordStep2";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            emailValue: email,
            tokenValue: token,
            password: password,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {})
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    fetchData().catch(console.error);
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const continueButton = () => {
    sendNewPassword();
    setStep(2);
  };

  return (
    <div
      className={
        isMobile
          ? styles.mainContainerRecoverPassword2Mobile
          : styles.mainContainerRecoverPassword2
      }
    >
      {validateContinueButton()}
      <div className={styles.icon}>
        <LockResetRoundedIcon fontSize="inherit" />
      </div>

      <p className={styles.recoverPasswordText}>Recuperación de contraseña</p>
      <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
        <Spacer y={0.1} />
        <Input
          type="password"
          bordered
          labelPlaceholder="Nueva contraseña"
          color="success"
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      <div className={isMobile ? styles.singleInputMobile : styles.singleInput}>
        <Spacer y={0.1} />
        <Input
          type="password"
          bordered
          labelPlaceholder="Confirmar contraseña"
          color="success"
          onChange={({ target: { value } }) => setConfirmPassword(value)}
        />
      </div>

      <button
        className={
          allowContinue ? styles.ingresarButton : styles.ingresarButtonDisabled
        }
        onClick={allowContinue ? () => continueButton() : undefined}
      >
        ENVIAR
      </button>
    </div>
  );
};

export default LoginMainPage;
