import React, { useEffect, useState } from "react";
import styles from "./SiacaNavbar.style.module.css";
import SiacaLogo from "../../../images/logos/siacaLogo.png";
import Image from "next/image";
import router from "next/router";

import LoadingScreen from '../../Reusables/LoadingScreen';

interface PageProps {
  activeFlightsValue?: boolean;
  activeTurnaroundsValue?: boolean;
  activeMachinesValue?: boolean;
  activePersonnelValue?: boolean;
  activeMetricsValue?: boolean;
  activeDocsValue?: boolean;
  activeAirlinesValue?: boolean;
}


const SiacaNavbar: React.FC<PageProps> = ({
  activeFlightsValue,
  activeTurnaroundsValue,
  activeMachinesValue,
  activePersonnelValue,
  activeMetricsValue,
  activeDocsValue,
  activeAirlinesValue,
}) => {
  useEffect(() => {
    if (activeFlightsValue) setActiveFligths(activeFlightsValue);
    if (activeTurnaroundsValue) setActiveTurnarounds(activeTurnaroundsValue);
    if (activeMachinesValue) setActiveMachines(activeMachinesValue);
    if (activePersonnelValue) setActivePersonnel(activePersonnelValue);
    if (activeMetricsValue) setActiveMetrics(activeMetricsValue);
    if (activeDocsValue) setActiveDocs(activeDocsValue);
    if (activeAirlinesValue) setActiveAirlines(activeAirlinesValue);
  }, []); // If nothing on dependencies, this will run only first render
  const [activeFlights, setActiveFligths] = useState(false);
  const [activeTurnarounds, setActiveTurnarounds] = useState(false);
  const [activeMachines, setActiveMachines] = useState(false);
  const [activePersonnel, setActivePersonnel] = useState(false);
  const [activeMetrics, setActiveMetrics] = useState(false);
  const [activeDocs, setActiveDocs] = useState(false);
  const [activeAirlines, setActiveAirlines] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [loading8, setLoading8] = useState(false);

  const Logout = async () => {
    setLoading8(true);
    const fetchData = async () => {
      try {
        const url = "/api/logout";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            router.push("/");
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
    
  };

  const Vuelos = () =>{
    setLoading(true);
    router.push("/Flights")
  }

  const Turnarounds = () =>{
    setLoading2(true);
    router.push("/Turnarounds")
  }

  const Machines = () =>{
    setLoading3(true);
    router.push("/Machines")
  }

  const Personnel = () =>{
    setLoading4(true);
    router.push("/Personnel")
  }

  const Metrics = () =>{
    setLoading5(true);
    router.push("/Metrics")
  }

  const Docs = () =>{
    setLoading6(true);
    router.push("/Docs")
  }

  const Airlines = () =>{
    setLoading7(true);
    router.push("/Airlines")
  }


  return (

    <div className={styles.siacaNavbarContainer}>
      <div className={styles.siacaLogo}>
        <Image src={SiacaLogo} alt="Logo" height={50} />
      </div>

      <h1
        className={
          activeFlights ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => Vuelos()}
      >
        {loading && <LoadingScreen />}
        Vuelos
      </h1>
      <h1
        className={
          activeTurnarounds ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => Turnarounds()}
      >
        {loading2 && <LoadingScreen />}
        Turnarounds
      </h1>
      <h1
        className={
          activeMachines ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => Machines()}
      >
        {loading3 && <LoadingScreen />}
        Maquinarias
      </h1>
      <h1
        className={
          activePersonnel ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => Personnel()}
      >
        {loading4 && <LoadingScreen />}
        Personal
      </h1>
      <h1
        className={
          activeMetrics ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => Metrics()}
      >
        {loading5 && <LoadingScreen />}
        Métricas
      </h1>
      <h1
        className={activeDocs ? styles.activeItemText : styles.inactiveItemText}
        onClick={() => Docs()}
      >
        {loading6 && <LoadingScreen />}
        DOCs
      </h1>
      <h1
        className={
          activeAirlines ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => Airlines()}
      >
        {loading7 && <LoadingScreen />}
        Aerolíneas
      </h1>
      <h4 
        className={styles.closeSesionText}
          onClick={() => Logout()}
      >
        {loading8 && <LoadingScreen />}
        cerrar sesión
      </h4>
    </div>

  );
};
export default SiacaNavbar;
