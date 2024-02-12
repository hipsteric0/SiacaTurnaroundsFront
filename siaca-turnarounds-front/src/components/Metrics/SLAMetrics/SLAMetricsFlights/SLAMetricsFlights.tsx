import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./SLAMetricsFlights.style.module.css";
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
import { Collapse, Grid, Text } from "@nextui-org/react";
import {Card, Image} from "@nextui-org/react";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartContainer, BarPlot } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';

import BackArrow from "@/components/Reusables/BackArrow";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';


interface PageProps {
  setStep: (value: number) => void;
}

const SLAMetricsFlights: React.FC<PageProps> = ({ setStep }) => {
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
  const [arraySLA, setArraySLA] = useState(['']);

  const [data, setData] = useState(['']);


  let arraySLAName: any[] = []
  let arraySLATime: any[] = []

  useEffect(() => {
    const fetchData = async () => {
      await getTemplateStart();
    };
    fetchData().catch(console.error);
  }, []);


  useEffect(() => {
    getTemplateStartAndFinish();
    getSLA();
    handleButtonClickStart();
  }, []);

  useEffect(() => {
    if (templateStart.length > 0) {
      setTurnaround(templateStart[0]?.fk_turnaround__hora_inicio);
      setTurnaround2(templateStart[0]?.fk_turnaround__hora_fin);

    }
 }, [templateStart]);


  const getTemplateStart = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricAverageTemplateTimeStart";
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

  const getTemplateStartAndFinish = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricAverageTemplateTimeStartAndFinish";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("TEMPLATE RESULTADO",result);

            setTemplateStartAndFinish(Object.values(result));

            console.log("HORA INICIO Y FIN:", templateStartAndFinish)

          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const getSLA = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricSLA";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("SLA RESULTADO",result);

            setArraySLA(Object.values(result));
            const array = Object.values(result).map((index: any) => ({
              label: index?.fk_plantilla__titulo,
              value: index?.contador,
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



  const arrayPrinterStart = () => {
    let groupedData = {};
  
    // Merge both arrays
    const mergedArray = [...templateStart, ...templateStartAndFinish];
  
    mergedArray.map((index) => {
      const key =
        index.fk_subtarea__fk_tarea__fk_plantilla__titulo +
        '_' +
        index.fk_turnaround__fk_vuelo__fk_aerolinea__nombre;
  
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(index);
    });
  
    let y = [];
    Object.keys(groupedData).map((key) => {
      const [titulo, aerolinea] = key.split('_');
  
      const content = groupedData[key].map((item) => {
        return (
          <div key={item?.fk_subtarea_id} className={styles.tableInfoRow}>
            <td>{item?.fk_subtarea__titulo}</td>
            <td >{item?.average_tiempo_transcurrido} <b>{item?.fk_subtarea__fk_tipo_id === 2 ? 'inicio' : 'tiempo de ejecución'}</b></td>
          </div>
        );
      });
  
      if (!y[titulo]) {
        y[titulo] = [];
      }
  
      y[titulo].push(
        <Collapse.Group bordered >
        <Collapse title={aerolinea} key={aerolinea}>
          {content}
        </Collapse>
        </Collapse.Group>
      );
    });
  
    const collapseArray = Object.keys(y).map((title) => {
      return (
        <Collapse.Group bordered>
        <Collapse title={title} key={title}>
          {y[title]}
        </Collapse>
        </Collapse.Group>
      );
    });
  
    return collapseArray;
  };

   const arrayPrinterSLA = () => {
    let y: any = [];
    arraySLA.map((index: any) => {
      arraySLAName.push(index?.fk_vuelo__fk_aerolinea__nombre)
      arraySLATime.push(index?.contador)
      
    });

    return y;
  };

   const palette = ['#0d47a1',
   '#00b0ff',
   '#0097a7',
   '#00695c',
   '#388e3c',
   '#b2ff59'];

   const [code, setCode] = useState('');
   const [date, setDate] = useState('');
   const [start, setStart] = useState([]);
   const [startFinish, setStartFinish] = useState([]);

 
   const handleButtonClickStart = () => {
     fetch(`http://127.0.0.1:8000/metricas/vuelos-on-time/?token=`+localStorage.getItem("userToken"))
       .then((response) => response.json())
       .then((data) => setStart(data))
       .catch((error) => console.error('Error fetching ', error));
   };


  const arrayPrinter2 = () => {
    let y: any = [];

    start.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          <td>{index.identificador}</td>
          <td>{index.descripcion}</td>
          <td>{index.categoria}</td>
          <td>{index.contador}</td>
          <td>{index.porcentaje}%</td>
        </div>
      );
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

      <div className={styles.title}>
        <p>Porcentajes de códigos de demora</p>
      </div>

      <div className={styles.airlinesListContainer}>
                  <div>
                    <div className={styles.tableTitlesContainer}>
                      <span>Alpha</span>
                      <span>Descripción</span>
                      <span>Categoría</span>
                      <span>Contador</span>
                      <span>Porcentaje</span>
                    </div>
                    {arrayPrinter2()}
                  </div>
                </div>
    </main>
  );
};

export default SLAMetricsFlights;




