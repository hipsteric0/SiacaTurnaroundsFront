import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./CreateFlightMainPage.style.module.css";
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
import { text } from "stream/consumers";
import BackArrow from "@/components/Reusables/BackArrow";
import DropdownMenu from "@/components/Reusables/DropdownMenu";
import StandardInput from "@/components/Reusables/StandardInput";
import RedButton from "@/components/Reusables/RedButton";
import { Suspense } from "react";

interface PageProps {
  setStep: (value: number) => void;

}

const CreateFlightMainPage: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [DestinationCitiesArrayList, setDestinationCitiesArrayList] = useState(
    []
  );
  const [DepartureCitiesArrayList, setDepartureCitiesArrayList] = useState([]);
  const [AirlinesArrayList, setAirlinesArrayList] = useState([]);
  const [FlightTypesList, setFlightTypesList] = useState([]);

  const [STN, setSTN] = useState("");
  const [Carrier, setCarrier] = useState(0);
  const [ChargesPayableBy, setChargesPayableBy] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [ACreg, setACreg] = useState("");
  const [ACtype, setACtype] = useState("");
  const [gate, setGate] = useState("");
  const [ETA, setETA] = useState("");
  const [dateETA, setdateETA] = useState("");
  const [ETD, setETD] = useState("");
  const [dateETD, setdateETD] = useState("");
  const [routing1, setRouting1] = useState(0);
  const [routing2, setRouting2] = useState(0);
  const [flightType, setflightType] = useState(0);
  const [recurrentFlight, setrecurrentFlight] = useState(false);
  const [clickedRecurrentFlight, setclickedRecurrentFlight] = useState(false);
  const [templateValue, setTemplateValue] = useState(0);
  const [recurrentStartDate, setrecurrentStartDate] = useState("");
  const [recurrentEndDate, setrecurrentEndDate] = useState("");
  const [recurrentMonday, setrecurrentMonday] = useState(false);
  const [recurrentTuesday, setrecurrentTuesday] = useState(false);
  const [recurrentWednesday, setrecurrentWednesday] = useState(false);
  const [recurrentThursday, setrecurrentThursday] = useState(false);
  const [recurrentFriday, setrecurrentFriday] = useState(false);
  const [recurrentSaturday, setrecurrentSaturday] = useState(false);
  const [recurrentSunday, setrecurrentSunday] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getcitiesListDestination();
      await getcitiesListDeparture();
      await getAirlinesList();
      await getFlightTypesList();
      await getTemplatesList();
    };
    fetchData().catch(console.error);
  }, []);

  const registerTurnaround = async (
    fecha_inicioValue: string,
    hora_inicioValue: string,
    fk_vueloValue: number,
    fk_codigos_demoraValue: number
  ) => {
    const fetchData = async () => {
      try {
        const url = "/api/createTurnaround";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            fecha_inicio: fecha_inicioValue,
            hora_inicio: hora_inicioValue,
            fk_vuelo: fk_vueloValue,
            fk_codigos_demora: fk_codigos_demoraValue,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then(async (result) => {
            console.log("registerTrunaround", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const registerFlight = async (ETADateValue: string) => {
    const fetchData = async () => {
      try {
        const url = "/api/createFlight";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            ac_reg: ACreg,
            ac_type: ACtype,
            estado: "No ha llegado",
            ente_pagador: ChargesPayableBy,
            numero_vuelo: flightNumber,
            ETA: ETA,
            ETD: ETD,
            ETA_fecha: ETADateValue,
            ETD_fecha: dateETD,
            gate: gate,
            fk_aerolinea: Carrier,
            fk_plantilla: templateValue,
            stn: STN,
            lugar_salida: routing1,
            lugar_destino: routing2,
            tipo_vuelo: flightType,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then(async (result) => {
            console.log("registerFlight", result);
            registerTurnaround(result?.ETA_fecha, result?.ETA, result?.id, 1);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const setTemplatesForDropdown = async (TemplatesListArray: []) => {
    TemplatesListArray.map((index: any) => {
      console.log("indexx", index.id);
      templatesOptionsArray.push({
        key: index.id,
        name: index.titulo,
      });
    });
    console.log("templatesOptionsArray", templatesOptionsArray);
  };
  const getTemplatesList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/templatesList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then(async (result) => {
            console.log("getTemplatesList", Object.values(result));
            await setFlightTypesList(Object.values(result));

            await setTemplatesForDropdown(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const setFlightTypesForDropdown = async (flightTypesListArray: []) => {
    flightTypesListArray.map((index: any) => {
      console.log("index", index.id);
      flightTypesOptionsArray.push({
        key: index.id,
        name: index.nombre,
      });
    });
  };
  const getFlightTypesList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/flightTypesList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then(async (result) => {
            console.log("flightTypesList", Object.values(result));
            await setFlightTypesList(Object.values(result));

            await setFlightTypesForDropdown(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const setAirlinesForDropdown = async (airlinesArray: []) => {
    await airlinesArray.map((index: any) => {
      console.log("index", index.id);
      airlinesOptionsArray.push({
        key: index.id,
        name: index.nombre,
      });
    });
  };
  const getAirlinesList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/airlinesList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then(async (result) => {
            console.log("getAirlinesList", Object.values(result));
            await setAirlinesArrayList(Object.values(result));
            await setAirlinesForDropdown(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const setCitiesListDepartureForDropdown = async (citiesListArray: []) => {
    citiesListArray.map((index: any) => {
      console.log("index", index.id);
      CitiesOptionsArray.push({
        key: index.id,
        name: index.nombre,
      });
    });
  };
  const getcitiesListDeparture = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/citiesListDestination";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("getcitiesListDeparture", Object.values(result));
            setDepartureCitiesArrayList(Object.values(result));
            setCitiesListDepartureForDropdown(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const setCitiesListDestinationCodeForDropdown = async (
    citiesListArray: []
  ) => {
    citiesListArray.map((index: any) => {
      console.log("index", index.id);

      STNOptionsArray.push({
        key: index.id,
        name: index.codigo,
      });
    });
  };

  const getcitiesListDestination = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/citiesListDestination";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("citiesListDestination", Object.values(result));
            setDestinationCitiesArrayList(Object.values(result));
            setCitiesListDestinationCodeForDropdown(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const setOptionsInTareasArray = (
    taskPosition: number,
    subtaskPosition: number,
    typeValue: number
  ) => {
    tasksArray[taskPosition].subtasks[subtaskPosition].type = typeValue;
    //console.log("tasksArray", tasksArray);
  };
  const handleRegisterButton = async () => {
    if (recurrentFlight === true) {
      //vuelo recurrente
      let initialDate = new Date(dateETA);
      initialDate.setDate(initialDate.getDate() + 1);
      let finalDate = new Date(recurrentEndDate);
      finalDate.setDate(finalDate.getDate() + 1);
      console.log("initialDate", initialDate);
      console.log("finalDate", finalDate);

      //desde la fecha ETA a la fecha
      while (initialDate <= finalDate) {
        if (recurrentSunday) {
          if (initialDate.getDay() === 0) {
            //registrar
            let initialDateAux = new Date(initialDate);
            initialDateAux.setDate(initialDateAux.getDate() - 1);
            await registerFlight(initialDateAux.toISOString().split("T")[0]);
          }
        }
        if (recurrentMonday) {
          if (initialDate.getDay() === 1) {
            //registrar
            let initialDateAux = new Date(initialDate);
            initialDateAux.setDate(initialDateAux.getDate() - 1);
            await registerFlight(initialDateAux.toISOString().split("T")[0]);
          }
        }
        if (recurrentTuesday) {
          if (initialDate.getDay() === 2) {
            //registrar
            let initialDateAux = new Date(initialDate);
            initialDateAux.setDate(initialDateAux.getDate() - 1);
            await registerFlight(initialDateAux.toISOString().split("T")[0]);
          }
        }
        if (recurrentWednesday) {
          if (initialDate.getDay() === 3) {
            //registrar
            let initialDateAux = new Date(initialDate);
            initialDateAux.setDate(initialDateAux.getDate() - 1);
            await registerFlight(initialDateAux.toISOString().split("T")[0]);
          }
        }
        if (recurrentThursday) {
          if (initialDate.getDay() === 4) {
            //registrar
            let initialDateAux = new Date(initialDate);
            initialDateAux.setDate(initialDateAux.getDate() - 1);
            await registerFlight(initialDateAux.toISOString().split("T")[0]);
          }
        }
        if (recurrentFriday) {
          if (initialDate.getDay() === 5) {
            //registrar
            let initialDateAux = new Date(initialDate);
            initialDateAux.setDate(initialDateAux.getDate() - 1);
            await registerFlight(initialDateAux.toISOString().split("T")[0]);
          }
        }
        if (recurrentSaturday) {
          if (initialDate.getDay() === 6) {
            //registrar
            let initialDateAux = new Date(initialDate);
            initialDateAux.setDate(initialDateAux.getDate() - 1);
            await registerFlight(initialDateAux.toISOString().split("T")[0]);
          }
        }
        initialDate.setDate(initialDate.getDate() + 1);
      }
      router.reload();
    } else {
      //vuelo unico
      await registerFlight(dateETA);
      router.reload();
    }
  };

  const checkDisabledRegisterButton = () => {
    //checks if register button should be disabled by asking that every fillable item is filled
    if (
      STN === "" ||
      Carrier === 0 ||
      ChargesPayableBy === "" ||
      flightNumber === "" ||
      ACreg === "" ||
      ACtype === "" ||
      gate === "" ||
      ETA === "" ||
      dateETA === "" ||
      ETD === "" ||
      dateETD === "" ||
      routing1 === 0 ||
      routing2 === 0 ||
      flightType === 0 ||
      templateValue === 0 ||
      clickedRecurrentFlight === false
    )
      return true;
    if (clickedRecurrentFlight === true && recurrentFlight === true) {
      if (recurrentEndDate === "") {
        return true;
      }
      if (
        recurrentMonday === false &&
        recurrentTuesday === false &&
        recurrentWednesday === false &&
        recurrentThursday === false &&
        recurrentSaturday === false &&
        recurrentSunday === false
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Suspense fallback={<>loadig</>}>
        <main className={styles.containerCreateFlightMainPage}>
          <div className={styles.backArrowIcon}>
            <BackArrow executableFunction={() => router.reload()} />
          </div>

          <div className={styles.dataContainer}>
            <div className={styles.dataContainerRow}>
              <div className={styles.dataContainerRowItem}>
                <p>STN:</p>
                <div className={styles.dropdownContainerSTN}>
                  <DropdownMenu
                    buttonText={""}
                    optionsArray={STNOptionsArray}
                    executableOptionClickFunction={(optionValue: number) => {
                      setSTN(optionValue.toString());
                    }}
                  />
                </div>
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>CARRIER:</p>

                <div className={styles.dropdownContainerCarrier}>
                  <DropdownMenu
                    buttonText={""}
                    optionsArray={airlinesOptionsArray}
                    executableOptionClickFunction={(optionValue: number) => {
                      setCarrier(optionValue);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.dataContainerRow}>
              <div className={styles.dataContainerRowItem}>
                <p>Charges Payable By:</p>
                <div className={styles.dropdownContainerCharges}>
                  <DropdownMenu
                    buttonText={""}
                    optionsArray={airlinesOptionsArray}
                    executableOptionClickFunction={(optionValue: number) =>
                      setChargesPayableBy(
                        airlinesOptionsArray.find((o) => o.key === optionValue)
                          .name
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className={styles.dataContainerRowNoGap}>
              <div className={styles.dataContainerRowItem}>
                <p>Número de vuelo:</p>
                <StandardInput
                  setValue={setFlightNumber}
                  inputText=""
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>A/C Reg:</p>
                <StandardInput
                  setValue={setACreg}
                  inputText=""
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>A/C type:</p>
                <StandardInput
                  setValue={setACtype}
                  inputText=""
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>Gate:</p>
                <StandardInput
                  setValue={setGate}
                  inputText=""
                  inputWidth="185px"
                />
              </div>
            </div>
            <div className={styles.dataContainerRowMediumGap}>
              <div className={styles.dataContainerRowItem}>
                <p>ETA:</p>
                <StandardInput
                  setValue={setETA}
                  inputText=""
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>DATE:</p>
                <StandardInput
                  setValue={setdateETA}
                  inputText=""
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p className={styles.adviceText}>
                  *Formato de Fecha: AAAA-MM-DD. Formato de Hora: HH:MM:SS 24hrs
                </p>
              </div>
            </div>
            <div className={styles.dataContainerRowMediumGap}>
              <div className={styles.dataContainerRowItem}>
                <p>ETD:</p>
                <StandardInput
                  setValue={setETD}
                  inputText=""
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>DATE:</p>
                <StandardInput
                  setValue={setdateETD}
                  inputText=""
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p className={styles.adviceText}>
                  *Formato de Fecha: AAAA-MM-DD. Formato de Hora: HH:MM:SS 24hrs
                </p>
              </div>
            </div>
            <div className={styles.dataContainerRowMediumGap}>
              <div className={styles.dataContainerRowItemRouting}>
                <p>Routing:</p>
                <div className={styles.dropdownContainerRouting1}>
                  <DropdownMenu
                    buttonText={""}
                    optionsArray={STNOptionsArray}
                    executableOptionClickFunction={(optionValue: number) =>
                      setRouting1(optionValue)
                    }
                  />
                </div>
                <p>/</p>
                <div className={styles.dropdownContainerRouting2}>
                  <DropdownMenu
                    buttonText={""}
                    optionsArray={STNOptionsArray}
                    executableOptionClickFunction={(optionValue: number) =>
                      setRouting2(optionValue)
                    }
                  />
                </div>
              </div>
              <div className={styles.dataContainerRowItemFlightType}>
                <p>Tipo de vuelo:</p>
                <div className={styles.dropdownContainerFlightType}>
                  <DropdownMenu
                    buttonText={""}
                    optionsArray={flightTypesOptionsArray}
                    executableOptionClickFunction={(optionValue: number) =>
                      setflightType(optionValue)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.templateContainer}>
            <p>Plantilla:</p>
            <div className={styles.dropdownContainerTemplate}>
              <DropdownMenu
                buttonText={""}
                optionsArray={templatesOptionsArray}
                executableOptionClickFunction={(optionValue: number) =>
                  setTemplateValue(optionValue)
                }
              />
            </div>
          </div>

          {clickedRecurrentFlight === false && (
            <div className={styles.recurrencyContainer}>
              <p>¿Quieres programar este vuelo como recurrente?</p>
              <div className={styles.recurrentButtonsContainer}>
                <GreenButton
                  executableFunction={() => {
                    setclickedRecurrentFlight(true);
                    setrecurrentFlight(true);
                  }}
                  buttonText="Si"
                />
                <RedButton
                  executableFunction={() => {
                    setclickedRecurrentFlight(true);
                  }}
                  buttonText="No"
                />
              </div>
            </div>
          )}
          {recurrentFlight === true && (
            <div className={styles.recurrencyFormContainer}>
              <div className={styles.recurrencyFormRow}>
                <p>Fecha de inicio de la serie:</p>
                <div className={styles.unmodifiableInput}>{dateETA} </div>
              </div>
              <div className={styles.recurrencyFormRow}>
                <p>Fecha de fin de la serie:</p>

                <StandardInput
                  setValue={setrecurrentEndDate}
                  inputText=""
                  inputWidth="105px"
                />
                <p className={styles.adviceText2}>
                  *Formato de Fecha: AAAA-MM-DD mayor a la fecha de inicio de la
                  serie.
                </p>
              </div>
              <div className={styles.recurrencyFormRow}>
                <p>Días de la semana:</p>
                <div
                  className={
                    recurrentMonday
                      ? styles.weekdayContainerSelected
                      : styles.weekdayContainerUnselected
                  }
                  onClick={() => setrecurrentMonday(!recurrentMonday)}
                >
                  L
                </div>
                <div
                  className={
                    recurrentTuesday
                      ? styles.weekdayContainerSelected
                      : styles.weekdayContainerUnselected
                  }
                  onClick={() => setrecurrentTuesday(!recurrentTuesday)}
                >
                  M
                </div>
                <div
                  className={
                    recurrentWednesday
                      ? styles.weekdayContainerSelected
                      : styles.weekdayContainerUnselected
                  }
                  onClick={() => setrecurrentWednesday(!recurrentWednesday)}
                >
                  M
                </div>
                <div
                  className={
                    recurrentThursday
                      ? styles.weekdayContainerSelected
                      : styles.weekdayContainerUnselected
                  }
                  onClick={() => setrecurrentThursday(!recurrentThursday)}
                >
                  J
                </div>
                <div
                  className={
                    recurrentFriday
                      ? styles.weekdayContainerSelected
                      : styles.weekdayContainerUnselected
                  }
                  onClick={() => setrecurrentFriday(!recurrentFriday)}
                >
                  V
                </div>
                <div
                  className={
                    recurrentSaturday
                      ? styles.weekdayContainerSelected
                      : styles.weekdayContainerUnselected
                  }
                  onClick={() => setrecurrentSaturday(!recurrentSaturday)}
                >
                  S
                </div>
                <div
                  className={
                    recurrentSunday
                      ? styles.weekdayContainerSelected
                      : styles.weekdayContainerUnselected
                  }
                  onClick={() => setrecurrentSunday(!recurrentSunday)}
                >
                  D
                </div>
              </div>
            </div>
          )}
          <div className={styles.registerButtonContainer}>
            <GreenButton
              executableFunction={() => handleRegisterButton()}
              buttonText="Registrar vuelo"
              disabled={checkDisabledRegisterButton()}
            />
          </div>
        </main>
      </Suspense>
    </>
  );
};

export default CreateFlightMainPage;

let tasksArray: any = [];

let flightTypesOptionsArray: any = [];
let airlinesOptionsArray: any = [];
let STNOptionsArray: any = [];
let CitiesOptionsArray: any = [];
let templatesOptionsArray: any = [];
let optionsArray: any = [
  {
    key: 1,
    name: "Comentario",
  },
  {
    key: 2,
    name: "Hora inicio",
  },
  {
    key: 3,
    name: "Hora inicio y fin",
  },
  {
    key: 4,
    name: "Imagen",
  },
];
