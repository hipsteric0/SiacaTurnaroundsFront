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
import BackArrow from "@/components/Reusables/BackArrow";

import LoadingScreen from "../../Reusables/LoadingScreen";

interface PageProps {
  setStep: (value: number) => void;
}

const RegisterMachine: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen

  useEffect(() => {
    getList();
  }, []);

  const [arrayList3, setArrayList3] = useState([]);
  const [identificador, setIdentificador] = useState("");
  const [modelo, setModelo] = useState("");
  const [combustible, setCombustible] = useState("");
  const [estado, setEstado] = useState("");
  const [imagen, setImagen] = useState(null);
  const [fkcategoria, setFkCategoria] = useState("");
  const [arrayList, setArrayList] = useState([]);
  const [stringValue, setStringValue] = useState("");
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  let responseValue = false;

  const formatMachinesList = async (result: any[]) => {
    if (machinesOptionsArray.length === 0) {
      result?.map((index: any) => {
        machinesOptionsArray.push({
          key: index?.id,
          name: index?.nombre,
        });
      });
    }
  };

  const getList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/machineCategories";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setArrayList3(Object.values(result));
            formatMachinesList(Object.values(result));
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

  const newMachine = () => {
    const uploadData = new FormData();

    uploadData.append("identificador", identificador);
    uploadData.append("modelo", modelo);
    uploadData.append("combustible", combustible);
    uploadData.append("fk_categoria", fkcategoria);
    uploadData.append("estado", estado);

    // Agregar el campo "imagen" solo si hay una imagen seleccionada
    if (imagen !== null) {
      uploadData.append("imagen", imagen);
    }

    fetch(
      "https://testing.siaca.aero/django/maquinarias/?token=" +
        localStorage.getItem("userToken"),
      {
        method: "POST",
        body: uploadData,
      }
    )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const continueButton = () => {
    setLoading(true);
    newMachine();
    router.reload();
  };

  const category = (id: number) => {
    setFkCategoria(id.toString());
  };

  const state = (id: number) => {
    setEstado(id.toString());
  };

  const fuel = (id: number) => {
    setCombustible(fuelArray[id]?.name);
  };

  const subirArchivo = (e: any) => {
    setImagen(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

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
          <input
            type="file"
            name="Archivos"
            onChange={(e: any) => subirArchivo(e)}
          />
          {preview && (
            <div>
              <center>
                <img src={preview} alt="Preview" width={200} height={200} />
              </center>
            </div>
          )}

          {/*          <div className={styles.uploadContainer}>
            <DriveFolderUploadRoundedIcon fontSize="inherit" />
            <div className={styles.uploadCancelButtons}>
              <FileUploadRoundedIcon htmlColor="#08a75a" />
              <CloseRoundedIcon htmlColor="red" />
            </div>
        </div> */}
        </div>
        <span className={styles.titleTextDates}>Datos</span>
        <div className={styles.inputsList}>
          <StandardInput
            setValue={setIdentificador}
            inputText="Identificador"
          />
          <StandardInput setValue={setModelo} inputText="Modelo" />
          <DropdownMenu
            buttonText={"Combustible"}
            optionsArray={fuelArray}
            executableOptionClickFunction={(optionValue: number) =>
              fuel(optionValue)
            }
            setStringValue={setStringValue}
          />

          <DropdownMenu
            buttonText={"Estado"}
            optionsArray={stateArray}
            executableOptionClickFunction={(optionValue: number) =>
              state(optionValue)
            }
            setStringValue={setStringValue}
          />
          <DropdownMenu
            buttonText={"Categorias"}
            optionsArray={machinesOptionsArray}
            executableOptionClickFunction={(optionValue: number) =>
              category(optionValue)
            }
            setStringValue={setStringValue}
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
        {loading && <LoadingScreen />}
      </div>
    </main>
  );
};

export default RegisterMachine;

let machinesOptionsArray: any = [];

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
    key: 0,
    name: "Gasolina",
  },
  {
    key: 1,
    name: "Diesel",
  },
  {
    key: 2,
    name: "Electrico",
  },
  {
    key: 3,
    name: "Otro",
  },
];
