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

import LoadingScreen from "../../Reusables/LoadingScreen";

interface PageProps {
  setStep: (value: number) => void;
  flightID: number;
}
//componente con un vuelo especifico para ser editado
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
  const [ETA1, setETA1] = useState("");
  const [ETA2, setETA2] = useState("");
  const [dateETA, setdateETA] = useState("");
  const [dateETAday, setdateETAday] = useState("");
  const [dateETAmonth, setdateETAmonth] = useState("");
  const [dateETAyear, setdateETAyear] = useState("");
  const [ETD, setETD] = useState("");
  const [ETD1, setETD1] = useState("");
  const [ETD2, setETD2] = useState("");
  const [dateETD, setdateETD] = useState("");
  const [dateETDday, setdateETDday] = useState("");
  const [dateETDmonth, setdateETDmonth] = useState("");
  const [dateETDyear, setdateETDyear] = useState("");
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

  const [stringValue, setStringValue] = useState("");
  const [stringValueSTN, setStringValueSTN] = useState("");

  const [loading, setLoading] = useState(false);

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

  //request para traer el vuelo especifico que se quiera editar
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
            setETA1(result?.ETA?.slice(0, 2));
            setETA2(result?.ETA?.slice(3, 5));
            setETD(result?.ETD);
            setETD1(result?.ETD?.slice(0, 2));
            setETD2(result?.ETD?.slice(3, 5));
            setdateETA(result?.ETA_fecha);
            setdateETAyear(result?.ETA_fecha?.slice(0, 4));
            setdateETAmonth(result?.ETA_fecha?.slice(5, 7));
            setdateETAday(result?.ETA_fecha?.slice(8, 10));
            setdateETD(result?.ETD_fecha);
            setdateETDyear(result?.ETD_fecha?.slice(0, 4));
            setdateETDmonth(result?.ETD_fecha?.slice(5, 7));
            setdateETDday(result?.ETD_fecha?.slice(8, 10));
            setRouting1(result?.lugar_salida?.id);
            setRouting11(result?.lugar_salida?.codigo);
            setRouting2(result?.lugar_destino?.id);
            setRouting22(result?.lugar_destino?.codigo);
            setflightType(result?.tipo_vuelo?.id);
            setflightType2(result?.tipo_vuelo?.nombre);

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
  //consulta para actualizar el vuelo que ya fue editado
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
            ETA: ETA1 + ":" + ETA2,
            ETD: ETD1 + ":" + ETD2,
            ETA_fecha: dateETAyear + "-" + dateETAmonth + "-" + dateETAday,
            ETD_fecha: dateETDyear + "-" + dateETDmonth + "-" + dateETDday,
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
          res.json().then(async (result) => {})
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };
  //set del arreglo que tendra la lista de plantillas
  const setTemplatesForDropdown = async (TemplatesListArray: []) => {
    TemplatesListArray.map((index: any) => {
      templatesOptionsArray.push({
        key: index.id,
        name: index.titulo,
      });
    });
  };
  //request para traer la lista de plantillas
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
  //request para el combobox de los tipos de vuelo
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
  //set de la lista de valores de ciudades que iran al combobox
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
  //setear la opcion del combobox de STN
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
  //request para traer las lista de ciudades de salida
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
  //setea las opciones para el combobox de lso tipos de vuelo
  const setFlightServiceTypesForDropdown = async (servicesListArray: []) => {
    servicesListArray.map((index: any) => {
      FlightServicesOptionsArray.push({
        key: index.id,
        name: index.nombre,
      });
    });
  };

  //request para consiltar los tipos de vuelo
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

  //manejador del boton de registrar
  const handleRegisterButton = async () => {
    //vuelo unico
    await registerFlight();
    setLoading(true);
    router.reload();
  };

  //manejador del boton de volver
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
                    buttonText={FlightServiceType2}
                    optionsArray={FlightServicesOptionsArray}
                    executableOptionClickFunction={(optionValue: number) => {
                      setFlightServiceType(optionValue.toString());
                    }}
                    setStringValue={setStringValue}
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
                    setStringValue={setStringValueSTN}
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
                    setStringValue={setStringValue}
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
                    setStringValue={setStringValue}
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
                  setValue={setETA1}
                  labelText=""
                  placeholderText={ETA?.slice(0, 2)}
                  inputWidth="55px"
                />
                <p>:</p>
                <StandardInputV2
                  setValue={setETA2}
                  labelText=""
                  placeholderText={ETA?.slice(3, 5)}
                  inputWidth="55px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>DIA:</p>
                <StandardInputV2
                  setValue={setdateETAday}
                  labelText=""
                  placeholderText={dateETAday}
                  inputWidth="55px"
                />
                <p>MES:</p>
                <StandardInputV2
                  setValue={setdateETAmonth}
                  labelText=""
                  placeholderText={dateETAmonth}
                  inputWidth="55px"
                />
                <p>AÑO:</p>
                <StandardInputV2
                  setValue={setdateETAyear}
                  labelText=""
                  placeholderText={dateETAyear}
                  inputWidth="95px"
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
                  setValue={setETD1}
                  labelText=""
                  placeholderText={ETD?.slice(0, 2)}
                  inputWidth="55px"
                />
                <p>:</p>
                <StandardInputV2
                  setValue={setETD2}
                  labelText=""
                  placeholderText={ETD?.slice(3, 5)}
                  inputWidth="55px"
                />
              </div>
              <div className={styles.dataContainerRowItem}>
                <p>DIA:</p>
                <StandardInputV2
                  setValue={setdateETDday}
                  labelText=""
                  placeholderText={dateETDday}
                  inputWidth="55px"
                />
                <p>MES:</p>
                <StandardInputV2
                  setValue={setdateETDmonth}
                  labelText=""
                  placeholderText={dateETDmonth}
                  inputWidth="55px"
                />
                <p>AÑO:</p>
                <StandardInputV2
                  setValue={setdateETDyear}
                  labelText=""
                  placeholderText={dateETDyear}
                  inputWidth="95px"
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
                    <span>
                      {" "}
                      {stringValueSTN === "" ? STN2 : stringValueSTN}
                    </span>
                  </div>
                </div>
                <p>/</p>
                <div className={styles.dropdownContainerRouting2}>
                  <DropdownMenu
                    buttonText={routing22?.toString()}
                    optionsArray={STNOptionsArray}
                    executableOptionClickFunction={(optionValue: number) =>
                      setRouting2(optionValue)
                    }
                    setStringValue={setStringValue}
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
                    setStringValue={setStringValue}
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
            {loading && <LoadingScreen />}
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
