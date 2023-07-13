import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./RegisterAirline.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
import router from "next/router";
import { Table } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import StandardInput from "@/components/Reusables/StandardInput";

interface PageProps {
  setStep: (value: number) => void;
}

const RegisterAirline: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const [aerolinea, setAerolinea] = useState("");
  const [codigo, setCodigo] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [ciduad, setCiudad] = useState("");
  return (
    <main className={styles.RegisterAirlineContainer}>
      <div className={styles.airlinesListContainer}>
        <span className={styles.titleText}>Datos</span>
        <div className={styles.inputsList}>
          <StandardInput setValue={setAerolinea} inputText="Aerolínea" />
          <StandardInput setValue={setAerolinea} inputText="Código" />
        </div>
        <span className={styles.titleText}>Contacto</span>
        <div className={styles.inputsList}>
          <StandardInput setValue={setAerolinea} inputText="Correo principal" />
          <StandardInput
            setValue={setAerolinea}
            inputText="Correo secundario"
          />
          <StandardInput
            setValue={setAerolinea}
            inputText="Teléfono principal"
          />
          <StandardInput
            setValue={setAerolinea}
            inputText="Teléfono secundario"
          />
        </div>
        <span className={styles.titleText}>Localización</span>
        <div className={styles.inputsList}>
          <StandardInput setValue={setAerolinea} inputText="Pais" />
          <StandardInput setValue={setAerolinea} inputText="Ciudad" />
        </div>
      </div>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => setStep(1)}
          buttonText="Registrar"
        />
      </div>
    </main>
  );
};

export default RegisterAirline;

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
