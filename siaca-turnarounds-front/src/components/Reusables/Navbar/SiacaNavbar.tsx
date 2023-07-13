import React, { useEffect, useState } from "react";
import styles from "./SiacaNavbar.style.module.css";
import SiacaLogo from "../../../images/logos/siacaLogo.png";
import Image from "next/image";
import router from "next/router";

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

  return (
    <div className={styles.siacaNavbarContainer}>
      <div className={styles.siacaLogo}>
        <Image src={SiacaLogo} alt="Logo" height={50} />
      </div>

      <h1
        className={
          activeFlights ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => router.push("/Flights")}
      >
        Vuelos
      </h1>
      <h1
        className={
          activeTurnarounds ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => router.push("/Turnarounds")}
      >
        Turnarounds
      </h1>
      <h1
        className={
          activeMachines ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => router.push("/Machines")}
      >
        Maquinarias
      </h1>
      <h1
        className={
          activePersonnel ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => router.push("/Personnel")}
      >
        Personal
      </h1>
      <h1
        className={
          activeMetrics ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => router.push("/Metrics")}
      >
        Métricas
      </h1>
      <h1
        className={activeDocs ? styles.activeItemText : styles.inactiveItemText}
        onClick={() => router.push("/Docs")}
      >
        DOCs
      </h1>
      <h1
        className={
          activeAirlines ? styles.activeItemText : styles.inactiveItemText
        }
        onClick={() => router.push("/Airlines")}
      >
        Aerolíneas
      </h1>
      <h4 className={styles.closeSesionText}>cerrar sesión</h4>
    </div>
  );
};
export default SiacaNavbar;
