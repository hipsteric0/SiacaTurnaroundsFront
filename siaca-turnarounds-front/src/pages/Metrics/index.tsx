import styles from "./index.style.module.css";
import { useState } from "react";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import MetricsPage from "@/components/Metrics/MetricsMainPage";
import SLAMetrics from "@/components/Metrics/SLAMetrics/SLAMetrics";
import SLAMetricsTemplate from "@/components/Metrics/SLAMetrics/SLAMetricsTemplate/SLAMetricsTemplate"

export default function Metrics() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);

  return (
      <main className={styles.mainContainerMachinesPage}>
        <SiacaNavbar />
        {
        step === 0 && (
          <>
            <MetricsPage setStep={setStep} />
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
            <MetricsPage setStep={setStep}  />
          </>
        ) /*el step 1 es la pagina de editar maquinaria*/
      }
        
      </main>
    );
  }
