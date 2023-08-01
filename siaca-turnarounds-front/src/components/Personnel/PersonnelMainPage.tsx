import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./PersonnelMainPage.style.module.css";
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

interface PageProps {
  setStep: (value: number) => void;
}

const PersonnelMainPage: React.FC = () => {
  //if token exists show regular html else show not signed in screen

  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState([]);
  const [arrayFilteredList3, setArrayFilteredList3] = useState([]);
  const [isFilteredResults, setIsFilteredResults] = useState(false);
  const [filterValues2, setfilterValues2] = useState(false);
  let filterValues: any[] = [];

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/personnelList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
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
  const setFilterValues = () => {
    arrayList3.map((value: any) => {
      if (filterValues.indexOf(value["departamento"])) {
        filterValues.push(value["departamento"]);
      }
    });
  };

  const filterArray = (filtername: string) => {
    let filteredUsers = arrayList3.filter((user) => {
      return user["departamento"] === filtername;
    });
    setArrayFilteredList3(filteredUsers);
  };

  const arrayPrinter = () => {
    let y: any = [];
    let arrayList3aux: any = [];
    isFilteredResults
      ? (arrayList3aux = arrayFilteredList3)
      : (arrayList3aux = arrayList3);
    arrayList3aux.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          <td>
            {index.fk_user.first_name} {index.fk_user.last_name}
          </td>
          <td>{index.cargo}</td>
          <td>{index.departamento}</td>
          <td>
            {index.fk_user.username} - {index.telefono}
          </td>
          <td>{index.turno}</td>
        </div>
      );
    });
    setFilterValues();
    return y;
  };

  return (
    <main className={styles.containerPersonnelMainPage}>
      <Spacer />

      <div className={styles.comboboxMainContainer}>
        <Combobox
          onClickFilteringFunction={filterArray}
          setIsFiltered={setIsFilteredResults}
          filterValues={filterValues}
        />
      </div>

      <div className={styles.personnelListContainer}>
        <div>
          <div className={styles.tableTitlesContainer}>
            <span>Nombre</span>
            <span>Cargo</span>
            <span>Departamento</span>
            <span>Contacto</span>
            <span>Turno</span>
          </div>
          {arrayPrinter()}
        </div>
      </div>
      {!allowContinue}
    </main>
  );
};

export default PersonnelMainPage;
