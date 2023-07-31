import styles from "./index.style.module.css";
import { useState } from "react";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import MachinesMainPage from "@/components/Machines/MachinesMainPage"
export default function Machines() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);

  return (
    <main className={styles.mainContainerMachinesPage}>
      <SiacaNavbar activeMachinesValue={true} />
      <MachinesMainPage />
    </main>
  );
}
