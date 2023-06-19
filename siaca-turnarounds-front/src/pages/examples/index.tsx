import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useMediaQuery } from "@mui/material";
const inter = Inter({ subsets: ["latin"] });
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';


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
    <main>
      <div>
        <AddHomeWorkIcon htmlColor="#00A75D"/>
        pantalla de login
        <button>llamada API</button>
      </div>
      <div className="clase1">
        <h1>Maquinarias</h1>
        {maquinarias.length > 0 ? (
          <div>
            {maquinarias.map((maquinaria: MaquinariaData) => (
              <div key={maquinaria.id}>
                {maquinaria.modelo}
                {maquinaria.combustible}
              {maquinaria.identificador}</div>
            ))}
          </div>
        ) : (
          <div>No data</div>
        )}
      </div>
      {isMobile? (<>esto solo sale mobile</>):(<>esto solo sale desktop</>)}
      {isMobile && <><br/>esto solo sale mobile y no hay un else <AcUnitIcon/></>}
    </main>
  );
}