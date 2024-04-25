import styles from "./RegisterStep3.style.module.css";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Spacer } from "@nextui-org/react";
import LoadingScreen from "@/components/Reusables/LoadingScreen";



interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC <PageProps> = ({setStep}) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [loading, setLoading] = useState(false);

  const Continue = () => {
    setLoading(true);
    setStep(0);
  };

  return (

    <div
    className={
      isMobile
        ? styles.mainContainerLoginMainPageMobile
        : styles.mainContainerLoginMainPage
    }
  >
    <CheckCircleOutlineIcon sx={{ fontSize: 150 }}></CheckCircleOutlineIcon>
    <strong>
     <center> <p className={styles.welcomeBackText}>Tu registro se ha realizado correctamente, espere a que el administrador active su usuario</p> </center>
    </strong>
    <Spacer y={2} />
    <button className={styles.ingresarButton} onClick={() => Continue()}>
        REGRESAR AL LOGIN
      </button>
      {loading && <LoadingScreen />}
 </div>

  );
};

export default LoginMainPage;
