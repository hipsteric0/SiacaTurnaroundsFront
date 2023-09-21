import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./EditCity.style.module.css";
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
interface PageProps {
  setStep: (value: number) => void;
  cityID : number;
}

const RegisterCity: React.FC<PageProps> = ({ setStep , cityID}) => {

  useEffect(() => {
    getList();
  }, []);

  //if token exists show regular html else show not signed in screen
  const [aeropuerto, setAeropuerto] = useState("");
  const [codigoIATA, setCodigoIATA] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoOACI, setCodigoOACI] = useState("");
  const [pais, setPais] = useState("");
  const [arrayList, setArrayList] = useState([]);


  let responseValue = false;


  const getList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/specificCityByID";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            cityID: cityID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setArrayList(Object.values(result));
            console.log("result", result);

            setCodigoIATA(result?.codigo);
            setCodigoOACI(result?.codigo_oaci);
            setAeropuerto(result?.aeropuerto);
            setPais(result?.pais);
            setCiudad(result?.nombre);


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

  const registerCities = () => {
    const fetchData = async () => {
      try {
        const url = "/api/updateCity";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            codigo: codigoIATA,
            codigo_oaci: codigoOACI,
            nombre: ciudad,
            pais: pais,
            aeropuerto: aeropuerto,
            cityID: cityID,
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
      <div className={styles.airlinesListContainer}>
        <span className={styles.titleText}>Codigos</span>
        <div className={styles.inputsList}>
          <StandardInputV2
            setValue={setCodigoIATA}
            labelText="IATA"
            placeholderText={codigoIATA}
          />
          <StandardInputV2
            setValue={setCodigoOACI}
            labelText="OACI"
            placeholderText={codigoOACI}
          />
        </div>
        <span className={styles.titleText}>Datos</span>
        <div className={styles.inputsList}>
          <StandardInputV2
            setValue={setCiudad}
            labelText="Ciudad"
            placeholderText={ciudad}
          />
          <StandardInputV2
            setValue={setPais}
            labelText="País"
            placeholderText={pais}
          />
          <StandardInputV2
            setValue={setAeropuerto}
            labelText="Aeropuerto"
            placeholderText={aeropuerto}
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

export default RegisterCity;


