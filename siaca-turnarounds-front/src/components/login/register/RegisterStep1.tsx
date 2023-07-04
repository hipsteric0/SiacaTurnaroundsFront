import styles from "./RegisterStep1.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import MailLockIcon from "@mui/icons-material/MailLock";
import { Input, Grid, Spacer } from "@nextui-org/react";
import BackArrow from "@/components/Reusables/BackArrow";
import { useEffect, useState } from "react";
import handler from "@/pages/api/login";

interface PageProps {
  setStep: (value: number) => void;
  setEmailValue: (value: string) => void;
  setPasswordValue: (value: string) => void;
}

const LoginMainPage: React.FC<PageProps> = ({
  setStep,
  setEmailValue,
  setPasswordValue,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allowContinue, setAllowContinue] = useState(false);
  const [response, setResponse] = useState(false);
  const [continueIsClicked, setContinueIsClicked] = useState(false);

  let responseValue = false;

  const registerStep1request = () => {
    const fetchData = async () => {
      try {
        const url = "/api/register";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        };
        const response = await fetch(url, requestOptions).then((value) => {
          if (value?.status === 400) {
            responseValue = false;
          } else {
            responseValue = true;
          }
          return true;
        });
        if (!response) {
          responseValue = false;

          throw new Error("Error in response registering user");
        }
      } catch (error) {
        responseValue = false;
        //mostrar mensaje de no se pudo validasr usuario, ya existe o su conexion es limitada
      }
    };
    fetchData().catch(console.error);
  };

  const validateContinueButton = () => {
    if ((email && password && confirmPassword) === "") {
      if (allowContinue === true) setAllowContinue(false);
    } else if (!email.includes("@")) {
      if (allowContinue === true) setAllowContinue(false);
    } else if (password != confirmPassword) {
      if (allowContinue === true) setAllowContinue(false);
    } else {
      if (allowContinue === false) setAllowContinue(true);
    }
    return <></>;
  };
  const continueButton = () => {
    setEmailValue(email);
    setPasswordValue(password);
    registerStep1request();
    setTimeout(() => {
      if (responseValue) {
        setStep(5);
      } else {
        if (responseValue) {
          setTimeout(() => {
            if (responseValue) {
              setStep(5);
            }
          }, 5000);
        }
      }
    }, 5000);
  };

  const isMobile = useMediaQuery("(max-width: 1270px)");
  return (
    <div
      className={
        isMobile
          ? styles.mainContainerLoginMainPageMobile
          : styles.mainContainerLoginMainPage
      }
    >
      {validateContinueButton()}
      <BackArrow executableFunction={() => setStep(0)} />
      <MailLockIcon sx={{ fontSize: 150 }}></MailLockIcon>
      <strong>
        <p className={styles.welcomeBackText}>Registro de usuario</p>
      </strong>
      <div
        className={
          isMobile ? styles.inputsContainerMobile : styles.inputsContainer
        }
      >
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Spacer y={1} />
          <Input
            bordered
            labelPlaceholder="Correo Electrónico"
            color="success"
            width={isMobile ? "85%" : "335px"}
            onChange={({ target: { value } }) => setEmail(value)}
            type="email"
          />
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Spacer y={0.1} />
          <Input
            type="password"
            bordered
            labelPlaceholder="Contraseña"
            color="success"
            width={isMobile ? "85%" : "335px"}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Spacer y={0.1} />
          <Input
            type="password"
            bordered
            labelPlaceholder="Confirmar contraseña"
            color="success"
            width={isMobile ? "85%" : "335px"}
            onChange={({ target: { value } }) => setConfirmPassword(value)}
          />
        </div>
      </div>

      <button
        className={
          allowContinue ? styles.ingresarButton : styles.ingresarButtonDisabled
        }
        onClick={allowContinue ? () => continueButton() : undefined}
      >
        <strong>CONTINUAR</strong>
      </button>
    </div>
  );
};

export default LoginMainPage;
