import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { makeStyles, useMediaQuery } from "@mui/material";
const inter = Inter({ subsets: ["latin"] });
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import styles from "./index.style.module.css";
import LoginMainPage from "../components/login/loginMainPage"
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
  useEffect( () => {
    const fetchData = async () => {
    try {
      const url = "/api/maquinaria";
      const response = await fetch(url);
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
  }
  fetchData().catch(console.error);
}, []); // If nothing on dependencies, this will run only first render

  return (
    <main className={styles.main}>
      <div>
        <LoginMainPage/>
      </div>
    </main>
  );
}