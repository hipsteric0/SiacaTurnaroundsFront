import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./FlightsMainPageMobile.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router, { Router } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Table, Spacer } from "@nextui-org/react";
import { TableBody, Dialog } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Dropdown } from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { text } from "stream/consumers";
import Combobox from "../Reusables/Combobox";
import SiacaNavbar from "../Reusables/Navbar/SiacaNavbar";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RedButton2 from "../Reusables/RedButton2";
import GreenButton2 from "@/components/Reusables/GreenButton2";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface PageProps {
  setStep: (value: number) => void;
  setflightID: (value: number) => void;
}
//componente de la pagina principal de vuelos, solo mobile

const FlightsMainPage: React.FC<PageProps> = ({ setStep, setflightID }) => {
  //al entrar a la pagina consigue la fecha aactual
  useEffect(() => {
    getDateForCalendar();
  }, []);
  //al entrar a la pagina consigue la lista de vuelos
  useEffect(() => {
    getList();
  }, []);
  //al hacer login llega a esta pagina y setea el rol del usuario para esconder o mostrar cosas especificas de este
  useEffect(() => {
    let role = localStorage.getItem("userRole");
    if (role != null) {
      setRoleID(parseInt(role));
    }
  }, []);

  const [roleID, setRoleID] = useState(-1);
  const [arrayList3, setArrayList3] = useState([]);
  let date = new Date();
  const [arrayFilteredList3, setArrayFilteredList3] = useState([]);
  const [openCardMenu, setOpenCardMenu] = useState(-1);
  const [dateCounter, setdateCounter] = useState(0);
  const [dateState, setdateState] = useState("");
  const [hover, setHover] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDetailDialogID, setOpenDetailDialogID] = useState(false);
  const [hoverOptionValue, setHoverOptionValue] = useState(-1);
  const [isFilteredResults, setIsFilteredResults] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  let filterValues: any[] = [];
  //trae los vuelos y los setea en un arreglo de estados
  //si se filtra los arreglos se seteara mas tarde en un arreglo distinto
  const getList = async () => {
    setIsFilteredResults(false);
    setArrayFilteredList3([]);
    const fetchData = async () => {
      try {
        const url = "/api/flightsList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            day: date.getDate().toString(),
            month: (date.getMonth() + 1).toString(),
            year: date.getFullYear().toString(),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setArrayList3(Object.values(result));
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

  //consigue la fecha para de hoy el calendario
  const getDateForCalendar = () => {
    let x =
      date.getDate().toString() +
      " - " +
      (date.getMonth() + 1).toString() +
      " - " +
      date.getFullYear().toString();
    setdateState(x);
    return <></>;
  };

  //funcion de boton de atras del calendario, convierte la fecha a un dia atras del que esta actualmente
  const backDateButton = async () => {
    await setdateCounter(dateCounter - 1);
    date = new Date(new Date().setDate(new Date().getDate() + dateCounter - 1));
    getDateForCalendar();
    getList();
  };

  //funcion de boton de adelante del calendario, convierte la fecha a un dia siguiente del que esta actualmente
  const frontDateButton = async () => {
    await setdateCounter(dateCounter + 1);
    date = new Date(new Date().setDate(new Date().getDate() + dateCounter + 1));
    getDateForCalendar();
    getList();
  };

  //borra el vuelo9, turnaround asignaciones y todo lo asociado a este
  const flightMachine = async (flightID: number) => {
    const fetchData = async () => {
      try {
        const url = "/api/deleteFlight";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            flightId: flightID,
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

  //funcion para manejar borra vuelo
  const handleDeleteFlight = async (flightID: number) => {
    flightMachine(flightID);
  };

  //funcion para editar vuelo
  const handleEditFlight = async (flightID: number) => {
    await setflightID(flightID);
    await setStep(2);
  };

  //devuelve html dinamico con las tarjetas de los vuelos
  //las tarjetas contienen un dialogo que se abre cuando se hace click en ver mas
  //el dialogo tiene todos los datos especificos al vuelo cliqueado y un embebido de adbs exchange
  //cambiar el icaohex en el vuelo cambia el embebido a apuntar al vuelo especifico
  const arrayPrinter = () => {
    let y: any = [];
    let arrayList3aux: any = [];

    isFilteredResults
      ? (arrayList3aux = arrayFilteredList3)
      : (arrayList3aux = arrayList3);
    arrayList3aux.map((index: any) => {
      let aux = arrayList3[index.id];
      if (openDetailDialogID === index.id) {
      }
      y[index.id] = (
        <div
          key={index.id}
          className={styles.tableInfoRow}
          onClick={() => {
            setOpenDetailDialogID(index.id);
            if (openDetailDialog == false) {
              setOpenDetailDialog(true);
            }
          }}
        >
          <div className={styles.menuContainer}>
            {openDetailDialogID === index?.id && (
              <Dialog
                open={openDetailDialog}
                onClose={() => setOpenDetailDialog(false)}
                className={styles.detailDialog}
                fullScreen={true}
              >
                <div className={styles.dialogDetail}>
                  <div
                    className={styles.closeIconDialog}
                    onClick={() => setOpenDetailDialog(false)}
                  >
                    <CloseRoundedIcon htmlColor="#4d4e56" />
                  </div>
                  <div className={styles.detailDialogInfoContainer}>
                    <p className={styles.detailDialogInfoContainerTitleText}>
                      Datos de vuelo
                    </p>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Tipo de servicio:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.tipo_servicio?.nombre}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          ICAO HEX:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {" "}
                          {index?.icao_hex === null
                            ? "Indefinido"
                            : index?.icao_hex}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          STN:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.stn?.codigo}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          CARRIER:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.fk_aerolinea?.nombre}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Charges Payable By:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.ente_pagador}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          No.:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.id}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Routing:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.lugar_salida?.codigo}/
                          {index?.lugar_destino?.codigo}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Tipo de vuelo:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.tipo_vuelo?.nombre}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Flight No.:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.numero_vuelo}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Gate/Gate:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.gate}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          A/C Reg:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.ac_reg}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          A/C Type:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.ac_type}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          ETA:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.ETA}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          ATA:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.ATA === null ? "Indefinido" : index?.ATA}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Fecha llegada:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.ETA_fecha}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          ETD:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.ETD}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          ATD:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.ATD === null ? "Indefinido" : index?.ATD}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Fecha salida:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.ETD_fecha}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle2}>
                          PLANTILLA:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText2}>
                          {index?.fk_plantilla?.titulo}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <iframe
                      src={
                        index?.icao_hex === null
                          ? "https://globe.adsbexchange.com/?airport=SVMI"
                          : "https://globe.adsbexchange.com/?icao=" +
                            index?.icao_hex
                      }
                      frameborder="0"
                      className={styles.flightIframe}
                    ></iframe>
                  </div>
                  <div className={styles.redButtonContainer}>
                    <div className={styles.redButton}>
                      <RedButton2
                        executableFunction={() => {
                          setOpenDetailDialog(false);
                        }}
                        buttonText={"Cerrar"}
                      />
                    </div>
                  </div>
                </div>
              </Dialog>
            )}
            {openCardMenu === index.id && (
              <div className={styles.menuAppearingContainer}>
                <Dialog
                  className={styles.dialogDelete}
                  open={deleteDialog}
                  onClose={() => setDeleteDialog(false)}
                >
                  <div className={styles.dialogBack}>
                    <div className={styles.dialogText}>
                      <div className={styles.warningIcon}>
                        <WarningAmberIcon color="warning" fontSize="inherit" />
                      </div>
                      <p>
                        <strong>
                          ¿Está seguro que desea eliminar este vuelo{" "}
                          {index.numero_vuelo}?
                        </strong>
                      </p>
                      <div className={styles.dialogButtons}>
                        <GreenButton2
                          executableFunction={() => {
                            handleDeleteFlight(index.id);
                          }}
                          buttonText="Si"
                        />
                        <RedButton2
                          executableFunction={() => {
                            setDeleteDialog(false);
                          }}
                          buttonText="No"
                        />
                      </div>
                    </div>
                  </div>
                </Dialog>

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
                    onClick={() => {
                      handleEditFlight(index.id);
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
                    onClick={() => setDeleteDialog(true)}
                  >
                    Eliminar
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.imageContainer}>
            <img
              src={
                "https://testing.siaca.aero/django/" +
                index?.fk_aerolinea?.imagen
              }
              alt="Logo"
              width={80}
              height={60}
            />
          </div>
          <div className={styles.column1Container}>
            <p>Vuelo:</p>
            <p>REG:</p>
            <p>Estado:</p>
          </div>
          <div className={styles.column2Container}>
            <p>{index?.numero_vuelo}</p>
            <p>{index?.ac_reg}</p>
            <p
              className={
                index?.estado == "Atendido"
                  ? styles.greenTextCol2
                  : index?.estado == "En proceso"
                  ? styles.yellowTextCol2
                  : index?.estado == "No ha llegado"
                  ? styles.redTextCol2
                  : undefined
              }
            >
              {index?.estado}
            </p>
          </div>
          <div className={styles.column3Container}>
            <div className={styles.column3Icon}>
              <FlightLandIcon />
            </div>

            <p>
              {index?.lugar_salida?.codigo}-{index?.lugar_destino?.codigo}
            </p>
          </div>
          <div className={styles.column4Container}>
            <p>{index?.ETA}</p>
          </div>
        </div>
      );
    });
    setFilterValues();
    return y;
  };

  //funcion que filtra el arreglo
  const setFilterValues = () => {
    arrayList3.map((value: any) => {
      if (filterValues.indexOf(value?.fk_aerolinea?.nombre)) {
        filterValues.push(value?.fk_aerolinea?.nombre);
      }
    });
  };

  const filterArray = (filtername: string) => {
    let filteredUsers = arrayList3.filter((user) => {
      return user["fk_aerolinea"]["nombre"] === filtername;
    });
    setArrayFilteredList3(filteredUsers);
  };

  //html principal
  return (
    <main className={styles.mainFlightsContainer}>
      <div className={styles.upperSection}>
        <div className={styles.calendarAndFilterContainer}>
          <div className={styles.calendarContainer}>
            <div className={styles.pointer}>
              <KeyboardArrowLeftRoundedIcon
                onClick={() => {
                  backDateButton();
                }}
              />
            </div>
            <div className={styles.dateAndCalendarContainer}>
              <span>fecha {dateState}</span>
              <div className={styles.calendarIcon}>
                <CalendarTodayIcon htmlColor="#00a75d" />
              </div>
            </div>
            <div className={styles.pointer}>
              <KeyboardArrowRightRoundedIcon onClick={frontDateButton} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.flightsListContainer}>
        {arrayList3?.[0]?.["status"] != 400 ? arrayPrinter() : undefined}
      </div>
    </main>
  );
};

export default FlightsMainPage;
