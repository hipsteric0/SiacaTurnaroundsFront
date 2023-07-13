import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import styles from "./index.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
export default function Flights() {
  //if token exists show regular html else show not signed in screen
  useEffect(() => {
    getDateForCalendar();
  }, []);
  let date = new Date();
  const [dateCounter, setdateCounter] = useState(0);
  const [dateState, setdateState] = useState("");
  const getDateForCalendar = () => {
    let x =
      date.getDate().toString() +
      " - " +
      (date.getMonth() + 1).toString() +
      " - " +
      date.getFullYear().toString();
    console.log("x", x);
    console.log("userToken", localStorage.getItem("userToken"));
    setdateState(x);
    return <></>;
  };

  const backDateButton = async () => {
    await setdateCounter(dateCounter - 1);
    date = new Date(new Date().setDate(new Date().getDate() + dateCounter - 1));
    getDateForCalendar();
  };

  const frontDateButton = async () => {
    await setdateCounter(dateCounter + 1);
    date = new Date(new Date().setDate(new Date().getDate() + dateCounter + 1));
    getDateForCalendar();
  };
  return (
    <main className={styles.mainFlightsContainer}>
      <SiacaNavbar activeFlightsValue={true} />
      <div className={styles.calendarAndFilterContainer}>
        <div className={styles.calendarContainer}>
          <KeyboardArrowLeftRoundedIcon onClick={backDateButton} />
          fecha{dateState}
          <KeyboardArrowRightRoundedIcon onClick={frontDateButton} />
        </div>
        <div className={styles.filterButton}></div>
        <div className={styles.createFlightButton}></div>
      </div>
      <div className={styles.flightsListContainer}></div>
      asd
    </main>
  );
}
