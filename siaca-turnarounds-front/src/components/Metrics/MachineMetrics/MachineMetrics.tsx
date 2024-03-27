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

import StandardInput from "@/components/Reusables/StandardInput";

import BackArrow from "@/components/Reusables/BackArrow";

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

  const [dayStart, setDayStart] = useState("");
  const [monthStart, setMonthStart] = useState("");
  const [yearStart, setYeartart] = useState("");
  const [dayFinal, setDayFinal] = useState("");
  const [monthFinal, setMonthFinal] = useState("");
  const [yearFinal, setYearFinal] = useState("");

  const [dataMachine, setDataMachine] = useState(['']);

  let array3: any[] = []

  useEffect(() => {

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


  const palette = ['#0d47a1',
  '#00b0ff',
  '#0097a7',
  '#00695c',
  '#388e3c',
  '#b2ff59'];

  
function MachineChart() {
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


  const arrayPrinterMachine = () => {
    if (!Array.isArray(arrayList3) || arrayList3.length === 0) {
      return <p>No hay existe historial de maquinarias entre estas fechas</p>;
    }
  
    let groupedData = {};
    const mergedArray = [...arrayList3];
   
    mergedArray.map((index: any) => {
       if (!groupedData[index?.fk_maquinaria__fk_categoria__nombre]) {
         groupedData[index?.fk_maquinaria__fk_categoria__nombre] = [];
       }
       groupedData[index?.fk_maquinaria__fk_categoria__nombre].push(index);
    });
   
    let y: any = [];
    Object.keys(groupedData).map((key: any) => {
      let count = 0;
        const content = groupedData[key].map((item: any) => {
          return (
            <div key={count} className={styles.tableInfoRow}>
              <td><strong>Identificador: </strong>{item?.fk_maquinaria__identificador}</td>
              <td><strong>Fecha: </strong>{item?.fecha}</td>
              <td><strong>No. de servicios: </strong>{item?.contador}</td>
            </div>
          );
          
        });
        count++;
        y.push(
          <Collapse title={key} key={key}>
            {content}
          </Collapse>
        );
    });
   
    return y;
   };  


   const handleButtonClickSearch = () => {
    fetch(`http://127.0.0.1:8000/metricas/maquinarias/${dayStart}/${dayFinal}/?token=`+localStorage.getItem("userToken"))
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

      <div className={styles.container}>
      <div className={styles.div2}>
      <center>
    {MachineChart()}
    </center>
    </div>
    <div className={styles.div1}>
      <div className={styles.airlinesListContainer}>

          {arrayPrinterMachine()}

      </div>
      </div>
        <div>
        </div>
        </div>
    </main>
  );
};

export default MachineMetrics;





