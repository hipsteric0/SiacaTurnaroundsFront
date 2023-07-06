import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { makeStyles, useMediaQuery } from "@mui/material";
const inter = Inter({ subsets: ["latin"] });
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import styles from "./index.style.module.css";
import RecoverPasswordStep1 from "@/components/login/recoverPassword/RecoverPasswordStep1";
import RecoverPasswordStep2 from "@/components/login/recoverPassword/RecoverPasswordStep2";
import RecoverPasswordStep3 from "@/components/login/recoverPassword/RecoverPasswordStep3";
import RegisterStep1 from "@/components/login/register/RegisterStep1";
import RegisterStep2 from "@/components/login/register/RegisterStep2";
import LoginMainPage from "@/components/login/loginMainPage";
import RegisterStep3 from "@/components/login/register/RegisterStep3";
type MaquinariaData = {
  id: number;
  identificador: string;
  modelo: string;
  combustible: string;
  estado: string;
  categoria: string;
  imagen: string;
};
type MaquinariaResponse = {
  mensaje: string;
  maquinarias: MaquinariaData[];
};

const intialMaquinarias: MaquinariaData[] = [];

export default function Home() {
  const [maquinarias, setMaquinarias] =
    useState<MaquinariaData[]>(intialMaquinarias);
  const isMobile = useMediaQuery("(max-width: 1270px)");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/maquinaria";
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "React POST Request Example" }),
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Error in response getting maquinarias");
        }
        // Get and parse JSON response
        const responseJson = (await response.json()) as MaquinariaResponse;

        // Get maquinarias from JSON response
        const { maquinarias: obtainedMaquinarias } = responseJson; //This is equivalent to "const obtainedMaquinarias = responseJson.maquinarias"

        // Update maquinarias state
        setMaquinarias(obtainedMaquinarias);
      } catch (error) {
        console.error("Error fetching maquinarias", error);
        return;
      }
    };
    fetchData().catch(console.error);
  }, []); // If nothing on dependencies, this will run only first render

  const [step, setStep] = useState(0);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  return (
    <main className={styles.main}>
      {
        step === 0 && (
          <>
            <LoginMainPage setStep={setStep} />
          </>
        ) /*el step 0 es la pagina principal del login*/
      }
      {
        step === 1 && (
          <>
            <RecoverPasswordStep1 setStep={setStep} />
          </>
        ) /*el step 1 es el paso 1 de recuperar contrasena*/
      }
      {
        step === 2 && (
          <>
            <RecoverPasswordStep2 setStep={setStep} />
          </>
        ) /*el step 2 es el paso 2 de recuperar contrasena*/
      }
      {
        step === 3 && (
          <>
            <RecoverPasswordStep3 setStep={setStep} />
          </>
        ) /*el step 3 es el paso 3 de recuperar contrasena*/
      }
      {
        step === 4 && (
          <>
            <RegisterStep1
              setStep={setStep}
              setEmailValue={setEmailValue}
              setPasswordValue={setPasswordValue}
            />
          </>
        ) /*el step 4 es el paso 1 de registrarse*/
      }
      {
        step === 5 && (
          <>
            <RegisterStep2
              setStep={setStep}
              emailValue={emailValue}
              passwordValue={passwordValue}
            />
          </>
        ) /*el step 5 es el paso 2 de registrarse*/
      }
      {
        step === 6 && (
          <>
            <RegisterStep3 />
          </>
        ) /*el step 6 es el paso 3 de registrarse*/
      }
    </main>
  );
}
