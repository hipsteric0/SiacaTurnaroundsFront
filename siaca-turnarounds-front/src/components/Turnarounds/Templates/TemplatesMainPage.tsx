import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./TemplatesMainPage.style.module.css";
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
import { Collapse, Text } from "@nextui-org/react";
import { Card, Image } from "@nextui-org/react";
import BackArrow from "@/components/Reusables/BackArrow";

interface PageProps {
  setStep: (value: number) => void;
}

const TurnaroundsMainPage: React.FC<PageProps> = ({ setStep }) => {
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
        const url = "/api/templatesList";
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

  const arrayPrinter = () => {
    let y: any = [];
    console.log("arrayList3", arrayList3.length);
    arrayList3.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          <td>{index.titulo}</td>
          <td>
            <RemoveRedEyeIcon /> <BorderColorOutlinedIcon />{" "}
            <DeleteOutlineOutlinedIcon />
          </td>
        </div>
      );
    });

    return y;
  };

  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.backArrowIcon}>
        <BackArrow executableFunction={() => router.push("/Turnarounds")} />
      </div>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => setStep(1)}
          buttonText="Registrar plantilla"
        />
      </div>
      <div className={styles.airlinesListContainer}>
        <div>
          <div className={styles.tableTitlesContainer}>
            <span>Plantillas</span>
            <span>Opciones</span>
          </div>
          {arrayPrinter()}
        </div>
      </div>
    </main>
  );
};

export default TurnaroundsMainPage;

let arrayAux = [
  {
    id: 0,
    titulo: "Plantilla 1",
  },
  {
    id: 1,
    titulo: "Plantilla 2",
  },
  {
    id: 2,
    titulo: "Plantilla 3",
  },
];
