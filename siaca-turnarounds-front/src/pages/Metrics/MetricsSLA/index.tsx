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
        <SiacaNavbar />
        <SLAMetrics setStep={setStep} />
      </main>
    );
  }
