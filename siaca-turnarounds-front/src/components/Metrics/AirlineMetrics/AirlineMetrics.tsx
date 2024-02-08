import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./AirlineMetrics.style.module.css";
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
import { PieChart, pieArcLabelClasses  } from '@mui/x-charts/PieChart';
import BackArrow from "@/components/Reusables/BackArrow";


interface PageProps {
  setStep: (value: number) => void;
}

const AirlineMetrics: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState(['']);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [parametro, setParametro] = useState(['']);
  const [arrayAirline, setArrayAirline] = useState(['']);

  const [data, setData] = useState(['']);

  let array1: any[] = []
  let array2: any[] = []
  let array3: any[] = []

  let arrayAirlineName: any[] = []
  let arrayAirlineCount: any[] = []

  useEffect(() => {
    getAirline();
  }, []);


  const getAirline = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricAirline";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log(result);

            setArrayAirline(Object.values(result));
            const array = Object.values(result).map((index: any) => ({
              label: index.fk_vuelo__fk_aerolinea__nombre,
              value: index.porcentaje,
            }));
            setData(Object(array));

          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const arrayPrinterAirline = () => {
    let y: any = [];
    arrayAirline.map((index: any) => {
      arrayAirlineName.push(index?.fk_aerolinea__nombre)
      arrayAirlineCount.push(index?.contador)
      
    });

    return y;
  };

  const palette = ['#0d47a1',
  '#00b0ff',
  '#0097a7',
  '#00695c',
  '#388e3c',
  '#b2ff59'];



  const arrayPrinter = () => {
    let y: any = [];
    console.log("arrayList3", arrayList3.length);

    arrayAirline.map((index: any) => {
      y[index?.fk_vuelo__fk_aerolinea__id] = (
        <div key={index?.fk_vuelo__fk_aerolinea__id} className={styles.tableInfoRow}>
         <b><td>{index?.fk_vuelo__fk_aerolinea__nombre}</td></b> 
          <td>{index?.contador}</td>
          <td>{index?.percent}</td>
        </div>
        
      );
    });
    
    return y;
  };

  const arrayPrinter2 = () => {
    let y: any = [];
    parametro.map((index: any) => {
      array1.push(index?.fk_maquinaria__identificador)
      array2.push(index?.contador)
      array3.push(index?.fk_maquinaria__fk_categoria__nombre)
      
    });
    return y;
  };
  
  

  return (
    <main className={styles.containerAirlinesMainPage}>
      
      <div className={styles.backArrowIcon}>
        <BackArrow
          executableFunction={() => {
            router.push("/Metrics/")
          }}
        />
      </div>
      
      <div className={styles.airlinesListContainer}>
      {arrayPrinter2()}
      {arrayPrinterAirline()}

      <div className={styles.div1}>
          <div className={styles.tableTitlesContainer}>
            <span>Aerolinea</span>
            <span>No. de turnarounds</span>
            <span>Porcentaje</span>
          </div>
          {arrayPrinter()}
        </div>

<div className={styles.div2}>
<br/>
<div className={styles.charts}>
<PieChart 
colors={palette}
  series={[
    {
      data: data,
      highlightScope: { faded: 'global', highlighted: 'item' },
    },
  ]}
  width={800}
  height={550}
  
/>
</div>
</div>

        </div>
    </main>
  );
};

export default AirlineMetrics;




