import styles from "./RegisterStep3.style.module.css";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Spacer } from "@nextui-org/react";



interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC <PageProps> = ({setStep}) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
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
     <center> <p className={styles.welcomeBackText}>Tu registro se ha realizado correctamente ya puedes hacer login </p> </center>
    </strong>
    <Spacer y={2} />
    <button className={styles.ingresarButton} onClick={() => setStep(0)}>
        REGRESAR AL LOGIN
      </button>
 </div>

  );
};

export default LoginMainPage;
