import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./CreateFlightMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Table, Spacer } from "@nextui-org/react";
import { Autocomplete, TableBody, TextField } from "@mui/material";
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
import StandardInputAutocomplete from "@/components/Reusables/StandardInputAutocomplete";

import LoadingScreen from "../../Reusables/LoadingScreen";

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
  const [FlightServicesArrayList, setFlightServicesArrayList] = useState([]);
  const [DepartureCitiesArrayList, setDepartureCitiesArrayList] = useState([]);
  const [AirlinesArrayList, setAirlinesArrayList] = useState([]);
  const [FlightTypesList, setFlightTypesList] = useState([]);
  const [ACRegsList, setACRegsList] = useState([]);

  const [FlightServiceType, setFlightServiceType] = useState("");
  const [STN, setSTN] = useState("");
  const [Carrier, setCarrier] = useState(0);
  const [ChargesPayableBy, setChargesPayableBy] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [ACreg, setACreg] = useState("");
  const [ACtype, setACtype] = useState("");
  const [gate, setGate] = useState("");
  const [ETA1, setETA1] = useState("");
  const [ETA2, setETA2] = useState("");
  const [dateETAday, setdateETAday] = useState("");
  const [dateETAmonth, setdateETAmonth] = useState("");
  const [dateETAyear, setdateETAyear] = useState("");
  const [ETD1, setETD1] = useState("");
  const [ETD2, setETD2] = useState("");
  const [dateETDday, setdateETDday] = useState("");
  const [dateETDmonth, setdateETDmonth] = useState("");
  const [dateETDyear, setdateETDyear] = useState("");
  const [routing1, setRouting1] = useState(0);
  const [routing2, setRouting2] = useState(0);
  const [flightType, setflightType] = useState(0);
  const [recurrentFlight, setrecurrentFlight] = useState(false);
  const [clickedRecurrentFlight, setclickedRecurrentFlight] = useState(false);
  const [templateValue, setTemplateValue] = useState(0);
  const [recurrentStartDate, setrecurrentStartDate] = useState("");
  const [recurrentEndDateDay, setrecurrentEndDateDay] = useState("");
  const [recurrentEndDateMonth, setrecurrentEndDateMonth] = useState("");
  const [recurrentEndDateYear, setrecurrentEndDateYear] = useState("");
  const [recurrentMonday, setrecurrentMonday] = useState(false);
  const [recurrentTuesday, setrecurrentTuesday] = useState(false);
  const [recurrentWednesday, setrecurrentWednesday] = useState(false);
  const [recurrentThursday, setrecurrentThursday] = useState(false);
  const [recurrentFriday, setrecurrentFriday] = useState(false);
  const [recurrentSaturday, setrecurrentSaturday] = useState(false);
  const [recurrentSunday, setrecurrentSunday] = useState(false);

  const [acRegInput, setacRegInput] = useState(false);

  const [stringValueServiceType, setStringValueServiceType] = useState("");
  const [stringValueSTN, setStringValueSTN] = useState("");
  const [stringValueCarrier, setStringValueCarrier] = useState("");
  const [stringValueCharges, setStringValueCharges] = useState("");
  const [stringValueRouting2, setStringValueRouting2] = useState("");
  const [stringFlightType, setStringFlightType] = useState("");
  const [stringTemplate, setStringTemplate] = useState("");

  const [loading, setLoading] = useState(false);
  let currentTimestamp = new Date();
  let currentTodaysDateString =
    currentTimestamp.getFullYear() +
    "-" +
    (currentTimestamp.getMonth() + 1) +
    "-" +
    currentTimestamp.getDate();
  //hace todas las requests de todos los datos necesarios apenas entra a la pagina
  useEffect(() => {
    const fetchData = async () => {
      await getcitiesListDestination();
      await getcitiesListDeparture();
      await getAirlinesList();
      await getFlightTypesList();
      await getTemplatesList();
      await getFlightServiceTypes();
      await getACRegList();
    };
    fetchData().catch(console.error);
  }, []);
  //setea los datos para el acreg
  const setACRegListDropdown = async (ACRegsListArray: []) => {
    if (acregOptionsArray.length === 0) {
      ACRegsListArray.map((index: any) => {
        acregOptionsArray.push({
          id_airline: index?.fk_aerolinea_id,
          title: index?.ac_reg,
        });
      });
    }
  };
  //request para el acereg
  const getACRegList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/acRegByAirline";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then(async (result) => {
            await setFlightTypesList(Object.values(result));

            await setACRegListDropdown(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };
  //request para registrar turnaround
  //por cada vuelo, se registra un turnaround nuevo asociado a este
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
          res.json().then(async (result) => {})
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };
  //registrar vuelo
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
            ETA: ETA1,
            ETD: ETD1,
            ETA_fecha: ETADateValue,
            ETD_fecha: dateETDday,
            gate: gate,
            fk_aerolinea: Carrier,
            fk_plantilla: templateValue,
            stn: STN,
            lugar_salida: STN,
            lugar_destino: routing2,
            tipo_vuelo: flightType,
            tipo_servicio: FlightServiceType,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then(async (result) => {
            await registerTurnaround(
              result?.ETA_fecha,
              result?.ETA,
              result?.id,
              1
            );
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };
  //setear el arreglo de opciones para el combobox deplantillas
  const setTemplatesForDropdown = async (TemplatesListArray: []) => {
    TemplatesListArray.map((index: any) => {
      templatesOptionsArray.push({
        key: index.id,
        name: index.titulo,
      });
    });
  };
  //request para traer las plantillas
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
  //setear el arreglo de opciones para el combobox de tipos de vuelo
  const setFlightTypesForDropdown = async (flightTypesListArray: []) => {
    flightTypesListArray.map((index: any) => {
      flightTypesOptionsArray.push({
        key: index.id,
        name: index.nombre,
      });
    });
  };
  //request para traer los tipos de vuelo
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
  ////setear el arreglo de opciones para el combobox de aerolineas
  const setAirlinesForDropdown = async (airlinesArray: []) => {
    await airlinesArray.map((index: any) => {
      airlinesOptionsArray.push({
        key: index.id,
        name: index.nombre,
      });
    });
  };
  //request para traer la lista de aerolineas
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
  //setear el arreglo de opciones para el combobox de aerolineas
  const setCitiesListDepartureForDropdown = async (citiesListArray: []) => {
    citiesListArray.map((index: any) => {
      CitiesOptionsArray.push({
        key: index.id,
        name: index.nombre,
      });
    });
  };
  //request para traer la lista de ciudades de salida
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
            setFlightServicesArrayList(Object.values(result));
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
  //setear el arreglo de opciones para el combobox de tipo de servicio
  const setFlightServiceTypesForDropdown = async (servicesListArray: []) => {
    servicesListArray.map((index: any) => {
      FlightServicesOptionsArray.push({
        key: index.id,
        name: index.nombre,
      });
    });
  };
  //request para traer tipos de servicios
  const getFlightServiceTypes = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/flightServiceTypes";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setDepartureCitiesArrayList(Object.values(result));
            setFlightServiceTypesForDropdown(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  //setear el arreglo de opciones para el combobox de ciudades destino
  const setCitiesListDestinationCodeForDropdown = async (
    citiesListArray: []
  ) => {
    citiesListArray.map((index: any) => {
      STNOptionsArray.push({
        key: index.id,
        name: index.codigo,
      });
    });
  };
  //request para traer ciudades destino
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

  //manejador del boton registrar
  //aca se creara uno por uno los vuelos, y para cada uno de ellos un turnaround
  //si es vuelo recurrente recorre fecha por fecha hasta llegar a la deseada, validando los dias de la semana seleccionados
  //si es vuelo unico simplemente crea un vuelo e en la fecha especificada
  const handleRegisterButton = async () => {
    setLoading(true);
    if (recurrentFlight === true) {
      //vuelo recurrente
      let initialDate = new Date(dateETAday);
      initialDate.setDate(initialDate.getDate() + 1);
      let finalDate = new Date(recurrentEndDateDay);
      finalDate.setDate(finalDate.getDate() + 1);

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
      await registerFlight(dateETAday);

      router.reload();
    }
  };
  //esta funcion deshabilita el boton de registrar hasta que haya llenado todos los campos necesarios
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
      ETA1 === "" ||
      dateETAday === "" ||
      ETD1 === "" ||
      dateETDday === "" ||
      routing2 === 0 ||
      flightType === 0 ||
      templateValue === 0 ||
      clickedRecurrentFlight === false
    )
      return true;
    if (clickedRecurrentFlight === true && recurrentFlight === true) {
      if (recurrentEndDateDay === "") {
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

  //manejador de boton de atras
  const Back = () => {
    setLoading(true);
    router.reload();
  };
  //html principal
  return (
    <>
      <Suspense fallback={<>loadig</>}>
        <main className={styles.containerCreateFlightMainPage}>
          <div className={styles.backArrowIcon}>
            <BackArrow executableFunction={() => Back()} />
            {loading && <LoadingScreen />}
          </div>

          <div className={styles.dataContainer}>
            <div className={styles.dataContainerRow}>
              <div className={styles.dataContainerRowItem}>
                <p>Tipo de servicio:</p>
                <div className={styles.dropdownContainerServiceType}>
                  <DropdownMenu
                    buttonText={""}
                    optionsArray={FlightServicesOptionsArray}
                    executableOptionClickFunction={(optionValue: number) => {
                      setFlightServiceType(optionValue.toString());
                    }}
                    setStringValue={setStringValueServiceType}
                  />
                </div>
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>STN:</p>
                <div className={styles.dropdownContainerSTN}>
                  <DropdownMenu
                    buttonText={""}
                    optionsArray={STNOptionsArray}
                    executableOptionClickFunction={(optionValue: number) => {
                      setSTN(optionValue.toString());
                    }}
                    setStringValue={setStringValueSTN}
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
                    setStringValue={setStringValueCarrier}
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
                    setStringValue={setStringValueCharges}
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
                {acRegInput ? (
                  <StandardInput
                    setValue={setACreg}
                    inputText=""
                    inputWidth="185px"
                  />
                ) : (
                  <div className={styles.autocompleteInputContainer}>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      fullWidth
                      onInputChange={(event, newInputValue) => {
                        setACreg(newInputValue);
                      }}
                      options={acregOptionsArray?.map((option) => {
                        if (Carrier > 0) {
                          if (option?.id_airline === Carrier) {
                            return option?.title;
                          } else {
                            return "";
                          }
                        } else {
                          return "";
                        }
                      })}
                      renderInput={(params) => (
                        <TextField
                          color="success"
                          sx={{
                            "& label": {
                              paddingLeft: (theme) => theme.spacing(2),
                            },
                            "& input": {
                              paddingLeft: (theme) => theme.spacing(3.5),
                            },
                            "& fieldset": {
                              paddingLeft: (theme) => theme.spacing(2.5),
                              borderRadius: "10px",
                              borderBlockColor: "#bbb",
                              border: "solid 2px #bbb",
                            },
                          }}
                          {...params}
                          size="small"
                          label=""
                          onChange={({ target: { value } }) => setACreg(value)}
                        />
                      )}
                    />
                  </div>
                )}
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
                <input
                  className={styles.date}
                  type="time"
                  id="time"
                  value={ETA1}
                  onChange={(e) => setETA1(e.target.value)}
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>FECHA:</p>
                <input
                  className={styles.date}
                  type="date"
                  id="date"
                  value={dateETAday}
                  onChange={(e) => setdateETAday(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.dataContainerRowMediumGap}>
              <div className={styles.dataContainerRowItem}>
                <p>ETD:</p>
                <input
                  className={styles.date}
                  type="time"
                  id="time"
                  value={ETD1}
                  onChange={(e) => setETD1(e.target.value)}
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>FECHA:</p>
                <input
                  className={styles.date}
                  type="date"
                  id="date"
                  value={dateETDday}
                  onChange={(e) => setdateETDday(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.dataContainerRowMediumGap}>
              <div className={styles.dataContainerRowItemRouting}>
                <p>Routing:</p>
                <div className={styles.dropdownContainerRouting1}>
                  <div className={styles.Routing1container}>
                    <span> {stringValueSTN}</span>
                  </div>
                </div>
                <p>/</p>
                <div className={styles.dropdownContainerRouting2}>
                  <DropdownMenu
                    buttonText={""}
                    optionsArray={STNOptionsArray}
                    executableOptionClickFunction={(optionValue: number) =>
                      setRouting2(optionValue)
                    }
                    setStringValue={setStringValueRouting2}
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
                    setStringValue={setStringFlightType}
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
                setStringValue={setStringTemplate}
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
                <div className={styles.unmodifiableInput}>{dateETAday} </div>
              </div>
              <div className={styles.recurrencyFormRow}>
                <p>Fecha de fin de la serie:</p>
                <p>FECHA:</p>
                <input
                  className={styles.date}
                  type="date"
                  id="date"
                  value={recurrentEndDateDay}
                  onChange={(e) => setrecurrentEndDateDay(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                />
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
            {loading && <LoadingScreen />}
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
let FlightServicesOptionsArray: any = [];
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
let acregOptionsArray: any = [];
const top100Films = [
  { title: "The Shawshank Redemption" },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
