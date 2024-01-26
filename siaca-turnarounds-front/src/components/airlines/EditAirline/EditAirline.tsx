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
import StandardInputV2 from "@/components/Reusables/StandardInputV2";
import BackArrow from "@/components/Reusables/BackArrow";
interface PageProps {
  setStep: (value: number) => void;
  flightID: number;
}

const RegisterAirline: React.FC<PageProps> = ({ setStep, flightID }) => {
  //if token exists show regular html else show not signed in screen

  useEffect(() => {
    getList();
  }, []);

  const [aerolinea, setAerolinea] = useState("");
  const [codigo, setCodigo] = useState("");
  const [correoPrincipal, setCorreoPrincipal] = useState("");
  const [correoSecundario, setCorreoSecundario] = useState("");
  const [telefonoPrincipal, setTelefonoPrincipal] = useState("");
  const [telefonoSecundario, setTelefonoSecundario] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [arrayList, setArrayList] = useState([]);
  let responseValue = false;

  const getList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/specificAirlineByID";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            flightID: flightID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setArrayList(Object.values(result));
            console.log("result", result);

            setAerolinea(result?.nombre);
            setCodigo(result?.codigo);
            setCorreoPrincipal(result?.correo);
            setCorreoSecundario(result?.correo_secundario);
            setTelefonoPrincipal(result?.telefono);
            setTelefonoSecundario(result?.telefono_secundario);
            setPais(result?.pais);
            setCiudad(result?.ciudad);


            if (result?.[0]?.["status"] === 400) {
              console.log("entro");
            } else {
            }
          })
        );
      } catch (error) {
        console.error("Error geting user", error);

        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const registerAirlines = () => {
    const fetchData = async () => {
      try {
        const url = "/api/updateAirline";
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
            flightID: flightID
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
    registerAirlines();
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
          <StandardInputV2
            setValue={setAerolinea}
            labelText="Aerolínea"
            placeholderText={aerolinea}
          />
          <StandardInputV2 
          setValue={setCodigo} 
          labelText="Código"
          placeholderText={codigo} 
          />
        </div>
        <span className={styles.titleText}>Contacto</span>
        <div className={styles.inputsList}>
          <StandardInputV2
            setValue={setCorreoPrincipal}
            labelText="Correo principal"
            placeholderText={correoPrincipal}
          />
          <StandardInputV2
            setValue={setCorreoSecundario}
            labelText="Correo secundario"
            placeholderText={correoSecundario}
          />
          <StandardInputV2
            setValue={setTelefonoPrincipal}
            labelText="Teléfono principal"
            placeholderText={telefonoPrincipal}
          />
          <StandardInputV2
            setValue={setTelefonoSecundario}
            labelText="Teléfono secundario"
            placeholderText={telefonoSecundario}
          />
        </div>
        <span className={styles.titleText}>Localización</span>
        <div className={styles.inputsList}>
          <StandardInputV2 
          setValue={setPais} 
          labelText="Pais" 
          placeholderText={pais}
          />
          <StandardInputV2
          setValue={setCiudad} 
          labelText="Ciudad" 
          placeholderText={ciudad}
          />
        </div>
      </div>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => continueButton()}
          buttonText="Registrar"
        />
      </div>
    </main>
  );
};

export default RegisterAirline;
