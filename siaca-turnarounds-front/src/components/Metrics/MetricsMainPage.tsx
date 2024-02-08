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

import { Typography } from '@mui/material';

import LoadingScreen from '../Reusables/LoadingScreen';

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

  const [data, setData] = useState(['']);
  const [data2, setData2] = useState(['']);
  const [data3, setData3] = useState(['']);
  const [data4, setData4] = useState(['']);

  const [loading, setLoading] = useState(false);


  let arrayMachineNumber: any[] = []
  let arrayMachineCount: any[] = []

  let arrayPersonnelName: any[] = []
  let arrayPersonnelCount: any[] = []

  let arrayAirlineName: any[] = []
  let arrayAirlineCount: any[] = []

  let arraySLAName: any[] = []
  let arraySLATime: any[] = []


  useEffect(() => {
    getMachine();
  }, []);

  useEffect(() => {
    getPersonnel();
  }, []);

  useEffect(() => {
    getAirline();
  }, []);

  useEffect(() => {
    getSLA();
  }, []);


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

            setArrayList3(Object.values(result));
            setArrayMachine(Object.values(result));
            const array = Object.values(result).map((index: any) => ({
              label: index.categoria,
              value: parseFloat((index.porcentaje).toString() + '%'),
            }));
            setData3(Object(array));

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

            const array = Object.values(result).map((index: any) => ({
              label: index.departamentos,
              value: parseFloat((index.porcentaje).toString() + '%'),
            }));
            
            setData4(Object(array));


          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

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
            setData2(Object(array));

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
              label: index.fk_plantilla__titulo,
              value: parseFloat((index.porcentaje).toString() + '%'),
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

  const arrayPrinterMachine = () => {
    let y: any = [];
    arrayMachine.map((index: any) => {
      arrayMachineNumber.push(index?.categoria)
      arrayMachineCount.push(index?.porcentaje)
      
    });
    return y;
  };
  

  const arrayPrinterPersonnel = () => {
    let y: any = [];
    arrayPersonnel.map((index: any) => {
      arrayPersonnelName.push(index?.departamentos)
      arrayPersonnelCount.push(index?.porcentaje)
      
    });

    return y;
  };

  const arrayPrinterAirline = () => {
    let y: any = [];
    arrayAirline.map((index: any) => {
      arrayAirlineName.push(index?.fk_aerolinea__nombre)
      arrayAirlineCount.push(index?.contador)
      
    });

    return y;
  };

  const arrayPrinterSLA = () => {
    let y: any = [];
    arraySLA.map((index: any) => {
      arraySLAName.push(index?.fk_vuelo__fk_aerolinea__nombre)
      arraySLATime.push(index?.porcentaje)
      
    });

    return y;
  };

  const palette = ['#0d47a1',
    '#00b0ff',
    '#0097a7',
    '#00695c',
    '#388e3c',
    '#b2ff59'];


  const Personnel = () =>{
    setLoading(true);
    router.push("/Metrics/MetricsPersonnel")
  }


  const Machine = () =>{
    setLoading(true);
    router.push("/Metrics/MetricsMachine")
  }

  const SLA = () =>{
    setLoading(true);
    router.push("/Metrics/MetricsSLA")
  }

  const Airline = () =>{
    setLoading(true);
    router.push("/Metrics/MetricsAirline")
  }


  return (
    <main>
<div className={styles.containerMetrics}>
{arrayPrinterMachine()}
{arrayPrinterPersonnel()}
{arrayPrinterAirline()}
{arrayPrinterSLA()}

<div className={styles.divPersonnel} onClick={() => Personnel()}> Personal
{loading && <LoadingScreen />}
<center>

<PieChart
colors={palette}
  series={[
    {
      data: data4,
    },
  ]}
  width={400}
  height={200}
/>


</center>
</div>
<div className={styles.divMachine} onClick={() => Machine()}> Maquinarias 
{loading && <LoadingScreen />}
<center>
<br/>
<PieChart
colors={palette}
  series={[
    {
      data: data3,
    },
  ]}
  width={400}
  height={200}
/>

</center>
</div>
<div className={styles.divSLA} onClick={() => SLA()}> Métricas SLA
{loading && <LoadingScreen />}
<center>
<br/>
<PieChart
colors={palette}
  series={[
    {
      data: data,
    },
  ]}
  width={400}
  height={200}
/>

</center>
</div>
<div className={styles.divAirline} onClick={() => Airline()}> Aerolineas
{loading && <LoadingScreen />}
<center>
<br/>
<PieChart
colors={palette}
  series={[
    {
      data: data2,
    },
  ]}
  width={400}
  height={200}
/>

</center>
</div>
        </div>
    </main>
  );
};

export default MetricsPage;




