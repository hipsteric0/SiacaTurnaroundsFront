import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./MachinesMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Table, Spacer } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Dropdown } from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { Collapse, Text } from "@nextui-org/react";
import { Card, Image } from "@nextui-org/react";
import RedButton from "../Reusables/RedButton";

interface PageProps {
  setStep: (value: number) => void;
}

const MachinesMainPage: React.FC = () => {
  //if token exists show regular html else show not signed in screen

  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState([]);
  const [arrayFilteredList3, setArrayFilteredList3] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/machinesList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log(result);
            console.log("values", Object.values(result));

            setArrayList3(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const changeMachineryState = async (machineID: number) => {
    const fetchData = async () => {
      try {
        const url = "/api/changeMachineState";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            machineId: machineID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log(result);
            router.reload();
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const arrayPrinter = (category: string) => {
    let y: any = [];
    let arrayAux: any = [];
    arrayAux = arrayList3.filter((user) => {
      console.log(
        'user["fk_categoria"]["nombre"]',
        user["fk_categoria"]["nombre"]
      );
      let aux: string = user["fk_categoria"]["nombre"] || undefined;
      return aux.trim().toUpperCase() === category.toUpperCase();
    });
    arrayAux.map((index: any) => {
      console.log("index", index);
      y[index.id] = (
        <div className={styles.machinescard} key={index.id}>
          <h3 className={styles.cardTitle}>{index.identificador}</h3>
          <p className={styles.cardText}>MODELO: {index.modelo}</p>
          <p className={styles.cardText}>COMBUSTIBLE: {index.combustible}</p>
          <div className={styles.cardText}>
            ESTADO:{" "}
            {index.estado ? (
              <span className={styles.greenText}>OPERATIVO</span>
            ) : (
              <span className={styles.redText}>NO OPERATIVO</span>
            )}{" "}
          </div>
          {index.estado ? (
            <div className={styles.buttonCenterer}>
              <RedButton
                executableFunction={() => changeMachineryState(index.id)}
                buttonText="Cambiar estado a NO OPERATIVO"
              />
            </div>
          ) : (
            <div className={styles.buttonCenterer}>
              <GreenButton
                executableFunction={() => changeMachineryState(index.id)}
                buttonText="Cambiar estado a OPERATIVO"
              />
            </div>
          )}
        </div>
      );
    });

    return y;
  };

  return (
    <main className={styles.containerMachineMainPage}>
      <div className={styles.createMachineButton}>
        <GreenButton
          executableFunction={() => undefined}
          buttonText="Crear maquinaria"
        />
      </div>
      <Spacer />
      <div className={styles.machineListContainer}>
        <Collapse.Group>
          <Collapse title="Aguas Servidas">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Aguas Servidas")}
            </div>
          </Collapse>
          <Collapse title="Tractor de arrastre">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Tractor de arrastre")}
            </div>
          </Collapse>
          <Collapse title="Escalera">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Escalera")}
            </div>
          </Collapse>
          <Collapse title="Cinta Transportadora">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Cinta Transportadora")}
            </div>
          </Collapse>
          <Collapse title="Loader">
            <div className={styles.machinesgrid}>{arrayPrinter("Loader")}</div>
          </Collapse>
          <Collapse title="Tractor de empuje">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Tractor de empuje")}
            </div>
          </Collapse>
          <Collapse title="Aire acondicionado">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Aire acondicionado")}
            </div>
          </Collapse>
          <Collapse title="Planta neumática">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Planta neumática")}
            </div>
          </Collapse>
          <Collapse title="GPU Planta eléctrica">
            <div className={styles.machinesgrid}>
              {arrayPrinter("GPU Planta eléctrica")}
            </div>
          </Collapse>
        </Collapse.Group>
      </div>
    </main>
  );
};

export default MachinesMainPage;
