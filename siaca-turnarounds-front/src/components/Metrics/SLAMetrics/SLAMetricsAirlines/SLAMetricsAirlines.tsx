import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./SLAMetricsAirlines.style.module.css";
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

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import ElectricRickshawIcon from '@mui/icons-material/ElectricRickshaw';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

import { CountUp } from 'use-count-up'
import { Gantt, GanttDataType } from "react-virtual-gantt";
import { axisClasses } from '@mui/x-charts';


import BackArrow from "@/components/Reusables/BackArrow";


interface PageProps {
  setStep: (value: number) => void;
}

const SLAMetricsAirlines: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState(['']);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [parametro, setParametro] = useState(['']);
  const [templateStart, setTemplateStart] = useState(['']);
  const [templateStartAndFinish, setTemplateStartAndFinish] = useState(['']);
  const [turnaround, setTurnaround] = useState('');
  const [turnaround2, setTurnaround2] = useState('');
  const [countAirline, setCountAirline] = useState(['']);
  const [countService, setCountService] = useState(['']);


  let arrayAirline: any[] = []
  let arrayCount: any[] = []

  useEffect(() => {
    const fetchData = async () => {
      await getAirline();
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    getCountService();
    getMaxAirline();
  }, []);


  const getAirline = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricAverageAirline";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then(async (result) => {
            console.log("TEMPLATE RESULTADO",result);

            await setTemplateStart(Object.values(result));
            console.log("TEMPLATEEEE:", templateStart)

          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };


  const getCountService = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricChartService";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("CONTADOR SERVICIOS GRAFICA",result);

            setCountService(Object.values(result));

            console.log("CONTADOR DE SERVICIOS", countService)

          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const getMaxAirline = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricMaxAirline";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("CONTADOR SERVICIOS GRAFICA",result);

            setCountAirline(Object.values(result));

            console.log("CONTADOR DE SERVICIOS", countAirline)

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
    let groupedData = {};
   
    // Merge both arrays
    const mergedArray = [...templateStart];
   
    mergedArray.map((index: any) => {
       if (!groupedData[index?.fk_vuelo__fk_aerolinea__nombre]) {
         groupedData[index?.fk_vuelo__fk_aerolinea__nombre] = [];
       }
       groupedData[index?.fk_vuelo__fk_aerolinea__nombre].push(index);
    });
   
    let y: any = [];
    Object.keys(groupedData).map((key: any) => {
      let count = 0;
        const content = groupedData[key].map((item: any) => {
          return (
            <div key={count} className={styles.tableInfoRow}>
              <td><strong>Servicio: </strong>{item?.fk_vuelo__tipo_servicio__nombre}</td>
              <td><strong>Tiempo promedio: </strong>{item?.average_tiempo_transcurrido}</td>
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

   const arrayPrinter = (tipo: string) => {
    let y: any = [];
    let airline: any;
    const arrayAux = countAirline.filter(countAirline => countAirline["tipo_servicio__nombre"] === tipo);
    arrayAux.map((index: any) => {
      airline = index?.aerolinea
      y =(
        <strong><p className={styles.texto}>{airline}</p></strong>
      );
      
    });
    return y;
  };

   const arrayPrinterSLA = () => {
    let y: any = [];
    templateStart.map((index: any) => {
      arrayAirline.push(index?.fk_vuelo__fk_aerolinea__nombre)
      arrayCount.push(index?.contador)
      console.log("arrayAirline", arrayAirline)
      console.log("arrayCount", arrayCount)
    });

    return y;
  };

  const chartSetting = {

    width: 1700,
    height: 500,
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
      <div className={styles.parent}>

          Aerolineas con más servicos
<center>
        <div className={styles.contador}>
      <div className={styles.divcontador}>
        <ElectricRickshawIcon className={styles.icono}/>
        {arrayPrinter("Turnaround entrante")}
        <p className={styles.texto}>Turnaround entrante</p>
        </div>
      <div className={styles.div2contador}>
      <AirplaneTicketIcon className={styles.icono}/>
        {arrayPrinter("Turnaround saliente")}
        <p className={styles.texto}>Turnaround saliente</p>
        </div>
      <div className={styles.div3contador}>
      <FlightTakeoffIcon className={styles.icono}/>
        {arrayPrinter("Outbound")}
        <p className={styles.texto}>Outbound</p>
        </div>
      <div className={styles.div4contador}>
      <FlightLandIcon className={styles.icono}/>
        {arrayPrinter("Inbound")}
        <p className={styles.texto}>Inbound</p>
        </div>
      </div>


</center>
        </div>

      <div className={styles.list}>
        {arrayPrinterStart()}
        </div>

        <div className={styles.divChart}>
      <center>
      {arrayPrinterSLA()}

      </center>
      </div>

    </main>
  );
};

export default SLAMetricsAirlines;




