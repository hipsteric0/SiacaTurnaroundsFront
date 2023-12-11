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
  const [machineAirline, setMachineAirline] = useState(['']);
  const [arrayMachine, setArrayMachine] = useState(['']);

  const [dataMachine, setDataMachine] = useState(['']);

  let array3: any[] = []

  useEffect(() => {
    getList();
    getMachineAirline();
    getMachine();
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

  const getMachineAirline = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricMachineAirline";
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

            setMachineAirline(Object.values(result));

          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const getMachine = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/percentageMachine";
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

            setArrayMachine(Object.values(result));
            const array = Object.values(result).map((index: any) => ({
              label: index.categoria,
              value: parseFloat((index.porcentaje).toString() + '%'),
            }));
            setDataMachine(Object(array));

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
    let arrayDate : any = []
    const arrayAux = parametro.filter(parametro => parametro["fk_maquinaria__fk_categoria__nombre"] === category);
    const arrayAux2 = machineAirline.filter(machineAirline => machineAirline["fk_maquinaria__fk_categoria__nombre"] === category)
    arrayAux.map((index: any) => {
      arrayMachine.push(index?.fk_maquinaria__identificador)
      arrayUses.push(index?.contador)
      arrayDate.push(index?.fecha)
      y =(
        <center>
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
      </center>
      );
      
    });
    return y;
  };


  const arrayPrinterMachineAirline = (category: string) => {
    let y: any = [];
    const arrayAux = machineAirline.filter(machineAirline => machineAirline["fk_maquinaria__fk_categoria__nombre"] === category)
    arrayAux.map((index: any) => {
      y =(
        <center>
        <p>{index?.aerolinea}</p>
        <p>{index?.maquinaria_max}</p>
      </center>
      );
      
    });
    return y;
  };

  const palette = ['#0d47a1',
  '#00b0ff',
  '#0097a7',
  '#00695c',
  '#388e3c',
  '#b2ff59'];

  
function StraightAnglePieChart() {
  console.log("PARAMETRO 2", dataMachine)
    return (

<PieChart 
colors={palette}
  series={[
    {
      data: dataMachine,
      highlightScope: { faded: 'global', highlighted: 'item' },
    },
  ]}
  width={600}
  height={400}
  
/>
    );
  }
  

  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.container}>
      <div className={styles.div2}>
      <center>
    {StraightAnglePieChart()}
    </center>
    </div>
    <div className={styles.div1}>
      <div className={styles.airlinesListContainer}>

      <Collapse.Group id="group">
        <Collapse title="Aguas Servidas" >
        <div className={styles.machinesgrid}>
        {arrayPrinterMachine("Aguas servidas")}
        {arrayPrinterMachineAirline("Aguas servidas")}
        </div>
        </Collapse>
            
            <Collapse title="Tractor de arrastre">
            <div className={styles.machinesgrid}>
            {arrayPrinterMachine("Tractor de arrastre")}
            {arrayPrinterMachineAirline("Tractor de arrastre")}
            </div>
            </Collapse>

            <Collapse title="Escalera" >
            <div className={styles.machinesgrid}>
            {arrayPrinterMachine("Escalera")}
            {arrayPrinterMachineAirline("Escalera")}
            </div>
            </Collapse>

            <Collapse title="Cinta transportadora" >
            <div className={styles.machinesgrid}>
            {arrayPrinterMachine("Cinta transportadora")}
            {arrayPrinterMachineAirline("Cinta transportadora")}
            </div>
            </Collapse>

            <Collapse title="Loader" >
            <div className={styles.machinesgrid}>
            {arrayPrinterMachine("Loader")}
            {arrayPrinterMachineAirline("Loader")}
            </div>
            </Collapse>

            <Collapse title="Tractor de empuje" >
            <div className={styles.machinesgrid}>
            {arrayPrinterMachine("Tractor de empuje")}
            {arrayPrinterMachineAirline("Tractor de empuje")}
            </div>
            </Collapse>

            <Collapse title="Aire acondicionado" >
            <div className={styles.machinesgrid}>
            {arrayPrinterMachine("Aire acondicionado")}
            {arrayPrinterMachineAirline("Aire acondicionado")}
            </div>
            </Collapse>

            <Collapse title="Planta neumática" >
            <div className={styles.machinesgrid}>
            {arrayPrinterMachine("Planta neumática")}
            {arrayPrinterMachineAirline("Planta neumática")}
            </div>
            </Collapse>

            <Collapse title="GPU Planta eléctrica" >
            <div className={styles.machinesgrid}>
            {arrayPrinterMachine("GPU Planta eléctrica")}
            {arrayPrinterMachineAirline("GPU Planta eléctrica")}
            </div>
            </Collapse>

            <Collapse title="Agua Potable" >
            <div className={styles.machinesgrid}>
            {arrayPrinterMachine("Agua Potable")}
            {arrayPrinterMachineAirline("Agua Potable")}
            </div>
            </Collapse>

            <Collapse title="Barra de tiro" >
            <div className={styles.machinesgrid}>
            {arrayPrinterMachine("Barra de tiro")}
            {arrayPrinterMachineAirline("Barra de tiro")}
            </div>
            </Collapse>
            
      </Collapse.Group>
      </div>
      </div>
        <div>
        </div>
        </div>
    </main>
  );
};

export default MachineMetrics;





