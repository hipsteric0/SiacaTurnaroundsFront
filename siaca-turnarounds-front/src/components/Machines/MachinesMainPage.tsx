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
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface PageProps {
  setStep: (value: number) => void;
}

const MachinesMainPage: React.FC = () => {
  //if token exists show regular html else show not signed in screen

  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [openCardMenu, setOpenCardMenu] = useState(-1);
  const [arrayList3, setArrayList3] = useState([]);
  const [hover, setHover] = useState(false);
  const [hoverOptionValue, setHoverOptionValue] = useState(-1);
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
      let aux: string = user["fk_categoria"]["nombre"] || undefined;
      return aux.trim().toUpperCase() === category.toUpperCase();
    });
    arrayAux.map((index: any) => {
      y[index.id] = (
        <div className={styles.machinescard} key={index.id}>
          <div className={styles.cardTitleAndIconContainer}>
            <h3 className={styles.cardTitle}>{index.identificador}</h3>
            <div className={styles.menuContainer}>
              {openCardMenu === index.id && (
                <div className={styles.menuAppearingContainer}>
                  <div className={styles.menuAppearingContainerRow}>
                    <p
                      className={
                        hover && 1 === hoverOptionValue
                          ? styles.optionsTextHover
                          : styles.optionsText
                      }
                      onMouseEnter={() => {
                        setHoverOptionValue(1);
                        setHover(true);
                      }}
                      onMouseLeave={() => {
                        setHoverOptionValue(-1);
                        setHover(false);
                      }}
                    >
                      Editar
                    </p>
                  </div>
                  <div className={styles.menuAppearingContainerRow}>
                    <p
                      className={
                        hover && 2 === hoverOptionValue
                          ? styles.optionsTextHover
                          : styles.optionsText
                      }
                      onMouseEnter={() => {
                        setHoverOptionValue(2);
                        setHover(true);
                      }}
                      onMouseLeave={() => {
                        setHoverOptionValue(-1);
                        setHover(false);
                      }}
                    >
                      Eliminar
                    </p>
                  </div>
                </div>
              )}
              <div
                className={styles.pointer}
                onClick={
                  openCardMenu === -1
                    ? () => setOpenCardMenu(index.id)
                    : openCardMenu === index.id
                    ? () => setOpenCardMenu(-1)
                    : () => setOpenCardMenu(index.id)
                }
              >
                <MoreVertIcon />
              </div>
            </div>
          </div>

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
        <Collapse.Group id="group">
          <Collapse title="Aguas Servidas" id="Aguas Servidas">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Aguas Servidas")}
            </div>
          </Collapse>
          <Collapse title="Tractor de arrastre" id="1">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Tractor de arrastre")}
            </div>
          </Collapse>
          <Collapse title="Escalera" id="2">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Escalera")}
            </div>
          </Collapse>
          <Collapse title="Cinta Transportadora" id="3">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Cinta Transportadora")}
            </div>
          </Collapse>
          <Collapse title="Loader" id="4">
            <div className={styles.machinesgrid}>{arrayPrinter("Loader")}</div>
          </Collapse>
          <Collapse title="Tractor de empuje" id="5">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Tractor de empuje")}
            </div>
          </Collapse>
          <Collapse title="Aire acondicionado" id="6">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Aire acondicionado")}
            </div>
          </Collapse>
          <Collapse title="Planta neumática" id="7">
            <div className={styles.machinesgrid}>
              {arrayPrinter("Planta neumática")}
            </div>
          </Collapse>
          <Collapse title="GPU Planta eléctrica" id="8">
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
