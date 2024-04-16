import styles from "./UnauthorizedPage.style.module.css";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import StopAirplane from "../../images/UnauthorizedPage/StopAirplane.jpg";
import Image from "next/image";

interface PageProps {}

const UnauthorizedPage: React.FC<PageProps> = ({}) => {
  //if token exists show regular html else show not signed in screen
  useEffect(() => {
    let role = localStorage.getItem("userRole");
    if (role != null) {
      setRoleID(parseInt(role));
      console.log("se coloco el rol", role);
    }
  }, []);

  const [roleID, setRoleID] = useState(-1);
  const isMobile = useMediaQuery("(max-width: 1270px)");

  return (
    <main className={styles.containerUnauthorizedMainPage}>
      <div className={styles.stopAirplaneImageContainer}>
        <Image
          className={styles.stopAirplaneImage}
          src={StopAirplane}
          alt="StopAirplane"
        />
      </div>
      <p className={styles.unauthorizedText}>
        No tienes autorización para entrar a la pagina que intentas ver.
        ¡Contacta tu administrador!
      </p>
    </main>
  );
};

export default UnauthorizedPage;
