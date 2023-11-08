import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./SLAMetrics.style.module.css";
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

interface PageProps {
  setStep: (value: number) => void;
}

const SLAMetrics: React.FC<PageProps> = ({ setStep }) => {
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


  let array1: any[] = []
  let array2: any[] = []
  let array3: any[] = []


  useEffect(() => {
    getTemplateStart();
  }, []);

  useEffect(() => {
    getTemplateStartAndFinish();
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
        const url = "/api/TemplateDetailsStart";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("TEMPLATE RESULTADO",result);

            setTemplateStart(Object.values(result));
            console.log("template:", templateStart)

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
        const url = "/api/TemplateDetailsStartAndFinish";
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

  const arrayPrinterStart = () => {
    let y: any = [];
    console.log("arrayList3", arrayList3.length);

    templateStart.map((index: any) => {
      y[index?.id] = (
        <div key={index?.id} className={styles.tableInfoRow}>

          <td>{index?.fk_subtarea__fk_tarea__titulo}</td>
          <td>{index?.fk_subtarea__titulo}</td>
          <td>{index?.fk_subtarea__fk_tipo__nombre}</td>
          <td> minuto {index?.tiempo}</td>
        </div>
      );
    });
    
    return y;
  };


  const arrayPrinterStartAndFinish = () => {
    let y: any = [];
    console.log("arrayList3", arrayList3.length);

    templateStartAndFinish.map((index: any) => {
      y[index?.id] = (
        <div key={index?.id} className={styles.tableInfoRow}>

          <td>{index?.fk_subtarea__fk_tarea__titulo}</td>
          <td>{index?.fk_subtarea__titulo}</td>
          <td>{index?.fk_subtarea__fk_tipo__nombre}</td>
          <td>{index?.hora_inicio} - {index?.hora_fin}</td>
          <td>{index?.tiempo} min</td>
        </div>
      );
    });
    
    return y;
  };
  

  const arrayPrinterTimelineStart = () => {
    let y: any = [];
    templateStart.map((index: any) => {
      y[index?.id] = (
        <div key={index?.id} >
       
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {index?.hora_inicio}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{index?.fk_subtarea__titulo}</TimelineContent>
      </TimelineItem>
        </div>
      );
      
    });
    return y;
  };

  const arrayPrinterTimelineStartAndFinish = () => {
    let y: any = [];
    templateStartAndFinish.map((index: any) => {
      y[index?.id] = (
          <div key={index?.id}>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                {index?.hora_inicio}
              </TimelineOppositeContent>
              <TimelineContent>
                {index?.hora_fin}
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>{index?.fk_subtarea__titulo}</TimelineContent>
            </TimelineItem>
          </div>
      );
      
    });
    return y;
  };
  

  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.airlinesListContainer}>
      <p>MÉTRICAS SLA</p>
      
      <div className={styles.parent}>
      <div className={styles.div1}>

      <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {turnaround}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="success"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Inicio del turnaround</TimelineContent>
      </TimelineItem>
      {arrayPrinterTimelineStart()}
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {turnaround2}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="grey"/>
        </TimelineSeparator>
        <TimelineContent>Fin del turnaround</TimelineContent>
      </TimelineItem>
      </Timeline>
    </div>


    <div className={styles.div2}>
    <Timeline position="alternate">
    <TimelineItem>
      <TimelineOppositeContent color="text.secondary">
        
      </TimelineOppositeContent>
        <TimelineContent>
        {turnaround}
        </TimelineContent>
           <TimelineSeparator>
          <TimelineDot color="success" />
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Inicio del turnaround</TimelineContent>
       </TimelineItem>
      {arrayPrinterTimelineStartAndFinish()}
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {turnaround2}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="grey"/>
        </TimelineSeparator>
        <TimelineContent>Fin del turnaround</TimelineContent>
      </TimelineItem>
      </Timeline>
    </div>
        <div className={styles.div3}>
          <div className={styles.tableTitlesContainer}>

            <span>Tarea</span>
            <span>Subtarea</span>
            <span>Tipo de subtarea</span>
            <span>Minuto de inicio</span>
          </div>
          {arrayPrinterStart()}

          <div className={styles.tableTitlesContainer}>

            <span>Tarea</span>
            <span>Subtarea</span>
            <span>Tipo de subtarea</span>
            <span>Hora de inicio y fin</span>
            <span>Tiempo de ejecución</span>
          </div>
          {arrayPrinterStartAndFinish()}

        </div>
      </div>
      </div>
    </main>
  );
};

export default SLAMetrics;




