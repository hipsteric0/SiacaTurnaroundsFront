import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./EditMachine.style.module.css";
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
import StandardInputV2 from "@/components/Reusables/StandardInputV2";
import BackArrow from "@/components/Reusables/BackArrow";

import LoadingScreen from "../../Reusables/LoadingScreen";

interface PageProps {
  setStep: (value: number) => void;
  machineID: number;
}

const RegisterMachine: React.FC<PageProps> = ({ setStep, machineID }) => {
  //if token exists show regular html else show not signed in screen

  useEffect(() => {
    getList();
  }, []);

  const [identificador, setIdentificador] = useState("");
  const [modelo, setModelo] = useState("");
  const [combustible, setCombustible] = useState("");
  const [estado, setEstado] = useState("");
  const [imagen, setImagen] = useState("");
  const [fkcategoria, setFkCategoria] = useState("");
  const [arrayList, setArrayList] = useState([]);

  const [loading, setLoading] = useState(false);

  let responseValue = false;
  //request que trae los datos de una maquinaria especifica por id
  const getList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/specificMachineByID";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            machineID: machineID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setArrayList(Object.values(result));

            setIdentificador(result?.identificador);
            setModelo(result?.modelo);
            setCombustible(result?.combustible);
            setEstado(result?.estado);
            setFkCategoria(result?.fkcategoria);
            setImagen(result?.imagen);

            if (result?.[0]?.["status"] === 400) {
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
  //request que hace un patch a la maquinaria,actualizando sus datos
  const registerMachines = () => {
    const fetchData = async () => {
      try {
        const url = "/api/updateMachine";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            identificador: identificador,
            modelo: modelo,
            userToken: localStorage.getItem("userToken"),
            machineID: machineID,
          }),
        };
        const response = await fetch(url, requestOptions).then((value) => {
          if (value?.status === 400) {
            responseValue = false;
          } else {
            responseValue = true;
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
  //manejador del boton de guardar
  const continueButton = () => {
    registerMachines();
    setLoading(true);
    router.reload();
  };
  //set la categoria seleccionada (no esta en uso)
  const category = (id: number) => {
    setFkCategoria(id.toString());
  };
  //set el estado seleccionado (no esta en uso)
  const state = (id: number) => {
    setEstado(id.toString());
  };
  //set el combustible seleccionado (no esta en uso)
  const fuel = (id: number) => {
    setCombustible(fuelArray[id].name);
  };
  //manejador del boton de atras
  const Back = () => {
    setLoading(true);
    router.reload();
  };

  return (
    <main className={styles.RegisterMachineContainer}>
      <div className={styles.backArrowIcon}>
        <BackArrow
          executableFunction={() => {
            Back();
          }}
        />
        {loading && <LoadingScreen />}
      </div>
      <div className={styles.machinesListContainer}>
        <span className={styles.titleTextImagen}>Imagen</span>
        <div className={styles.inputsListImage}>
          <div>
            <center>
              <img
                src={"https://testing.siaca.aero/django" + imagen}
                alt="Preview"
                width={300}
                height={300}
              />
            </center>
          </div>
        </div>
        <span className={styles.titleTextDates}>Datos</span>
        <div className={styles.inputsList}>
          <StandardInputV2
            setValue={setIdentificador}
            labelText="Identificador"
            placeholderText={identificador}
          />
          <StandardInputV2
            setValue={setModelo}
            labelText="Modelo"
            placeholderText={modelo}
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

export default RegisterMachine;

let categoryArray: any = [
  {
    key: 1,
    name: "Aguas servidas",
  },
  {
    key: 2,
    name: "Tractor de arrastre",
  },
  {
    key: 3,
    name: "Escalera",
  },
  {
    key: 4,
    name: "Cinta transportadora",
  },
  {
    key: 5,
    name: "Loader",
  },
  {
    key: 6,
    name: "Tractor de empuje",
  },
  {
    key: 7,
    name: "Aire acondicionado",
  },
  {
    key: 8,
    name: "Planta neumática",
  },
  {
    key: 9,
    name: "GPU Planta eléctrica",
  },
];

let stateArray: any = [
  {
    key: 0,
    name: "No Operativo",
  },
  {
    key: 1,
    name: "Operativo",
  },
];

let fuelArray: any = [
  {
    key: 1,
    name: "Gasolina",
  },
  {
    key: 2,
    name: "Diesel",
  },
  {
    key: 3,
    name: "Electrico",
  },
  {
    key: 4,
    name: "Otro",
  },
];
