import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import styles from "./index.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
import FlightsMainPage from "@/components/flights/FlightsMainPage";
import CreateFlightMainPage from "@/components/flights/CreateFlight/CreateFlightMainPage";
export default function Flights() {
  //if token exists show regular html else show not signed in screen

  return (
    <>
      <SiacaNavbar activeFlightsValue={true} />
      <CreateFlightMainPage />
    </>
  );
}
