import styles from "./loginMainPage.style.module.css";
import SiacaLogo from "../../images/logos/siacaLogo.png";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { Input, Grid, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";

interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let validLogin = false;
  const validateLogin = () => {
    registerStep2requestSecond();

    setTimeout(() => {
      if (validLogin) {
        router.push("/Flights");
      } else {
        //mostrar pop up de que login invalido
      }
    }, 5000);
  };

  const registerStep2requestSecond = () => {
    const fetchData = async () => {
      try {
        const url = "/api/login";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            validLogin = result.value;
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    fetchData().catch(console.error);
  };
  return (
    <div
      className={
        isMobile
          ? styles.mainContainerLoginMainPageMobile
          : styles.mainContainerLoginMainPage
      }
    >
      <Image src={SiacaLogo} alt="Logo" />
      <p className={styles.welcomeBackText}>¡Bienvenido de vuelta!</p>
      <div
        className={
          isMobile ? styles.inputsContainerMobile : styles.inputsContainer
        }
      >
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
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
      </div>

      <button
        className={styles.ingresarButton}
        onClick={() => {
          validateLogin();
        }}
      >
        INGRESAR
      </button>
      <div
        className={styles.forgotPasswordText}
        onClick={() => router.push("/RecoverPassword")}
      >
        ¿Olvidaste tu contraseña?
      </div>
      <div className={styles.forgotPasswordText} onClick={() => setStep(4)}>
        Registrarse
      </div>
    </div>
  );
};

export default LoginMainPage;
