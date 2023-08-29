import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./AirlinesMainPage.style.module.css";
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

interface PageProps {
  setStep: (value: number) => void;
}

const AirlinesMainPage: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState([]);

  useEffect(() => {
    getList();
  }, []);

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

  const deleteAirline = async (airlineID: number) => {
    const fetchData = async () => {
      try {
        const url = "/api/deleteAirline";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            airlineId: airlineID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            router.reload();
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const arrayPrinter = () => {
    let y: any = [];
    console.log("arrayList3", arrayList3.length);
    arrayList3.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          <td>Logo</td>
          <td>{index.nombre}</td>
          <td>{index.correo}</td>
          <td>{index.telefono}</td>
          <td>{index.codigo}</td>
          <td><RemoveRedEyeIcon  onClick={() => setStep(2)} /> <BorderColorOutlinedIcon/> <DeleteOutlineOutlinedIcon  onClick={() => deleteAirline(index.id)}/></td>
        </div>
      );
    });

    return y;
  };
  
  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => setStep(1)}
          buttonText="Registrar aerolinea"
        />
      </div>
      <div className={styles.airlinesListContainer}>
        <div>
          <div className={styles.tableTitlesContainer}>
            <span>Logo</span>
            <span>Nombre</span>
            <span>Correo</span>
            <span>Teléfono</span>
            <span>Código</span>
            <span>Opciones</span>
          </div>
          {arrayPrinter()}
        </div>
        </div>
    </main>
  );
};

export default AirlinesMainPage;


