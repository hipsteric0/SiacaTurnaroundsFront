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
  const [data, setData] = useState(['']);


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
            console.log("RESULT",result);
            console.log("values", Object.values(result));

            const array = Object.values(result).map((index: any) => ({
              label: index.fk_maquinaria__identificador,
              value: index.contador,
            }));


            setArrayList3(Object.values(result));
            setParametro(Object.values(result));
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

  const arrayPrinterMachine = (category: string) => {
    let y: any = [];
    let arrayMachine: any[] = []
    let arrayUses: any[] = []
    const arrayAux = parametro.filter(parametro => parametro["fk_maquinaria__fk_categoria__nombre"] === category);
    arrayAux.map((index: any) => {
      arrayMachine.push(index?.fk_maquinaria__identificador)
      arrayUses.push(index?.contador)
      y =(
        <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: arrayMachine,
            scaleType: 'band',
            label: 'Maquinarias'
          },
        ]}
        series={[
          {
            data: arrayUses,
            label: 'Número de usos',
            color: '#00A75D'
          },
        ]}
        width={500}
        height={400}
      />
      
      );
      
    });
    return y;
  };

  
function StraightAnglePieChart() {
  console.log("PARAMETRO 2", data)
    return (
<PieChart
  series={[
    {
      data: data
    },
  ]}
  width={400}
  height={200}
/>
    );
  }
  

  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.airlinesListContainer}>

      <Collapse.Group id="group">
        <Collapse title="Aguas Servidas" >
        <div className={styles.machinesgrid}>
        {arrayPrinterMachine("Aguas servidas")}
        {StraightAnglePieChart()}
        </div>
        </Collapse>
            
            <Collapse title="Tractor de arrastre" >
            {arrayPrinterMachine("Tractor de arrastre")}
            </Collapse>

            <Collapse title="Escalera" >
            {arrayPrinterMachine("Escalera")}
            </Collapse>

            <Collapse title="Cinta transportadora" >
            {arrayPrinterMachine("Cinta transportadora")}
            </Collapse>

            <Collapse title="Loader" >
            {arrayPrinterMachine("Loader")}
            </Collapse>

            <Collapse title="Tractor de empuje" >
            {arrayPrinterMachine("Tractor de empuje")}
            </Collapse>

            <Collapse title="Aire acondicionado" >
            {arrayPrinterMachine("Aire acondicionado")}
            </Collapse>

            <Collapse title="Planta neumática" >
            {arrayPrinterMachine("Planta neumática")}
            </Collapse>

            <Collapse title="GPU Planta eléctrica" >
            {arrayPrinterMachine("GPU Planta eléctrica")}
            </Collapse>

            <Collapse title="Agua Potable" >
            {arrayPrinterMachine("Agua Potable")}
            </Collapse>

            <Collapse title="Barra de tiro" >
            {arrayPrinterMachine("Barra de tiro")}
            </Collapse>
            
      </Collapse.Group>

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





