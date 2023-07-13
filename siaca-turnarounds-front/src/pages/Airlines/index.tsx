import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./index.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
import router from "next/router";
import { Table } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import AirlinesMainPage from "@/components/airlines/AirlinesMainPage";
import RegisterAirline from "@/components/airlines/RegisterAirline/RegisterAirline";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
export default function Airlines() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);

  return (
    <main className={styles.mainContainerAirlinesPage}>
      <SiacaNavbar activeAirlinesValue={true} />
      {
        step === 0 && (
          <>
            <AirlinesMainPage setStep={setStep} />
          </>
        ) /*el step 0 es la pagina principal de aerolineas*/
      }
      {
        step === 1 && (
          <>
            <RegisterAirline setStep={setStep} />
          </>
        ) /*el step 1 es la pagina de registrar aerolinea*/
      }
    </main>
  );
}
let arrayAux = [
  {
    id: 0,
    nombre: "Aerolinea 1",
    correo: "corre1@gmail.com",
    telefono: "48374783784",
    codigo: "123",
    imagen: "link",
  },
  {
    id: 1,
    nombre: "Aerolinea 2",
    correo: "correo2@gmail.com",
    telefono: "48374783784",
    codigo: "123",
    imagen: "link",
  },
  {
    id: 2,
    nombre: "Aerolinea 3",
    correo: "correo3@gmail.com",
    telefono: "48374783784",
    codigo: "123",
    imagen: "link",
  },
];
