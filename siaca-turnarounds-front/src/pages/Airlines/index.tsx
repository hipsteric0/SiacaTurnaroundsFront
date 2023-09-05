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
import EditAirline from "@/components/airlines/EditAirline/EditAirline";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
export default function Airlines() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);
  const [flightID, setFlightID] = useState(-1)

  return (
    <main className={styles.mainContainerAirlinesPage}>
      <SiacaNavbar activeAirlinesValue={true} />
      {
        step === 0 && (
          <>
            <AirlinesMainPage setStep={setStep} setflightID= {setFlightID} />
          </>
        ) /*el step 0 es la pagina principal de aerolineas*/
      }
      {
        step === 1 && (
          <>
            <RegisterAirline setStep={setStep} />
          </>
        ) /*el step 1 es la pagina de registrar aerolinea*/
      }
      {
        step === 2 && (
          <>
            <EditAirline setStep={setStep} flightID={flightID} />
          </>
        ) /*el step 2 es la pagina de editar aerolinea*/
      }
    </main>
  );
}
