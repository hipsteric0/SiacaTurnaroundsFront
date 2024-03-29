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
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import axios from 'axios';

import React, { useCallback} from 'react';
import { useDropzone } from 'react-dropzone';

import Image from 'next/image';
import BackArrow from "@/components/Reusables/BackArrow";


import LoadingScreen from '../../Reusables/LoadingScreen';



interface PageProps {
  setStep: (value: number) => void;
}

const RegisterAirline: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const [aerolinea, setAerolinea] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigoOACI, setCodigoOACI] = useState("");
  const [correoPrincipal, setCorreoPrincipal] = useState("");
  const [correoSecundario, setCorreoSecundario] = useState("");
  const [telefonoPrincipal, setTelefonoPrincipal] = useState("");
  const [telefonoSecundario, setTelefonoSecundario] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");

  const [preview, setPreview] = useState("");

  const [imagen, setImagen] = useState(null);
  
  const [loading, setLoading] = useState(false);

  let responseValue = false;

  const newAirline = () => {
    const uploadData = new FormData();
    uploadData.append('nombre', aerolinea);
    uploadData.append('correo', correoPrincipal);
    uploadData.append('correo_secundario', correoSecundario);
    uploadData.append('telefono', telefonoPrincipal);
    uploadData.append('telefono_secundario', telefonoSecundario);
    uploadData.append('codigo', codigo);
    uploadData.append('pais', pais);
    uploadData.append('ciudad', ciudad);
    uploadData.append('codigo_OACI', codigoOACI);
  
    // Agregar el campo "imagen" solo si hay una imagen seleccionada
    if (imagen !== null) {
      uploadData.append('imagen', imagen);
    }
  
    fetch('http://127.0.0.1:8000/aerolineas/?token='+localStorage.getItem("userToken"), {
      method: 'POST',
      body: uploadData
    })
    .then( res => console.log(res))
    .catch(error => console.log(error))
  };

  const continueButton = () => {

    newAirline();
    setLoading(true);
    router.reload();
 
  };


  const subirArchivo = (e: any) => {
    setImagen(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    console.log('Imagen', URL.createObjectURL(e.target.files[0]));
    console.log('Image', e.target.files[0]);
  };

  const Back = () => {
    setLoading(true);
    router.reload();
  };

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
          <input type="file" name="Archivos" onChange={(e : any)=>subirArchivo(e)}/>
          <div className={styles.uploadContainer}>
          
          {preview && (
        <div>
         <center><img src={preview} alt="Preview" width={300} height={300}/></center> 
        </div>
      )}
{/*           <DriveFolderUploadRoundedIcon fontSize="inherit" />
            <div className={styles.uploadCancelButtons}>
              <FileUploadRoundedIcon htmlColor="#08a75a"/>
              <CloseRoundedIcon htmlColor="red" />
          </div> */}
          </div>
        </div>
        <span className={styles.titleText}>Datos</span>
        <div className={styles.inputsList}>
          <StandardInput setValue={setAerolinea} inputText="Aerolínea" />
          <StandardInput setValue={setCodigo} inputText="Código IATA" />
          <StandardInput setValue={setCodigoOACI} inputText="Código OACI" />
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
            codigoOACI === "" ||
            correoPrincipal === "" ||
            correoSecundario === "" ||
            telefonoPrincipal === "" ||
            telefonoSecundario === "" ||
            pais === "" ||
            ciudad === ""
          }
          
        />
        {loading && <LoadingScreen />}
      </div>
    </main>
  );
};

export default RegisterAirline;


