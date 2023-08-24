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

interface PageProps {}

const CreateFlightMainPage: React.FC<PageProps> = ({}) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState([]);
  const [flightNumber, setFlightNumber] = useState("");
  const [ACreg, setACreg] = useState("");
  const [ACtype, setACtype] = useState("");
  const [gate, setGate] = useState("");
  const [ETA, setETA] = useState("");
  const [dateETA, setdateETA] = useState("");
  const [ETD, setETD] = useState("");
  const [dateETD, setdateETD] = useState("");
  const [flightType, setflightType] = useState("");
  const [recurrentFlight, setrecurrentFlight] = useState(false);
  const [clickedRecurrentFlight, setclickedRecurrentFlight] = useState(false);
  const [templateValue, setTemplateValue] = useState("");
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
    getList();
  }, []);

  const getList = async () => {
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

  const setOptionsInTareasArray = (
    taskPosition: number,
    subtaskPosition: number,
    typeValue: number
  ) => {
    tasksArray[taskPosition].subtasks[subtaskPosition].type = typeValue;
    //console.log("tasksArray", tasksArray);
  };

  return (
    <main className={styles.containerCreateFlightMainPage}>
      <div className={styles.backArrowIcon}>
        <BackArrow executableFunction={() => router.push("/Flights")} />
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.dataContainerRow}>
          <div className={styles.dataContainerRowItem}>
            <p>STN:</p>
            <div className={styles.dropdownContainerSTN}>
              <DropdownMenu
                buttonText={""}
                optionsArray={optionsArray}
                executableOptionClickFunction={(optionValue: number) =>
                  setOptionsInTareasArray(
                    currentArrayPosition,
                    index.key,
                    optionValue
                  )
                }
              />
            </div>
          </div>
          <div className={styles.dataContainerRowItem}>
            <p>CARRIER:</p>

            <div className={styles.dropdownContainerCarrier}>
              <DropdownMenu
                buttonText={""}
                optionsArray={optionsArray}
                executableOptionClickFunction={(optionValue: number) =>
                  setOptionsInTareasArray(
                    currentArrayPosition,
                    index.key,
                    optionValue
                  )
                }
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
                optionsArray={optionsArray}
                executableOptionClickFunction={(optionValue: number) =>
                  setOptionsInTareasArray(
                    currentArrayPosition,
                    index.key,
                    optionValue
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
            <StandardInput setValue={setGate} inputText="" inputWidth="185px" />
          </div>
        </div>
        <div className={styles.dataContainerRowMediumGap}>
          <div className={styles.dataContainerRowItem}>
            <p>ETA:</p>
            <StandardInput setValue={setETA} inputText="" inputWidth="185px" />
          </div>
          <div className={styles.dataContainerRowItem}>
            <p>DATE:</p>
            <StandardInput
              setValue={setdateETA}
              inputText=""
              inputWidth="185px"
            />
          </div>
        </div>
        <div className={styles.dataContainerRowMediumGap}>
          <div className={styles.dataContainerRowItem}>
            <p>ETD:</p>
            <StandardInput setValue={setETD} inputText="" inputWidth="185px" />
          </div>
          <div className={styles.dataContainerRowItem}>
            <p>DATE:</p>
            <StandardInput
              setValue={setdateETD}
              inputText=""
              inputWidth="185px"
            />
          </div>
        </div>
        <div className={styles.dataContainerRowMediumGap}>
          <div className={styles.dataContainerRowItemRouting}>
            <p>Routing:</p>
            <div className={styles.dropdownContainerRouting1}>
              <DropdownMenu
                buttonText={""}
                optionsArray={optionsArray}
                executableOptionClickFunction={(optionValue: number) =>
                  setOptionsInTareasArray(
                    currentArrayPosition,
                    index.key,
                    optionValue
                  )
                }
              />
            </div>
            <p>/</p>
            <div className={styles.dropdownContainerRouting2}>
              <DropdownMenu
                buttonText={""}
                optionsArray={optionsArray}
                executableOptionClickFunction={(optionValue: number) =>
                  setOptionsInTareasArray(
                    currentArrayPosition,
                    index.key,
                    optionValue
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.dataContainerRowMediumGap}>
          <div className={styles.dataContainerRowItem}>
            <p>Tipo de vuelo:</p>
            <StandardInput
              setValue={setflightType}
              inputText=""
              inputWidth="185px"
            />
          </div>
        </div>
      </div>

      <div className={styles.templateContainer}>
        <p>Plantilla:</p>
        <div className={styles.dropdownContainerTemplate}>
          <DropdownMenu
            buttonText={""}
            optionsArray={optionsArray}
            executableOptionClickFunction={(optionValue: number) =>
              setOptionsInTareasArray(
                currentArrayPosition,
                index.key,
                optionValue
              )
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
            <StandardInput
              setValue={setrecurrentStartDate}
              inputText=""
              inputWidth="105px"
            />
          </div>
          <div className={styles.recurrencyFormRow}>
            <p>Fecha de fin de la serie:</p>
            <StandardInput
              setValue={setrecurrentEndDate}
              inputText=""
              inputWidth="105px"
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
          executableFunction={() => undefined}
          buttonText="Registrar vuelo"
        />
      </div>
    </main>
  );
};

export default CreateFlightMainPage;

let tasksArray: any = [];

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
