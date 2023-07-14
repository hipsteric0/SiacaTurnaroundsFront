import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./index.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
import router from "next/router";
import { Table } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import AirlinesMainPage from "@/components/airlines/AirlinesMainPage";
import RegisterAirline from "@/components/airlines/RegisterAirline/RegisterAirline";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import TurnaroundsMainPage from "@/components/Turnarounds/TurnaroundsMainPage";
import TemplatesMainPage from "@/components/Turnarounds/Templates/TemplatesMainPage";
import RegisterTemplate from "@/components/Turnarounds/Templates/RegisterTemplate/RegisterTemplate";
export default function Templates() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);
  return (
    <main className={styles.mainContainerTurnaroundsPage}>
      <SiacaNavbar activeTurnaroundsValue={true} />
      {step === 0 && (
        <>
          <TemplatesMainPage setStep={setStep} />
        </>
      )}
      {step === 1 && (
        <>
          <RegisterTemplate setStep={setStep} />
        </>
      )}
    </main>
  );
}
