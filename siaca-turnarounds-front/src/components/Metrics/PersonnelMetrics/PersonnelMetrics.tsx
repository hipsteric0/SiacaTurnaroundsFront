import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./PersonnelMetrics.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Table , Spacer} from "@nextui-org/react";
import { TableBody } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Dropdown } from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { Collapse, Text } from "@nextui-org/react";
import {Card, Image} from "@nextui-org/react";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartContainer, BarPlot } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';
import BackArrow from "@/components/Reusables/BackArrow";

interface PageProps {
  setStep: (value: number) => void;
}

const PersonnelMetrics: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState(['']);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [parametro, setParametro] = useState(['']);

  const [dayStart, setDayStart] = useState("");
  const [dayFinal, setDayFinal] = useState("");

  let array1: any[] = []
  let array2: any[] = []
  let array3: any[] = []

  useEffect(() => {

  }, []);

  const getList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricPersonnelDetails";
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
            setParametro(Object.values(result));

          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const arrayPrinterStart = () => {

    if (!Array.isArray(arrayList3) || arrayList3.length === 0) {
      return <p>No hay existe historial de personal entre estas fechas</p>;
    }
    let groupedData = {};
  
    arrayList3.map((index: any) => {
      if (!groupedData[index?.fk_usuario__fk_departamento__nombre]) {
        groupedData[index?.fk_usuario__fk_departamento__nombre] = [];
      }
      groupedData[index?.fk_usuario__fk_departamento__nombre].push(index);
    });
  
    let y: any = [];
    Object.keys(groupedData).map((key: any) => {
      const content = groupedData[key].map((index: any) => {
        return (
          
          <div key={index?.fk_usuario__id} className={styles.tableInfoRow}>
            <td>{index?.full_name}</td>
            <td><strong>Crago: </strong>{index?.fk_usuario__fk_cargo__nombre}</td>
            <td><strong>Número de participaciones: </strong>{index?.contador}</td>
          </div>
        );
      });
      y.push(
        <Collapse title={key} key={key}>
          {content}
        </Collapse>
      );
    });
  
    return y;
  };


  const handleButtonClickSearch = () => {
    fetch(`http://127.0.0.1:8000/metricas/personal/${dayStart}/${dayFinal}/?token=`+localStorage.getItem("userToken"))
      .then((response) => response.json())
      .then((data) => setArrayList3(data))
      .catch((error) => console.error('Error fetching ', error));
  };
  

  const Search = () => {
    handleButtonClickSearch();
  }

  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.backArrowIcon}>
        <BackArrow
          executableFunction={() => {
            router.push("/Metrics/")
          }}
        />
      </div>

      <div className={styles.parent}>
<div className={styles.search}>
<div className={styles.div1}>
      <label >Fecha inicio:</label>
      <input
        type="date"
        id="code"
        value={dayStart}
        onChange={(e) => setDayStart(e.target.value)}
      />

      </div>
      <div className={styles.div2}>
      <label >Fecha final:</label>
      <input
        type="date"
        id="date"
        value={dayFinal}
        onChange={(e) => setDayFinal(e.target.value)}
      />
      </div>

      <div className={styles.div3}>
      <button onClick={Search}>Buscar maquinarias</button>
      </div>
      </div>
              </div >

      <div className={styles.airlinesListContainer}>

      {arrayPrinterStart()}
        </div>
    </main>
  );
};

export default PersonnelMetrics;




