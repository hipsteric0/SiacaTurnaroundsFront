import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./MachineMetrics.style.module.css";
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

interface PageProps {
  setStep: (value: number) => void;
}

const MachineMetrics: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState(['']);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [parametro, setParametro] = useState(['']);

  let array1: any[] = []
  let array2: any[] = []
  let array3: any[] = []

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricMachineUse";
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


  const arrayPrinter = () => {
    let y: any = [];
    console.log("arrayList3", arrayList3.length);

    arrayList3.map((index: any) => {
      y[index?.fk_maquinaria_id] = (
        <div key={index?.fk_maquinaria_id} className={styles.tableInfoRow}>
          <td>{index?.fk_maquinaria__fk_categoria__nombre}</td>
          <td>{index?.fk_maquinaria__identificador}</td>
          <td>{index?.contador}</td>
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
      <div className={styles.airlinesListContainer}>
      <p>MAQUINARIAS</p>
      {arrayPrinter2()}
      <BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: array1,
      scaleType: 'band',
      label: 'Maquinarias'
    },
  ]}
  series={[
    {
      data: array2,
      label: 'Número de usos'
    },
  ]}
  width={500}
  height={400}
/>

        <div>
          <div className={styles.tableTitlesContainer}>
            <span>Categoria</span>
            <span>Identificador</span>
            <span>Numero de usos</span>
          </div>
          {arrayPrinter()}
        </div>
        </div>
    </main>
  );
};

export default MachineMetrics;




