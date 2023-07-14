import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./RegisterTemplate.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
import router from "next/router";
import { Table } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import StandardInput from "@/components/Reusables/StandardInput";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
interface PageProps {
  setStep: (value: number) => void;
}

const RegisterTemplate: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const [aerolinea, setAerolinea] = useState("");
  const [codigo, setCodigo] = useState("");
  const [correoPrincipal, setCorreoPrincipal] = useState("");
  const [correoSecundario, setCorreoSecundario] = useState("");
  const [telefonoPrincipal, setTelefonoPrincipal] = useState("");
  const [telefonoSecundario, setTelefonoSecundario] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  return (
    <main className={styles.RegisterAirlineContainer}>
      <div className={styles.airlinesListContainer}>
        <span className={styles.titleText}>Logo</span>
        <div className={styles.inputsListImage}>
          <div className={styles.uploadContainer}>
            <DriveFolderUploadRoundedIcon fontSize="inherit" />
            <div className={styles.uploadCancelButtons}>
              <FileUploadRoundedIcon htmlColor="#08a75a" />
              <CloseRoundedIcon htmlColor="red" />
            </div>
          </div>
        </div>
        <span className={styles.titleText}>Datos</span>
        <div className={styles.inputsList}>
          <StandardInput setValue={setAerolinea} inputText="Aerolínea" />
          <StandardInput setValue={setCodigo} inputText="Código" />
        </div>
        <span className={styles.titleText}>Contacto</span>
        <div className={styles.inputsList}>
          <StandardInput
            setValue={setCorreoPrincipal}
            inputText="Correo principal"
          />
          <StandardInput
            setValue={setCorreoSecundario}
            inputText="Correo secundario"
          />
          <StandardInput
            setValue={setTelefonoPrincipal}
            inputText="Teléfono principal"
          />
          <StandardInput
            setValue={setTelefonoSecundario}
            inputText="Teléfono secundario"
          />
        </div>
        <span className={styles.titleText}>Localización</span>
        <div className={styles.inputsList}>
          <StandardInput setValue={setPais} inputText="Pais" />
          <StandardInput setValue={setCiudad} inputText="Ciudad" />
        </div>
      </div>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => setStep(0)}
          buttonText="Registrar"
          disabled={
            aerolinea === "" ||
            codigo === "" ||
            correoPrincipal === "" ||
            correoSecundario === "" ||
            telefonoPrincipal === "" ||
            telefonoSecundario === "" ||
            pais === "" ||
            ciudad === ""
          }
        />
      </div>
    </main>
  );
};

export default RegisterTemplate;

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
