import styles from "./index.style.module.css";
import { useState } from "react";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import MetricsPage from "@/components/Metrics/MetricsMainPage";
import AirlineMetrics from "@/components/Metrics/AirlineMetrics/AirlineMetrics";
import MachineMetrics from "@/components/Metrics/MachineMetrics/MachineMetrics";
import PersonnelMetrics from "@/components/Metrics/PersonnelMetrics/PersonnelMetrics";
import SLAMetrics from "@/components/Metrics/SLAMetrics/SLAMetrics";

export default function Metrics() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);

  return (
    <main className={styles.mainContainerMachinesPage}>
      <SiacaNavbar activeMetricsValue={true} />
      {
        step === 0 && (
          <>
            <MetricsPage setStep={setStep} />
          </>
        ) /*el step 0 es la pagina principal de métricas*/
      }
      {
        step === 1 && (
          <>
            <PersonnelMetrics setStep={setStep} />
          </>
        ) /*el step 1 es la pagina de métricas de personal*/
      }
      {
        step === 2 && (
          <>
            <MachineMetrics setStep={setStep}/>
          </>
        ) /*el step 2 es la pagina de métricas de máquinaria*/
      }
      {
        step === 3 && (
          <>
            <SLAMetrics setStep={setStep}/>
          </>
        ) /*el step 3 es la pagina de métricas de SLA*/
      }
      {
        step === 4 && (
          <>
            <AirlineMetrics setStep={setStep}/>
          </>
        ) /*el step 4 es la pagina de métricas de aerolíneas*/
      }

    </main>
  );
}
