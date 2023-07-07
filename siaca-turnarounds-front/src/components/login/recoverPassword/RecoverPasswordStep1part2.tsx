import styles from "./RecoverPasswordStep1part2.style.module.css";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Spacer } from "@nextui-org/react";
import router from "next/router";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";

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
      <ForwardToInboxRoundedIcon sx={{ fontSize: 150 }} />
      <strong>
        <center>
          {" "}
          <p className={styles.welcomeBackText}>
            Se ha enviado un link a tu correo electrónico para cambiar tu
            contraseña
          </p>{" "}
        </center>
      </strong>
      <Spacer y={2} />
      <button
        className={styles.ingresarButton}
        onClick={() => router.push("/")}
      >
        REGRESAR AL LOGIN
      </button>
    </div>
  );
};

export default LoginMainPage;
