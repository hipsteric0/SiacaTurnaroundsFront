import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./FlightsMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Table, Spacer } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Dropdown } from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { text } from "stream/consumers";
import Combobox from "../Reusables/Combobox";
import SiacaNavbar from "../Reusables/Navbar/SiacaNavbar";

interface PageProps {
  setStep: (value: number) => void;
}

const FlightsMainPage: React.FC = () => {
  useEffect(() => {
    getDateForCalendar();
  }, []);

  useEffect(() => {
    getList();
  }, []);

  const [arrayList3, setArrayList3] = useState([]);
  let date = new Date();

  const [dateCounter, setdateCounter] = useState(0);
  const [dateState, setdateState] = useState("");

  const getList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/airlinesList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log(result);
            console.log("values", Object.values(result));

            setArrayList3(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

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

  const arrayPrinter = () => {
    let y: any = [];
    console.log("arrayList3", arrayList3.length);
    arrayList3.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          <td>
            <img />
          </td>
          <td>{index.nombre}</td>
          <td>{index.correo}</td>
          <td>{index.telefono}</td>
          <td>{index.codigo}</td>
        </div>
      );
    });

    return y;
  };

  return (
    <main className={styles.mainFlightsContainer}>
      <div className={styles.upperSection}>
        <div className={styles.calendarAndFilterContainer}>
          <div className={styles.calendarContainer}>
            <KeyboardArrowLeftRoundedIcon onClick={backDateButton} />
            fecha{dateState}
            <KeyboardArrowRightRoundedIcon onClick={frontDateButton} />
          </div>
          <div className={styles.filterButton}></div>
          <div className={styles.createFlightButton}></div>
        </div>
        <div className={styles.filtreContainer}>
          <Combobox
            onClickFilteringFunction={() => undefined}
            setIsFiltered={() => undefined}
            filterValues={[]}
          />
        </div>

        <GreenButton
          executableFunction={() => undefined}
          buttonText="Crear vuelo "
        />
      </div>
      <div className={styles.flightsListContainer}>{arrayPrinter()}</div>
    </main>
  );
};

export default FlightsMainPage;
