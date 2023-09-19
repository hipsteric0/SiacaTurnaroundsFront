import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./EditFlight.style.module.css";
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
import StandardInputV2 from "@/components/Reusables/StandardInputV2";
import RedButton from "@/components/Reusables/RedButton";
import { Suspense } from "react";

interface PageProps {
  setStep: (value: number) => void;
  flightID: number;
}

const EditFlight: React.FC<PageProps> = ({ setStep, flightID }) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [DestinationCitiesArrayList, setDestinationCitiesArrayList] = useState(
    []
  );
  const [DepartureCitiesArrayList, setDepartureCitiesArrayList] = useState([]);
  const [AirlinesArrayList, setAirlinesArrayList] = useState([]);
  const [FlightTypesList, setFlightTypesList] = useState([]);
  const [FlightServiceType, setFlightServiceType] = useState("");
  const [FlightServiceType2, setFlightServiceType2] = useState("");
  const [STN, setSTN] = useState("");
  const [STN2, setSTN2] = useState("");
  const [Carrier, setCarrier] = useState(0);
  const [Carrier2, setCarrier2] = useState(0);
  const [ChargesPayableBy, setChargesPayableBy] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [ICAOhex, setICAOhex] = useState("");
  const [ACreg, setACreg] = useState("");
  const [ACtype, setACtype] = useState("");
  const [gate, setGate] = useState("");
  const [ETA, setETA] = useState("");
  const [dateETA, setdateETA] = useState("");
  const [ETD, setETD] = useState("");
  const [dateETD, setdateETD] = useState("");
  const [routing1, setRouting1] = useState(0);
  const [routing11, setRouting11] = useState(0);
  const [routing2, setRouting2] = useState(0);
  const [routing22, setRouting22] = useState(0);
  const [flightType, setflightType] = useState(0);
  const [flightType2, setflightType2] = useState(0);
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
  const [arrayList3, setArrayList3] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getcitiesListDestination();
      await getcitiesListDeparture();
      await getAirlinesList();
      await getFlightTypesList();
      await getTemplatesList();
      await getFlightServiceTypes();
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/specificFlightByID";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            flightID: flightID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setArrayList3(Object.values(result));
            console.log("result", result);
            setFlightServiceType2(result?.tipo_servicio?.nombre);
            setSTN(result?.stn?.id);
            setSTN2(result?.stn?.codigo);
            setCarrier(result?.fk_aerolinea?.id);
            setCarrier2(result?.fk_aerolinea?.nombre);
            setICAOhex(result?.icao_hex);
            setChargesPayableBy(result?.ente_pagador);
            setFlightNumber(result?.numero_vuelo);
            setACreg(result?.ac_reg);
            setACtype(result?.ac_type);
            setGate(result?.gate);
            setETA(result?.ETA);
            setETD(result?.ETD);
            setdateETA(result?.ETA_fecha);
            setdateETD(result?.ETD_fecha);
            setRouting1(result?.lugar_salida?.id);
            setRouting11(result?.lugar_salida?.codigo);
            setRouting2(result?.lugar_destino?.id);
            setRouting22(result?.lugar_destino?.codigo);
            setflightType(result?.tipo_vuelo?.id);
            setflightType2(result?.tipo_vuelo?.nombre);

            if (result?.[0]?.["status"] === 400) {
              console.log("entro");
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

  const registerFlight = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/updateFlight";
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
            ETA_fecha: dateETA,
            ETD_fecha: dateETD,
            gate: gate,
            fk_aerolinea: Carrier,
            fk_plantilla: templateValue,
            stn: STN,
            lugar_salida: STN,
            lugar_destino: routing2,
            tipo_vuelo: flightType,
            flightID: flightID,
            tipo_servicio: FlightServiceType,
            icao_hex: ICAOhex,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then(async (result) => {
            console.log("registerFlight", result);
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

  const setFlightServiceTypesForDropdown = async (servicesListArray: []) => {
    servicesListArray.map((index: any) => {
      console.log("index", index.id);
      FlightServicesOptionsArray.push({
        key: index.id,
        name: index.nombre,
      });
    });
  };

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
            console.log("getFlightServicesTypes", Object.values(result));
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

  const setOptionsInTareasArray = (
    taskPosition: number,
    subtaskPosition: number,
    typeValue: number
  ) => {
    tasksArray[taskPosition].subtasks[subtaskPosition].type = typeValue;
    //console.log("tasksArray", tasksArray);
  };

  const consolePrueba = async () => {
    console.log("flightID", flightID);
  };

  const handleRegisterButton = async () => {
    //vuelo unico
    await registerFlight();
    router.reload();
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
                <p>Tipo de servicio:</p>
                <div className={styles.dropdownContainerServiceType}>
                  <DropdownMenu
                    buttonText={FlightServiceType2}
                    optionsArray={FlightServicesOptionsArray}
                    executableOptionClickFunction={(optionValue: number) => {
                      setFlightServiceType(optionValue.toString());
                    }}
                  />
                </div>
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>STN:</p>
                <div className={styles.dropdownContainerSTN}>
                  <DropdownMenu
                    buttonText={STN2}
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
                    buttonText={Carrier2.toString()}
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
                    buttonText={ChargesPayableBy}
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
              <div className={styles.dataContainerRowItem}>
                <p>Identificador ICAO hex:</p>
                <div className={styles.dropdownContainerICAOhex}>
                  <StandardInputV2
                    setValue={setICAOhex}
                    labelText=""
                    placeholderText={ICAOhex}
                    inputWidth="185px"
                  />
                </div>
              </div>
            </div>
            <div className={styles.dataContainerRowNoGap}>
              <div className={styles.dataContainerRowItem}>
                <p>Número de vuelo:</p>
                <StandardInputV2
                  setValue={setFlightNumber}
                  labelText=""
                  placeholderText={flightNumber}
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>A/C Reg:</p>
                <StandardInputV2
                  setValue={setACreg}
                  labelText=""
                  placeholderText={ACreg}
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>A/C type:</p>
                <StandardInputV2
                  setValue={setACtype}
                  labelText=""
                  placeholderText={ACtype}
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>Gate:</p>
                <StandardInputV2
                  setValue={setGate}
                  labelText=""
                  placeholderText={gate}
                  inputWidth="185px"
                />
              </div>
            </div>
            <div className={styles.dataContainerRowMediumGap}>
              <div className={styles.dataContainerRowItem}>
                <p>ETA:</p>
                <StandardInputV2
                  setValue={setETA}
                  labelText=""
                  placeholderText={ETA}
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>DATE:</p>
                <StandardInputV2
                  setValue={setdateETA}
                  labelText=""
                  placeholderText={dateETA}
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
                <StandardInputV2
                  setValue={setETD}
                  labelText=""
                  placeholderText={ETD}
                  inputWidth="185px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>DATE:</p>
                <StandardInputV2
                  setValue={setdateETD}
                  labelText=""
                  placeholderText={dateETD}
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
                  <div className={styles.Routing1container}>
                    <span> {STNOptionsArray[STN - 1]?.name}</span>
                  </div>
                </div>
                <p>/</p>
                <div className={styles.dropdownContainerRouting2}>
                  <DropdownMenu
                    buttonText={routing22.toString()}
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
                    buttonText={flightType2.toString()}
                    optionsArray={flightTypesOptionsArray}
                    executableOptionClickFunction={(optionValue: number) =>
                      setflightType(optionValue)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.registerButtonContainer}>
            <GreenButton
              executableFunction={() => handleRegisterButton()}
              buttonText="Registrar vuelo"
            />
          </div>
        </main>
      </Suspense>
    </>
  );
};

export default EditFlight;

let tasksArray: any = [];

let flightTypesOptionsArray: any = [];
let airlinesOptionsArray: any = [];
let STNOptionsArray: any = [];
let CitiesOptionsArray: any = [];
let templatesOptionsArray: any = [];
let FlightServicesOptionsArray: any = [];
