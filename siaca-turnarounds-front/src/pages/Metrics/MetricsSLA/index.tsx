import styles from "./index.style.module.css";
import { useState } from "react";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import MetricsPage from "@/components/Metrics/MetricsMainPage";
import AirlineMetrics from "@/components/Metrics/AirlineMetrics/AirlineMetrics";
import MachineMetrics from "@/components/Metrics/MachineMetrics/MachineMetrics";
import PersonnelMetrics from "@/components/Metrics/PersonnelMetrics/PersonnelMetrics";
import SLAMetrics from "@/components/Metrics/SLAMetrics/SLAMetrics";
import SLAMetricsTemplate from "@/components/Metrics/SLAMetrics/SLAMetricsTemplate/SLAMetricsTemplate"
import SLAMetricsAirlines from "@/components/Metrics/SLAMetrics/SLAMetricsAirlines/SLAMetricsAirlines"
import SLAMetricsFlights from "@/components/Metrics/SLAMetrics/SLAMetricsFlights/SLAMetricsFlights"

export default function Metrics() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);

  return (
      <main className={styles.mainContainerMachinesPage}>
        <SiacaNavbar />
        {
        step === 0 && (
          <>
            <SLAMetrics setStep={setStep} />
          </>
        ) /*el step 0 es la pagina principal de maquinarias*/
      }
      {
        step === 1 && (
          <>
            <SLAMetricsTemplate setStep={setStep} />
          </>
        ) /*el step 1 es la pagina de registrar maquinaria*/
      }
      {
        step === 2 && (
          <>
            <SLAMetricsAirlines setStep={setStep}  />
          </>
        ) /*el step 1 es la pagina de editar maquinaria*/
      }
      {
        step === 3 && (
          <>
            <SLAMetricsFlights setStep={setStep}  />
          </>
        ) /*el step 1 es la pagina de editar maquinaria*/
      }
      </main>
    );
  }
