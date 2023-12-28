import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./index.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
import router from "next/router";
import { Table } from "@nextui-org/react";
import { TableBody, useMediaQuery } from "@mui/material";
import AirlinesMainPage from "@/components/airlines/AirlinesMainPage";
import RegisterAirline from "@/components/airlines/RegisterAirline/RegisterAirline";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import TurnaroundsMainPage from "@/components/Turnarounds/TurnaroundsMainPage";
import SiacaNavbarMobile from "@/components/Reusables/MobileNavbar/SiacaNavbarMobile";
import TurnaroundsMainPageMobile from "@/components/Turnarounds/TurnaroundsMainPageMobile";
export default function Turnarounds() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);
  const isMobile = useMediaQuery("(max-width: 1270px)");
  let turnaroundID = -1;

  return (
    <>
      {!isMobile ? ( //si es desktop mostrara lo siguiente:
        <main className={styles.mainContainerTurnaroundsPage}>
          <SiacaNavbar activeTurnaroundsValue={true} />
          <TurnaroundsMainPage setStep={setStep} />
        </main>
      ) : (
        //si es mobile mostrara lo siguiente:
        <>
          <SiacaNavbarMobile activeTurnaroundsValue={true} />
          <TurnaroundsMainPageMobile setStep={setStep} />
        </>
      )}
    </>
  );
}
