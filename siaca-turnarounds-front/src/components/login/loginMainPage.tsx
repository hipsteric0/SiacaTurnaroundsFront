import styles from "./loginMainPage.style.module.css";
import SiacaLogo from "../../images/logos/siacaLogo.png";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
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
          />
        </div>
      </div>

      <button className={styles.ingresarButton}>INGRESAR</button>
      <div className={styles.forgotPasswordText} onClick={() => setStep(1)}>
        ¿Olvidaste tu contraseña?
      </div>
      <div className={styles.forgotPasswordText} onClick={() => setStep(4)}>
        Registrarse
      </div>
    </div>
  );
};

export default LoginMainPage;
