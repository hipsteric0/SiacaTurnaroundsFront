import styles from "./loginMainPage.style.module.css";
import SiacaLogo from "../../images/logos/siacaLogo.png";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { Input, Grid, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";

import { motion } from "framer-motion";
import LoadingScreen from "../Reusables/LoadingScreen";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Dialog, TableBody } from "@mui/material";
import GreenButton from "@/components/Reusables/GreenButton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  let token = "";
  let userFullName = "";
  let role = "";
  let cedula = "";

  let validLogin = false;
  const validateLogin = () => {
    setLoading(true);
    registerStep2requestSecond();

    setTimeout(() => {
      if (validLogin) {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userFullName", userFullName);
        localStorage.setItem("userRole", role?.toString());
        localStorage.setItem("cedula", cedula?.toString());
        router.push("/Flights");
      } else {
        setLoading(false);
        setLoginError(true);
      }
    }, 5000);
  };

  const registerStep2requestSecond = () => {
    const fetchData = async () => {
      try {
        const url = "https://testing.siaca.aero/django/usuarios/login/";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            username: email,
            password: password,
          }),
          headers: {
            // Include the regular headers
            "Content-Type": "application/json", // Add body content-type
            // Any additional headers here only related to request body...
          },
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log(result);

            validLogin = result?.value;
            token = result?.token;
            userFullName = result?.first_name + " " + result?.last_name;
            role = result?.rol;
            cedula = result?.cedula;
          })
        );
      } catch (error) {
        console.error("Error getting user", error);

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
      {loginError === true && (
        <Dialog
          className={styles.dialogDelete}
          open={loginError}
          onClose={() => setLoginError(false)}
        >
          <div className={styles.dialogBack}>
            <div className={styles.dialogText}>
              <div className={styles.warningIcon}>
                <ErrorOutlineIcon color="error" fontSize="inherit" />
              </div>
              <p>
                <strong>
                  Su usuario no se encuentra activo o sus datos son erroneos,
                  intentelo de nuevo
                </strong>
              </p>
              <br />
              <center>
                <div className={styles.dialogButtons}>
                  <GreenButton
                    executableFunction={() => {
                      setLoginError(false);
                    }}
                    buttonText="Aceptar"
                  />
                </div>
              </center>
            </div>
          </div>
        </Dialog>
      )}

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
      {loading && <LoadingScreen />}
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
