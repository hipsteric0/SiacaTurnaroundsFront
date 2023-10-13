import styles from "./index.style.module.css";
import { useState } from "react";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import MetricsPage from "@/components/Metrics/MetricsMainPage";
export default function Metrics() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);

  return (
    <main className={styles.mainContainerMachinesPage}>
      <SiacaNavbar activeMetricsValue={true} />
      <MetricsPage setStep={function (value: number): void {
        throw new Error("Function not implemented.");
      } } />
    </main>
  );
}
