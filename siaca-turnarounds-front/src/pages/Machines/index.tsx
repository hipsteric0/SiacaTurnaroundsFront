import styles from "./index.style.module.css";
import { useState } from "react";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import MachinesMainPage from "@/components/Machines/MachinesMainPage"
import RegisterMachine from "@/components/Machines/RegisterMachine/RegisterMachine";
import EditMachine from "@/components/Machines/EditMachine/EditMachine";
export default function Machines() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);

  return (
    <main className={styles.mainContainerMachinesPage}>
      <SiacaNavbar activeMachinesValue={true} />
      {
        step === 0 && (
          <>
            <MachinesMainPage setStep={setStep} />
          </>
        ) /*el step 0 es la pagina principal de maquinarias*/
      }
      {
        step === 1 && (
          <>
            <RegisterMachine setStep={setStep} />
          </>
        ) /*el step 1 es la pagina de registrar maquinaria*/
      }
      {
        step === 2 && (
          <>
            <EditMachine setStep={setStep} />
          </>
        ) /*el step 1 es la pagina de editar maquinaria*/
      }
    </main>
  );
}
