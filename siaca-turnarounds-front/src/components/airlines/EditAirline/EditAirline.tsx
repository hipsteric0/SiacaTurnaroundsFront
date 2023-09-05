import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./EditAirline.style.module.css";
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
  flightID: number;
}

const RegisterAirline: React.FC<PageProps> = ({ setStep, flightID }) => {
  //if token exists show regular html else show not signed in screen
  const [aerolinea, setAerolinea] = useState("");
  const [codigo, setCodigo] = useState("");
  const [correoPrincipal, setCorreoPrincipal] = useState("");
  const [correoSecundario, setCorreoSecundario] = useState("");
  const [telefonoPrincipal, setTelefonoPrincipal] = useState("");
  const [telefonoSecundario, setTelefonoSecundario] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");

  let responseValue = false;

  const registerAirlines = () => {
    const fetchData = async () => {
      try {
        const url = "/api/registerAirline";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            nombre: aerolinea,
            correo: correoPrincipal,
            correo_secundario: correoSecundario,
            telefono: telefonoPrincipal,
            telefono_secundario: telefonoSecundario,
            codigo: codigo,
            pais: pais,
            ciudad: ciudad,
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((value) => {
          if (value?.status === 400) {
            responseValue = false;
          } else {
            responseValue = true;
            console.log("value", value);
          }
          return true;
        });
        if (!response) {
          responseValue = false;

          throw new Error("Error in response registering user");
        }
      } catch (error) {
        responseValue = false;
        //mostrar mensaje de no se pudo validasr usuario, ya existe o su conexion es limitada
      }
    };
    fetchData().catch(console.error);
  };

  const continueButton = () => {
    console.log("flightID", flightID)
  };

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
          executableFunction={() => continueButton()}
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

export default RegisterAirline;
