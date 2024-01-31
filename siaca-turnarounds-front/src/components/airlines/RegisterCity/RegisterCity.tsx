import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./RegisterCity.style.module.css";
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
import BackArrow from "@/components/Reusables/BackArrow";
interface PageProps {
  setStep: (value: number) => void;
}

const RegisterCity: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const [aeropuerto, setAeropuerto] = useState("");
  const [codigoIATA, setCodigoIATA] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoOACI, setCodigoOACI] = useState("");
  const [pais, setPais] = useState("");


  let responseValue = false;

  const registerCities = () => {
    const fetchData = async () => {
      try {
        const url = "/api/registerCity";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            codigo: codigoIATA,
            codigo_oaci: codigoOACI,
            nombre: ciudad,
            pais: pais,
            aeropuerto: aeropuerto,
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((value) => {
          if (value?.status === 400) {
            responseValue = false;
          } else {
            responseValue = true;
            console.log("value", value)
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

    registerCities();
    router.reload();
 
  };

  return (
    <main className={styles.RegisterAirlineContainer}>
      <div className={styles.backArrowIcon}>
        <BackArrow
          executableFunction={() => {
            router.reload();
          }}
        />
      </div>
      <div className={styles.airlinesListContainer}>
        <span className={styles.titleText}>Codigos</span>
        <div className={styles.inputsList}>
          <StandardInput setValue={setCodigoIATA} inputText="IATA" />
          <StandardInput setValue={setCodigoOACI} inputText="OACI" />
        </div>
        <span className={styles.titleText}>Datos</span>
        <div className={styles.inputsList}>
          <StandardInput
            setValue={setCiudad}
            inputText="Ciudad"
          />
          <StandardInput
            setValue={setPais}
            inputText="País"
          />
          <StandardInput
            setValue={setAeropuerto}
            inputText="Aeropuerto"
          />
        </div>
      </div>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => continueButton()}
          buttonText="Registrar"
          disabled={
            codigoIATA === "" ||
            codigoOACI === "" ||
            ciudad === "" ||
            pais === "" ||
            aeropuerto === "" 
          }
          
        />
      </div>
    </main>
  );
};

export default RegisterCity;

