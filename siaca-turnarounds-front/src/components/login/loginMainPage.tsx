import styles from "./loginMainPage.style.module.css";
import SiacaLogo from "../../images/logos/siacaLogo.png";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

function LoginMainPage({}) {
  const isMobile = useMediaQuery("(max-width: 1270px)");
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
          <p>Correo Electrónico</p>
          <input
            className={
              isMobile
                ? styles.singleInputContainerMobile
                : styles.singleInputContainer
            }
            type="email"
          />
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <p>Contraseña</p>
          <input
            className={
              isMobile
                ? styles.singleInputContainerMobile
                : styles.singleInputContainer
            }
            type="password"
          />
        </div>
      </div>

      <button className={styles.ingresarButton}>INGRESAR</button>
      <div className={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</div>
    </div>
  );
}

export default LoginMainPage;
