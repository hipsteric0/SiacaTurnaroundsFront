import styles from "./RecoverPasswordStep2.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
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
          <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
            Correo Electrónico
          </p>
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
          <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
            Contraseña
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
      </div>

      <button className={styles.ingresarButton}>INGRESAR</button>
      <div className={styles.forgotPasswordText} onClick={() => setStep(1)}>
        ¿Olvidaste tu contraseña?
      </div>
    </div>
  );
};

export default LoginMainPage;
