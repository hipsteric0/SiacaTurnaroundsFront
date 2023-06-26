import styles from "./RegisterStep1.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import MailLockIcon from "@mui/icons-material/MailLock";
import { Input, Grid, Spacer } from "@nextui-org/react";
import BackArrow from "@/components/Reusables/BackArrow";

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
          <Grid>
            <Input
              bordered
              labelPlaceholder="Correo Electrónico"
              color="success"
              width="375px"
            />
          </Grid>
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Spacer y={0.1} />
          <Input.Password
            bordered
            labelPlaceholder="Contraseña"
            color="success"
            width="375px"
          />
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Spacer y={0.1} />
          <Input.Password
            bordered
            labelPlaceholder="Confirmar contraseña"
            color="success"
            width="375px"
          />
        </div>
      </div>

      <button className={styles.ingresarButton} onClick={() => setStep(5)}>
        <strong>CONTINUAR</strong>
      </button>
    </div>
  );
};

export default LoginMainPage;
