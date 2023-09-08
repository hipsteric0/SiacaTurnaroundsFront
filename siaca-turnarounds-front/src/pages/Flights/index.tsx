import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import styles from "./index.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
import FlightsMainPage from "@/components/flights/FlightsMainPage";
import CreateFlightMainPage from "@/components/flights/CreateFlight/CreateFlightMainPage";
import EditFlight from "@/components/flights/EditFlight/EditFlight";
export default function Flights() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);
  const [flightID, setFlightID] = useState(-1)
  
  return (
    <>
      <SiacaNavbar activeFlightsValue={true} />
      {
        step === 0 && (
          <>
            <FlightsMainPage setStep={setStep} setflightID= {setFlightID} />
          </>
        ) /*el step 0 es la pagina principal de aerolineas*/
      }
      {
        step === 1 && (
          <>
            <CreateFlightMainPage setStep={setStep} />
          </>
        ) /*el step 1 es la pagina de registrar aerolinea*/
      }
      {
        step === 2 && (
          <>
            <EditFlight setStep={setStep} flightID = {flightID}/>
          </>
        ) /*el step 1 es la pagina de registrar aerolinea*/
      }
    </>
  );
}
