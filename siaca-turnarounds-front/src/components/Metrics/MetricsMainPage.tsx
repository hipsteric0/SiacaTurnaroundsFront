import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./MetricsMainPage.style.module.css";
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

interface PageProps {
  setStep: (value: number) => void;
}

const MetricsPage: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState(['']);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [arrayMachine, setArrayMachine] = useState(['']);
  const [arrayPersonnel, setArrayPersonnel] = useState(['']);
  const [arraySLA, setArraySLA] = useState(['']);
  const [arrayAirline, setArrayAirline] = useState(['']);

  let arrayMachineNumber: any[] = []
  let arrayMachineCount: any[] = []

  let arrayPersonnelName: any[] = []
  let arrayPersonnelCount: any[] = []

  useEffect(() => {
    getMachine();
  }, []);

  useEffect(() => {
    getPersonnel();
  }, []);

  const getMachine = async () => {
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
            setArrayMachine(Object.values(result));

          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const getPersonnel = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/metricPersonnel";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log(result);
            console.log("ARRAY PERSONAL", Object.values(result));

            setArrayPersonnel(Object.values(result));

          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };


  const arrayPrinterMachine = () => {
    let y: any = [];
    arrayMachine.map((index: any) => {
      arrayMachineNumber.push(index?.fk_maquinaria__identificador)
      arrayMachineCount.push(index?.contador)
      
    });
    return y;
  };
  

  const arrayPrinterPersonnel = () => {
    let y: any = [];
    arrayPersonnel.map((index: any) => {
      arrayPersonnelName.push(index?.full_name)
      arrayPersonnelCount.push(index?.contador)
      
    });

    return y;
  };
  

  return (
    <main>
<div className={styles.containerMetrics}>
{arrayPrinterMachine()}
{arrayPrinterPersonnel()}
<div className={styles.divPersonnel} onClick={() => {setStep(1);}}> Personal
<center>
<BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: arrayPersonnelName,
      scaleType: 'band',
      label: 'Personal'
    },
  ]}
  series={[
    {
      data: arrayPersonnelCount,
      label: 'Turnarounds',
      color: '#00A75D'
    },
  ]}
  width={500}
  height={400}
/>
</center>
</div>
<div className={styles.divMachine} onClick={() => {setStep(2);}}> Maquinarias 
<center>
<BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: arrayMachineNumber,
      scaleType: 'band',
      label: 'Maquinarias',
    },
  ]}
  series={[
    {
      data: arrayMachineCount,
      label: 'Número de usos',
      color: '#00A75D'
    },
  ]}
  width={500}
  height={400}
/>
</center>
</div>
<div className={styles.divSLA} onClick={() => {setStep(3);}}> Métricas SLA
<center>
<BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: arrayMachineNumber,
      scaleType: 'band',
      label: 'Maquinarias'
    },
  ]}
  series={[
    {
      data: arrayMachineCount,
      label: 'Número de usos',
      color: '#00A75D'
    },
  ]}
  width={500}
  height={400}
/>
</center>
</div>
<div className={styles.divAirline} onClick={() => {setStep(4);}}> Aerolineas
<center>
<BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: arrayMachineNumber,
      scaleType: 'band',
      label: 'Maquinarias'
    },
  ]}
  series={[
    {
      data: arrayMachineCount,
      label: 'Número de usos',
      color: '#00A75D'
    },
  ]}
  width={500}
  height={400}
/>
</center>
</div>
        </div>
    </main>
  );
};

export default MetricsPage;




