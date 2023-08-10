import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./RegisterMachine.style.module.css";
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
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import DropdownMenu from "@/components/Reusables/DropdownMenu";

interface PageProps {
  setStep: (value: number) => void;
}

const RegisterMachine: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const [identificador, setIdentificador] = useState("");
  const [modelo, setModelo] = useState("");
  const [combustible, setCombustible] = useState("");
  const [estado, setEstado] = useState("");
  const [imagen, setImagen] = useState("");
  const [fkcategoria, setFkCategoria] = useState("");
  const [arrayList, setArrayList] = useState([]);

  let responseValue = false;
  

  const registerMachines = () => {
    const fetchData = async () => {
      try {
        const url = "/api/registerMachine";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            identificador: identificador,
            modelo: modelo,
            combustible: combustible,
            estado: estado,
            fk_categoria: fkcategoria,
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

    registerMachines();

 
  };

  const category = (id : number) => {

    setFkCategoria(id.toString())

 
  };

  const state = (id : number) => {

    setEstado(id.toString())

 
  };

  const fuel = (id : number) => {

    setCombustible(fuelArray[id].name)

 
  };

  return (
    <main className={styles.RegisterMachineContainer}>
      <div className={styles.machinesListContainer}>
        <span className={styles.titleText}>Imagen</span>
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
          <StandardInput setValue={setIdentificador} inputText="Identificador" />
          <StandardInput setValue={setModelo} inputText="Modelo" />
                              <DropdownMenu
                            buttonText={"Combustible"}
                            optionsArray={fuelArray}
                            executableOptionClickFunction={(
                            optionValue: number
                              
                            ) =>
                             fuel(optionValue)                              
                            }
                          />   

                    <DropdownMenu
                            buttonText={"Estado"}
                            optionsArray={stateArray}
                            executableOptionClickFunction={(
                            optionValue: number
                              
                            ) =>
                             state(optionValue)                              
                            }
                          />    
          <DropdownMenu
                            buttonText={"Categorias"}
                            optionsArray={categoryArray}
                            executableOptionClickFunction={(
                            optionValue: number
                              
                            ) =>
                             category(optionValue)                              
                            }
                          />          
        </div>
      </div>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => continueButton()}
          buttonText="Registrar"
          disabled={
            identificador === "" ||
            modelo === "" ||
            combustible === "" ||
            estado === "" ||
            fkcategoria === ""
          }
        />
      </div>
    </main>
  );
};

export default RegisterMachine;

let categoryArray: any = [
  {
    "key": 1,
    "name": "Aguas servidas"
},
{
    "key": 2,
    "name": "Tractor de arrastre"
},
{
    "key": 3,
    "name": "Escalera"
},
{
    "key": 4,
    "name": "Cinta transportadora"
},
{
    "key": 5,
    "name": "Loader"
},
{
    "key": 6,
    "name": "Tractor de empuje"
},
{
    "key": 7,
    "name": "Aire acondicionado"
},
{
    "key": 8,
    "name": "Planta neumática"
},
{
    "key": 9,
    "name": "GPU Planta eléctrica"
}
];

let stateArray: any = [
  {
    "key": 0,
    "name": "No Operativo"
},
{
    "key": 1,
    "name": "Operativo"
}
];

let fuelArray: any = [
  {
    "key": 1,
    "name": "Gasolina"
},
{
    "key": 2,
    "name": "Diesel"
},
{
    "key": 3,
    "name": "Electrico"
},
{
    "key": 4,
    "name": "Otro"
}
];


