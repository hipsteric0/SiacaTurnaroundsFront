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

import LoadingScreen from "../../Reusables/LoadingScreen";

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
  const [codigoOACI, setCodigoOACI] = useState("");
  const [correoPrincipal, setCorreoPrincipal] = useState("");
  const [correoSecundario, setCorreoSecundario] = useState("");
  const [telefonoPrincipal, setTelefonoPrincipal] = useState("");
  const [telefonoSecundario, setTelefonoSecundario] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [arrayList, setArrayList] = useState([]);
  let responseValue = false;

  const [preview, setPreview] = useState("");

  const [imagen, setImagen] = useState(null);

  const [loading, setLoading] = useState(false);

  //get aerolinea especifica por ID
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

            setAerolinea(result?.nombre);
            setCodigo(result?.codigo);
            setCorreoPrincipal(result?.correo);
            setCorreoSecundario(result?.correo_secundario);
            setTelefonoPrincipal(result?.telefono);
            setTelefonoSecundario(result?.telefono_secundario);
            setPais(result?.pais);
            setCiudad(result?.ciudad);
            setCodigoOACI(result?.codigo_OACI);

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

  //consulta para actualizar la aerolinea
  const updateAirline = async () => {
    const uploadData = new FormData();
    uploadData.append("nombre", aerolinea);
    uploadData.append("correo", correoPrincipal);
    uploadData.append("correo_secundario", correoSecundario);
    uploadData.append("telefono", telefonoPrincipal);
    uploadData.append("telefono_secundario", telefonoSecundario);
    uploadData.append("codigo", codigo);
    uploadData.append("pais", pais);
    uploadData.append("ciudad", ciudad);
    uploadData.append("codigo_OACI", codigoOACI);

    // Agregar el campo "imagen" solo si hay una imagen seleccionada
    if (imagen !== null) {
      uploadData.append("imagen", imagen);
    }

    await fetch(
      "https://testing.siaca.aero/django/aerolineas/" +
        flightID +
        "/?token=" +
        localStorage.getItem("userToken"),
      {
        method: "PATCH",
        body: uploadData,
      }
    )
      .then((res) => {
        console.log(res);
        router.reload();
      })
      .catch((error) => {
        console.log(error);
        router.reload();
      });
  };

  //manejar subir imagen
  const subirArchivo = (e: any) => {
    setImagen(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  //funcion para actualizar aerolinea
  const continueButton = () => {
    setLoading(true);
    updateAirline();
  };

  //volver a la pagina principal
  const Back = () => {
    setLoading(true);
    router.reload();
  };

  //html principal
  return (
    <main className={styles.RegisterAirlineContainer}>
      <div className={styles.backArrowIcon}>
        <BackArrow
          executableFunction={() => {
            Back();
          }}
        />
        {loading && <LoadingScreen />}
      </div>
      <div className={styles.airlinesListContainer}>
        <span className={styles.titleText}>Logo</span>
        <div className={styles.inputsListImage}>
          <input
            type="file"
            name="Archivos"
            onChange={(e: any) => subirArchivo(e)}
          />

          {preview && (
            <div>
              <center>
                <img src={preview} alt="Preview" width={300} height={300} />
              </center>
            </div>
          )}
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
            labelText="Código IATA"
            placeholderText={codigo}
          />
          <StandardInputV2
            setValue={setCodigoOACI}
            labelText="Código OACI"
            placeholderText={codigoOACI}
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
        {loading && <LoadingScreen />}
      </div>
    </main>
  );
};

export default RegisterAirline;
