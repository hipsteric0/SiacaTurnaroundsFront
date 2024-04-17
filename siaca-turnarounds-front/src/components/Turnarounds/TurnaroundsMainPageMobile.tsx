import GreenButton from "@/components/Reusables/GreenButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import styles from "./TurnaroundsMainPageMobile.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useEffect, useState } from "react";
import router, { Router } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Table, Spacer } from "@nextui-org/react";
import { TableBody, Dialog, Input, TextField } from "@mui/material";
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
import StandardInputV2 from "../Reusables/StandardInputV2";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Checkbox from "@mui/material/Checkbox";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { get } from "http";
import StandardInput from "../Reusables/StandardInput";
import Camera from "../Reusables/Camera";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import dynamic from "next/dynamic";

const BarcodeScanner = dynamic(() => import("../Reusables/BarcodeScanner"), {
  ssr: false,
});

interface PageProps {
  setStep: (value: number) => void;
}

const TurnaroundsMainPageMobile: React.FC<PageProps> = ({ setStep }) => {
  useEffect(() => {
    getDateForCalendar();
  }, []);

  useEffect(() => {
    getList();
    getPersonnelList();
  }, []);

  useEffect(() => {
    let role = localStorage.getItem("userRole");
    if (role != null) {
      setRoleID(parseInt(role));
      console.log("se coloco el rol", role);
    }
  }, []);



  const [roleID, setRoleID] = useState(-1);
  const [arrayList3, setArrayList3] = useState([]);
  const [personnelListArray, setPersonnelListArray] = useState([]);
  const [tasksarrayList, setTasksarrayList] = useState([]);
  const [machinesByTurnaroundArrayList, setMachinesByTurnaroundArrayList] =
    useState([]);
  const [machinesarrayList, setMachinesarrayList] = useState([]);
  const [machinesReservationsarrayList, setMachinesReservationsarrayList] =
    useState([]);
  const [personnelReservationsarrayList, setPersonnelReservationsarrayList] =
    useState([]);
  const [
    machinesQuantityByTemplatearrayList,
    setMachinesQuantityByTemplatearrayList,
  ] = useState([]);
  const [personnelByTurnaroundArrayList, setPersonneByTurnaroundArrayList] =
    useState([]);
  const [personnelDepartmentsarrayList, setPersonnelDepartmentsarrayList] =
    useState([]);
  let date = new Date();
  const [arrayFilteredList3, setArrayFilteredList3] = useState([]);
  const [arrayOfCheckedHours, setArrayOfCheckedHours] = useState([]);
  const [arrayOfComments, setArrayOfComments] = useState([]);
  const [arrayOfCheckedHoursStartEnd, setArrayOfCheckedHoursStartEnd] =
    useState([]);
  const [machinesToPostArray, setMachinesToPostArray] = useState([]);
  const [personnelToPostArray, setPersonnelToPostArray] = useState([]);
  const [openCardMenu, setOpenCardMenu] = useState(-1);
  const [dateCounter, setdateCounter] = useState(0);
  const [dateState, setdateState] = useState("");
  const [hover, setHover] = useState(false);
  const [hoverOptionValue, setHoverOptionValue] = useState(-1);
  const [isFilteredResults, setIsFilteredResults] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addMachineDialog, setAddMachineDialog] = useState(false);
  const [addPersonnelDialog, setAddPersonnelDialog] = useState(false);
  const [showMachineDialog, setShowMachineDialog] = useState(false);
  const [openDetailDialogID, setOpenDetailDialogID] = useState(false);
  const [openAssignDialogID, setOpenAssignDialogID] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [machinesDateTimeSelected, setMachinesDateTimeSelected] =
    useState(false);
  const [personnelDateTimeSelected, setPersonnelDateTimeSelected] =
    useState(false);
  const [aux, setAux] = useState(false);
  const [ETA, setETA] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [minutosInicio, setMinutosInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [minutosFin, setMinutosFin] = useState("");
  const [horaInicioPersonnel, setHoraInicioPersonnel] = useState("");
  const [minutosInicioPersonnel, setMinutosInicioPersonnel] = useState("");
  const [horaFinPersonnel, setHoraFinPersonnel] = useState("");
  const [minutosFinPersonnel, setMinutosFinPersonnel] = useState("");
  const [turnaroundDate, setTurnaroundDate] = useState(false);
  const [auxState, setauxState] = useState(-1);
  const [selectedMachineID, setSelectedMachineID] = useState([]);
  const [selectedDepartmentID, setSelectedDepartmentID] = useState([]);
  const [checkTask, setcheckTask] = useState(false);
  const [checkTaskID, setcheckTaskID] = useState(-1);
  const [reservedTask, setreservedTask] = useState(false);
  const [reservedTaskPersonnel, setreservedTaskPersonnel] = useState(false);
  const [openedTurnaroundID, setOpenedTurnaroundID] = useState(-1);
  const [arrayOfImages, setArrayOfImages] = useState([]);
  const [turnaroundState, setTurnaroundState] = useState(1); //1 no ha llegado; 2 en proceso; 3 culminado
  const [flightID, setFlightID] = useState(-1);
  const [state1Overider, setState1Overider] = useState(false);
  const [tasksCompletionValues, setTasksCompletionValues] = useState([]);
  const [manualHourDialog, setmanualHourDialog] = useState(false);
  const [manualHourDialogOnlyStart, setmanualHourDialogOnlyStart] =
    useState(false);
  const [manualHourDialogOnlyEnd, setmanualHourDialogOnlyEnd] = useState(false);
  const [subtaskIDForchange, setsubtaskIDForchange] = useState("0");
  const [subtaskTitleForchange, setsubtaskTitleForchange] = useState("");
  const [manualHourValue, setmanualHourValue] = useState("0");
  const [manualMinuteValue, setmanualMinuteValue] = useState("0");
  const [manualSecondsValue, setmanualSecondsValue] = useState("0");
  const [assistanceInTurnaround, setassistanceInTurnaround] = useState(false);
  const [result, setResult] = useState("");
  const [photo, setPhoto] = useState("");
  const [currentTurnaroundDate, setCurrentTurnaroundDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [arrayAsistencia, setArrayAsistencia] = useState([]);

  useEffect(() => {
    let arrayAux = arrayAsistencia

    setArrayAsistencia(arrayAux)
  }, [arrayAsistencia]);

  let currentTimestamp = new Date();
  let currentTodaysHourString =
    currentTimestamp.getHours().toString() +
    ":" +
    currentTimestamp.getMinutes().toString() +
    ":" +
    currentTimestamp.getSeconds().toString();
  let currentTodaysDateString =
    currentTimestamp.getFullYear() +
    "-" +
    (currentTimestamp.getMonth() + 1) +
    "-" +
    currentTimestamp.getDate();
  const handleScanSuccess = (e: any) => {
    setResult(e);
    console.log("CODIGO QR", result);
  };

  const handlePhoto = (dataUrl: any) => {
    setPhoto(dataUrl);
    console.log("Photo data:", photo);
  };

  let filterValues: any[] = [];
  const getList = async () => {
    setIsFilteredResults(false);
    setArrayFilteredList3([]);
    const fetchData = async () => {
      try {
        const url = "/api/turnaroundsList";
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
            //console.log("turnarounds list", Object.values(result));
            setArrayList3(Object.values(result));

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

  const getPersonnelByTurnaround = async (turnaroundID: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/getPersonnelByTurnaround";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            turnaroundID: turnaroundID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("Machines By Turnaround list", result);
            setPersonneByTurnaroundArrayList(Object.values(result));
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

  const getAssistanceByTurnaround = async (turnaroundID: any) => {
    const fetchData = async () => {
      try {
        console.log("openDetailDialogID", openDetailDialogID);
        const url = "/api/getAssistanceByID";
        const requestOptions = {
          method: "POST",

          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            turnaroundID: turnaroundID,
            cedula: localStorage.getItem("cedula"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("assistnace request", result);
            setassistanceInTurnaround(result?.value);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const getPersonnelList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/personnelList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setPersonnelListArray(Object.values(result));
            //console.log("Personnel List Array", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const updatePresence = async (idTurnaround: any, CI: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/updatePresenceTurnaround";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            turaroundID: idTurnaround,
            CI: CI,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("Personnel List Array", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };


  const addIDToAssistanceArray = (CI: any) => {
    let arrayAux = arrayAsistencia

    arrayAux.push(CI)
    setArrayAsistencia(arrayAux)
  }


  const postAssistance = (turnaroundID : any) => {

    arrayAsistencia.map((index : any) => {
      updatePresence(turnaroundID, index)
    })
  }


  const getMachinesList = async () => {
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
            console.log("machines list", result);
            setMachinesarrayList(Object.values(result));
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

  const getMachinesReservationList = async (turnaroundDate: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/getMachinesReservationList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            fecha: turnaroundDate,
            hora_inicio: horaInicio + ":" + minutosInicio,
            hora_fin: horaFin + ":" + minutosFin,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("machines reservation list", result);
            setMachinesReservationsarrayList(Object.values(result));

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

  const getPersonnelReservationList = async (turnaroundDate: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/getPersonnelReservationList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            fecha: turnaroundDate,
            hora_inicio: horaInicioPersonnel + ":" + minutosInicioPersonnel,
            hora_fin: horaFinPersonnel + ":" + minutosFinPersonnel,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("personnel reservation list", result);
            setPersonnelReservationsarrayList(Object.values(result));

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

  const getPersonnelDepartments = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/getPersonnelDepartmentsList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("getPersonnelDepartments", result);
            setPersonnelDepartmentsarrayList(Object.values(result));
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

  const getMachineryQuantityByTemplate = async (templateID: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/machineryQuantityByTemplate";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            plantillaID: templateID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("MachinesQuantityByTemplatearrayList", result);
            setMachinesQuantityByTemplatearrayList(Object.values(result));
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

  const getTemplateTasks = async (templateID: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/getTemplateTasks";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            templateID: templateID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("templateTasks list", result);
            setTasksarrayList(Object.values(result));
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

  const getMachinesByTurnaround = async (machineID: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/getMachinesByTurnaround";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            machineID: machineID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("Machines By Turnaround list", result);
            setMachinesByTurnaroundArrayList(Object.values(result));
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

  const postPersonReservartion = async (personID: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/postPersonReservation";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            hora_inicio: horaInicioPersonnel + ":" + minutosInicioPersonnel,
            hora_fin: horaFinPersonnel + ":" + minutosFinPersonnel,
            fecha: turnaroundDate,
            fk_usuario: personID,
            fk_turnaround: openAssignDialogID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("Guardar", result);

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

  const updateFlightStateInProgress = async (flightIDvalue: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/updateFlightStateInProcess";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            flightID: flightIDvalue,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("Guardar", result);

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

  const updateFlightStateFinalized = async (flightIDvalue: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/updateFlightStateInFinalized";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            flightID: flightIDvalue,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            // console.log("Guardar", result);

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

  const postMachineReservartion = async (machineryID: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/postMachineReservation";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            hora_inicio: horaInicio + ":" + minutosInicio,
            hora_fin: horaFin + ":" + minutosFin,
            fecha: turnaroundDate,
            fk_maquinaria: machineryID,
            fk_turnaround: openAssignDialogID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("Guardar", result);

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

  const PostTaskResolutionComment = async (
    turnaroundID: any,
    subtaskID: any,
    commentText: any
  ) => {
    const fetchData = async () => {
      try {
        const url = "/api/postTaskResolutionComment";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            comentario: commentText,
            fk_subtarea: subtaskID,
            fk_turnaround: turnaroundID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //("postTaskResolutionComment", result);

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

  const PostTaskResolutionSimpleCheck = async (
    turnaroundID: any,
    subtaskID: any,
    timestamp: any
  ) => {
    const fetchData = async () => {
      try {
        const url = "/api/postTaskResolutionSimpleCheck";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            hora_inicio: timestamp,
            fk_subtarea: subtaskID,
            fk_turnaround: turnaroundID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("postTaskResolutionSimpleCheck", result);

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

  const PostTaskResolutionDoubleCheck = async (
    turnaroundID: any,
    subtaskID: any,
    timestampStart: any,
    timestampEnd: any
  ) => {
    const fetchData = async () => {
      try {
        const url = "/api/postTaskResolutionDoubleCheck";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            hora_inicio: timestampStart,
            hora_fin: timestampEnd,
            fk_subtarea: subtaskID,
            fk_turnaround: turnaroundID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            //console.log("postTaskResolutionDoubleCheck", result);

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

  const getTasksCompletionsList = async (turnaroundID: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/getTasksCompletionList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            turnaroundID: turnaroundID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            formatTasksForPDFArray(result);
            //console.log("getTasksCompletionsList  Array", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const patchStartHourDate = async (
    turnaroundID: any,
    hour: any,
    date: any
  ) => {
    const fetchData = async () => {
      try {
        const url = "/api/updateStartHourDateTurnaround";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            turnaroundID: turnaroundID,
            hora_inicio: hour,
            fecha_inicio: date,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("patchFinishHourDate Array", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const patchFinishHourDate = async (
    turnaroundID: any,
    hour: any,
    date: any
  ) => {
    const fetchData = async () => {
      try {
        const url = "/api/updateFinishHourDateTurnaround";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            turnaroundID: turnaroundID,
            hora_fin: hour,
            fecha_fin: date,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("patchFinishHourDate Array", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const PostTaskImage = async (
    turnaroundID: any,
    subtaskID: any,
    imageFile: any
  ) => {
    const uploadData = new FormData();
    uploadData.append("imagen", imageFile, imageFile?.name);
    uploadData.append("fk_turnaround", turnaroundID);
    uploadData.append("fk_subtarea", subtaskID);

    fetch(
      "http://127.0.0.1:8000/documentos/imagen/?token=" +
        localStorage.getItem("userToken"),
      {
        method: "POST",
        body: uploadData,
      }
    )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const handleSendData = async () => {
    //openDetailDialogID es el id del turnaround
    await handleSetTurnaroundStateTo3(flightID);
    //arrayOfComments es el arrlego de comentarios
    await arrayOfComments.map(async (index: any) => {
      await PostTaskResolutionComment(
        openDetailDialogID,
        index?.key,
        index?.text
      ); //para cada instancia del arreglo de comentarios
    });

    //arrayOfCheckedHours es el arrlego de checks individiales
    await arrayOfCheckedHours.map(async (index: any) => {
      await PostTaskResolutionSimpleCheck(
        openDetailDialogID,
        index?.key,
        index?.timestamp
      ); //para cada instancia del arreglo de comentarios
    });

    //arrayOfCheckedHoursStartEnd es el arrlego de cchecks dobles
    await arrayOfCheckedHoursStartEnd.map(async (index: any) => {
      await PostTaskResolutionDoubleCheck(
        openDetailDialogID,
        index?.key,
        index?.timestampStart,
        index?.timestampEnd
      ); //para cada instancia del arreglo de comentarios
    });

    //arrayOfCheckedHours es el arrlego de checks individiales
    await arrayOfImages.map(async (index: any) => {
      await PostTaskImage(openDetailDialogID, index?.key, index?.taskImage); //para cada instancia del arreglo de comentarios
    });

    let currentTimestamp = new Date();
    let currentTimestampString =
      currentTimestamp.getHours().toString() +
      ":" +
      currentTimestamp.getMinutes().toString() +
      ":" +
      currentTimestamp.getSeconds().toString();

    let x =
      currentTimestamp.getFullYear().toString() +
      "-" +
      (currentTimestamp.getMonth() + 1).toString() +
      "-" +
      currentTimestamp.getDate().toString();

    await patchFinishHourDate(openDetailDialogID, currentTimestampString, x);

    router.reload();
  };

  //ordenar y formatear el arreglo
  const formatTasksForPDFArray = (result: any) => {
    let y: any[] = [];

    result?.comentarios.map((value: any) => {
      //console.log("value", value);
      y.push({
        key: value?.fk_subtarea__id,
        name: value?.fk_subtarea__titulo,
        value: "Comentario: " + value?.comentario,
      });
    });
    result?.horas.map((value: any) => {
      //console.log("value", value);
      y.push({
        key: value?.fk_subtarea__id,
        name: value?.fk_subtarea__titulo,
        value: "Hora inicio: " + value?.hora_inicio,
      });
    });
    result?.horas_inicio_fin.map((value: any) => {
      //console.log("value", value);
      y.push({
        key: value?.fk_subtarea__id,
        name: value?.fk_subtarea__titulo,
        value:
          "hora inicio: " +
          value?.hora_inicio +
          " - " +
          "hora fin: " +
          value?.hora_fin,
      });
    });

    let resultOfSorting: any[] = [];
    resultOfSorting = y.sort((a, b) => a.key - b.key);
    setTasksCompletionValues(resultOfSorting);
  };

  const ArrayPrinterTaskDataForSummary = () => {
    let y: any = [];
    let cont = 0;
    console.log("tasksCompletionValues", tasksCompletionValues);
    tasksCompletionValues.map((index: any) => {
      cont++;
      y[index?.key] = (
        <>
          <div className={styles.taskDetailContainer}>
            <span className={styles.taskDetailTitleText}>{index?.name}:</span>
            <span className={styles.taskDetailText}> {index?.value}</span>
          </div>
        </>
      );
    });

    return y;
  };

  const getDateForCalendar = () => {
    let x =
      date.getDate().toString() +
      " - " +
      (date.getMonth() + 1).toString() +
      " - " +
      date.getFullYear().toString();
    console.log("userToken", localStorage.getItem("userToken"));
    setdateState(x);
    return <></>;
  };

  const backDateButton = async () => {
    await setdateCounter(dateCounter - 1);
    date = new Date(new Date().setDate(new Date().getDate() + dateCounter - 1));
    getDateForCalendar();
    getList();
  };

  const frontDateButton = async () => {
    await setdateCounter(dateCounter + 1);
    date = new Date(new Date().setDate(new Date().getDate() + dateCounter + 1));
    getDateForCalendar();
    getList();
  };

  const handleAddMachinery = async (machineCategoryID: any) => {
    await setSelectedMachineID(machineCategoryID);
    await setAddMachineDialog(true);
  };
  const handleAddPersonnel = async (departmentID: any) => {
    await setSelectedDepartmentID(departmentID);
    await setAddPersonnelDialog(true);
  };

  const handleShowMachinery = async (machineCategoryID: any) => {
    await setSelectedMachineID(machineCategoryID);
    await setAux(true);
    await setShowMachineDialog(true);
  };

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

  const handleDeleteFlight = async (flightID: number) => {
    flightMachine(flightID);
  };

  const arrayPrinterSelectedMachinesForCategory = (category: any) => {
    let y: any = [];
    machinesToPostArray.map((index: any) => {
      if (index?.categoryID === category) {
        y[index.id] = (
          <div key={index.id} className={styles.tableInfoRow}>
            <p>{index?.machineID}</p>
            <p>ola</p>
          </div>
        );
      }
    });
    //setMachinesToPostArray(machinesToPostArray);
    //getMachinesList();
    return y;
  };

  const PersonnelQuantitiesArrayPrinter = () => {
    let y: any = [];
    let auxtitle = "";
    let auxtitleBoolean = true;
    let counter = 0;
    personnelDepartmentsarrayList.map((index: any) => {
      y[counter] = (
        <div className={styles.detailDialogInfoRow1}>
          <Dialog
            className={styles.dialogDelete}
            open={addPersonnelDialog}
            onClose={() => setAddPersonnelDialog(false)}
          >
            <div className={styles.dialogAddMachine}>
              Cliquea una persona para añadirla:
              {arrayPrinterPersonnelSelection(index?.id)}
              <div>
                <GreenButton
                  executableFunction={() => setAddPersonnelDialog(false)}
                  buttonText="Confirmar"
                />
              </div>
              {reservedTask && (
                <div className={styles.machineReservedContainer}>
                  <p>La persona que intentas añadir esta reservada!</p>
                  <div
                    className={styles.closeIconContainer}
                    onClick={() => setreservedTask(false)}
                  >
                    <CloseRoundedIcon htmlColor="#bbb" />
                  </div>
                </div>
              )}
            </div>
          </Dialog>
          <Dialog
            className={styles.dialogDelete}
            open={showMachineDialog}
            onClose={() => setShowMachineDialog(false)}
          >
            <div className={styles.dialogAddMachine}>
              Lista de personas añadidas:
              {arrayPrinterShowSelectedMachines(index?.fk_categoria?.id)}
            </div>
          </Dialog>
          <div className={styles.addMachineItem}>
            <span className={styles.detailDialogInfoItemValueText2}>
              {index?.nombre} :
            </span>

            <span className={styles.detailDialogInfoItemValueText2}>
              {/**array printer de machinesToPostArray que haga match con la categoria */}
              {arrayPrinterSelectedMachinesForCategory(index?.fk_categoria?.id)}
            </span>
            <div className={styles.addMachineryButtonIcon}>
              <AddCircleRoundedIcon
                htmlColor="#bbb"
                onClick={() => {
                  handleAddPersonnel(index?.id);
                }}
              />
            </div>
          </div>
        </div>
      );
      counter++;
    });

    return y;
  };

  const MachineryQuantitiesArrayPrinter = () => {
    let y: any = [];
    let auxtitle = "";
    let auxtitleBoolean = true;
    let counter = 0;
    machinesQuantityByTemplatearrayList.map((index: any) => {
      if (auxtitle === index?.fk_tarea?.titulo) {
        auxtitleBoolean = false;
      }
      if (
        !machineryQuantityArrayAux.find(
          (o) => o.id_categoria === index?.fk_categoria?.id
        )
      ) {
        machineryQuantityArrayAux.push({
          cantidad: index?.cantidad,
          id_categoria: index?.fk_categoria?.id,
          id_plantilla: index?.fk_plantilla?.id,
        });
      }

      y[counter] = (
        <div className={styles.detailDialogInfoRow1}>
          <Dialog
            className={styles.dialogDelete}
            open={addMachineDialog}
            onClose={() => setAddMachineDialog(false)}
          >
            <div className={styles.dialogAddMachine}>
              Cliquea una maquinaria para añadirla:
              {arrayPrinterMachinesSelection(index?.fk_categoria?.id)}
              <div>
                <GreenButton
                  executableFunction={() => setAddMachineDialog(false)}
                  buttonText="Confirmar"
                />
              </div>
              {reservedTask && (
                <div className={styles.machineReservedContainer}>
                  <p>La maquinaria que intentas añadir esta reservada!</p>
                  <div
                    className={styles.closeIconContainer}
                    onClick={() => setreservedTask(false)}
                  >
                    <CloseRoundedIcon htmlColor="#bbb" />
                  </div>
                </div>
              )}
            </div>
          </Dialog>
          <Dialog
            className={styles.dialogDelete}
            open={showMachineDialog}
            onClose={() => setShowMachineDialog(false)}
          >
            <div className={styles.dialogAddMachine}>
              Lista de maquinarias añadidas:
              {arrayPrinterShowSelectedMachines(index?.fk_categoria?.id)}
            </div>
          </Dialog>
          <div className={styles.addMachineItem}>
            <span className={styles.detailDialogInfoItemValueText2}>
              {index?.fk_categoria?.nombre} (Se requieren: {index?.cantidad}{" "}
              maquinarias) :
            </span>

            <span className={styles.detailDialogInfoItemValueText2}>
              {/**array printer de machinesToPostArray que haga match con la categoria */}
              {arrayPrinterSelectedMachinesForCategory(index?.fk_categoria?.id)}
            </span>
            <div className={styles.addMachineryButtonIcon}>
              <AddCircleRoundedIcon
                htmlColor="#bbb"
                onClick={() => {
                  handleAddMachinery(index?.fk_categoria?.id);
                }}
              />
            </div>
          </div>
        </div>
      );
      counter++;
    });

    return y;
  };

  const handleSaveData = async () => {
    for (let i = 0; i < machinesToPostArray.length; i++) {
      await postMachineReservartion(machinesToPostArray[i]?.machineID);
    }
    //luego lo mismo para personal, un for para cada personal
    for (let i = 0; i < personnelToPostArray.length; i++) {
      await postPersonReservartion(personnelToPostArray[i]?.personID);
    }

    //router reload
  };

  const findMachineInPostArray = (selectedMachineModelID: any) => {
    for (let i = 0; i < machinesToPostArray.length; i++) {
      if (machinesToPostArray[i]?.machineID === selectedMachineModelID) {
        return true;
      }
    }
    return false;
  };
  const findPersonInPostArray = (selectedPersonID: any) => {
    for (let i = 0; i < personnelToPostArray.length; i++) {
      if (personnelToPostArray[i]?.personID === selectedPersonID) {
        return true;
      }
    }
    return false;
  };
  const findMachineInReservationsArray = (selectedMachineModelID: any) => {
    for (let i = 0; i < machinesReservationsarrayList.length; i++) {
      if (
        machinesReservationsarrayList[i]?.fk_maquinaria?.id ===
        selectedMachineModelID
      ) {
        return true;
      }
    }
    return false;
  };

  const findPersonInReservationsArray = (selectedPersonID: any) => {
    for (let i = 0; i < personnelReservationsarrayList.length; i++) {
      if (
        personnelReservationsarrayList[i]?.fk_usuario?.id === selectedPersonID
      ) {
        return true;
      }
    }
    return false;
  };

  const removeMachinefromPage = (selectedMachineModelID: any) => {
    let arrayOfMachinesToPush: any = [];
    let x = 0;
    let machineCategory = -1;
    let nombre = "";
    while (x <= machinesToPostArray.length) {
      if (machinesToPostArray[x]?.machineID === selectedMachineModelID) {
        //delete that instance from posting array
        arrayOfMachinesToPush = machinesToPostArray;
        arrayOfMachinesToPush.splice(x, 1);
        setMachinesToPostArray(arrayOfMachinesToPush);
        x++;
      } else {
        x++;
      }
    }
    x = 0;
  };

  const removePersonfromPage = (selectedPersonID: any) => {
    let arrayOfPersonsToPush: any = [];
    let x = 0;
    let machineCategory = -1;
    let nombre = "";
    while (x <= machinesToPostArray.length) {
      if (personnelToPostArray[x]?.personID === selectedPersonID) {
        //delete that instance from posting array
        arrayOfPersonsToPush = personnelToPostArray;
        arrayOfPersonsToPush.splice(x, 1);
        setPersonnelToPostArray(arrayOfPersonsToPush);
        x++;
      } else {
        x++;
      }
    }
    x = 0;
  };

  const addMachineToPage = (selectedMachineModelID: any) => {
    let arrayOfMachinesToPush: any = [];
    let x = 0;
    let cantidad = -1;
    let machineCategory = -1;
    let nombre = "";
    while (x <= machinesarrayList.length) {
      if (machinesarrayList[x]?.id === selectedMachineModelID) {
        machineCategory = machinesarrayList[x]?.fk_categoria?.id;
        //push into array the machine added
        nombre = machinesarrayList[x]?.identificador;
        console.log("x1", machineCategory);
      }
      x++;
    }
    x = 0;

    while (x <= machinesQuantityByTemplatearrayList.length) {
      if (
        machinesQuantityByTemplatearrayList[x]?.fk_categoria?.id ===
        machineCategory
      ) {
        cantidad = machinesQuantityByTemplatearrayList[x]?.cantidad;
        //push into array the machine added
      }
      x++;
    }
    if (findMachineInPostArray(selectedMachineModelID) === false) {
      arrayOfMachinesToPush = machinesToPostArray;
      arrayOfMachinesToPush.push({
        machineID: selectedMachineModelID,
        categoryID: machineCategory,
        machineName: nombre,
      });
      setMachinesToPostArray(arrayOfMachinesToPush);
    } else {
      //remove from array the added object
    }
  };

  const addPersonToPage = (selectedPersonID: any) => {
    let arrayOfPersonnelToPush: any = [];
    let x = 0;
    let cantidad = -1;
    let personDepartment = -1;
    let nombre = "";
    while (x <= personnelListArray.length) {
      if (personnelListArray[x]?.id === selectedPersonID) {
        personDepartment = personnelListArray[x]?.fk_departamento?.id;
        //push into array the machine added
        nombre =
          personnelListArray[x]?.fk_user?.first_name +
          personnelListArray[x]?.fk_user?.last_name;
      }
      x++;
    }
    x = 0;

    if (findPersonInPostArray(selectedPersonID) === false) {
      arrayOfPersonnelToPush = personnelToPostArray;
      arrayOfPersonnelToPush.push({
        personID: selectedPersonID,
        departmentID: personDepartment,
        machineName: nombre,
      });
      setPersonnelToPostArray(arrayOfPersonnelToPush);
    } else {
      //remove from array the added object
    }
  };

  const arrayPrinterMachinesSelection = (machineCategoryID: any) => {
    let y: any = [];

    machinesarrayList.map((index: any) => {
      if (index?.fk_categoria?.id === selectedMachineID) {
        if (index?.estado) {
          y[index?.id] = (
            <div
              key={index?.id}
              className={styles.machineContainer}
              onClick={async () => {
                if (findMachineInReservationsArray(index?.id)) {
                  setreservedTask(true);
                  setTimeout(() => {
                    setreservedTask(false);
                  }, 5000);
                } else {
                  if (findMachineInPostArray(index?.id)) {
                    await removeMachinefromPage(index?.id);
                    await setcheckTask(false);
                    await setcheckTaskID(checkTaskID - 1);
                  } else {
                    await addMachineToPage(index?.id);
                    await setcheckTask(true);
                    await setcheckTaskID(index?.id);
                  }
                }
              }}
            >
              <p className={styles.taskTextText}> {index?.identificador}</p>
              {(checkTask && checkTaskID === index?.id) ||
              findMachineInPostArray(index?.id) ? (
                <div className={styles.checkIcon}>
                  <CheckCircleRoundedIcon
                    htmlColor="#00A75D"
                    fontSize="small"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        }
      }
    });

    return y;
  };

  const arrayPrinterPersonnelSelection = (departmentID: any) => {
    let y: any = [];

    personnelListArray.map((index: any) => {
      if (index?.fk_departamento?.id === selectedDepartmentID) {
        if (index?.fk_user?.is_active) {
          y[index?.id] = (
            <div
              key={index?.id}
              className={styles.machineContainer}
              onClick={async () => {
                if (findPersonInReservationsArray(index?.id)) {
                  setreservedTask(true);
                  setTimeout(() => {
                    setreservedTask(false);
                  }, 5000);
                } else {
                  if (findPersonInPostArray(index?.id)) {
                    await removePersonfromPage(index?.id);
                    await setcheckTask(false);
                    await setcheckTaskID(checkTaskID - 1);
                  } else {
                    await addPersonToPage(index?.id);
                    await setcheckTask(true);
                    await setcheckTaskID(index?.id);
                  }
                }
              }}
            >
              <p className={styles.taskTextText}>
                {" "}
                {index?.fk_user?.first_name} {index?.fk_user?.last_name}
              </p>
              {(checkTask && checkTaskID === index?.id) ||
              findMachineInPostArray(index?.id) ? (
                <div className={styles.checkIcon}>
                  <CheckCircleRoundedIcon
                    htmlColor="#00A75D"
                    fontSize="small"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        }
      }
    });

    return y;
  };

  const arrayPrinterShowSelectedMachines = (machineCategoryID: any) => {
    let y: any = [];
    let enoughMachines = false;

    machinesToPostArray.map((index: any) => {
      if (index?.categoryID === machineCategoryID) {
        enoughMachines = true;
        y[index?.id] = (
          <div key={index?.id} className={styles.machineContainerNoHover}>
            <p className={styles.taskTextText}> {index?.machineName}</p>
            <p>ola</p>
          </div>
        );
      }
    });
    return y;
  };

  const PersonnelArrayPrinter = () => {
    let y: any = [];
    let auxtitle = "";
    let auxtitleBoolean = true;
    let counter = 0;

    personnelByTurnaroundArrayList.map((index: any) => {
      if (auxtitle === index?.fk_usuario?.fk_departamento?.nombre) {
        auxtitleBoolean = false;
      }
      console.log("index personal ", index);
      if (
        index?.fk_usuario?.fk_user?.first_name != undefined ||
        index?.fk_usuario?.fk_user?.last_name != undefined ||
        index?.fk_usuario?.fk_cargo?.nombre != undefined
      ) {
        y[counter] = (
          <div key={index?.id} className={styles.taskText}>
            {auxtitleBoolean && (
              <p className={styles.taskTextTitle}>
                {index?.fk_usuario?.fk_departamento?.nombre}
              </p>
            )}
            <p className={styles.taskTextText}>
              -{" "}
              {index?.fk_usuario?.fk_user?.first_name +
                " " +
                index?.fk_usuario?.fk_user?.last_name +
                ", " +
                index?.fk_usuario?.fk_cargo?.nombre}
            </p>
          </div>
        );
      }
      auxtitleBoolean = true;
      counter++;
      auxtitle = index?.fk_usuario?.fk_departamento?.nombre;
    });

    return y;
  };

  const MachinesArrayPrinter = () => {
    let y: any = [];
    let auxtitle = "";
    let auxtitleBoolean = true;
    let counter = 0;
    machinesByTurnaroundArrayList.map((index: any) => {
      if (auxtitle === index?.fk_maquinaria?.fk_categoria?.nombre) {
        auxtitleBoolean = false;
      }
      if (
        index?.fk_maquinaria?.identificador != undefined ||
        index?.fk_maquinaria?.fk_categoria?.nombre != undefined
      ) {
        y[counter] = (
          <div key={index?.id} className={styles.taskText}>
            {auxtitleBoolean && (
              <p className={styles.taskTextTitle}>
                {index?.fk_maquinaria?.fk_categoria?.nombre}
              </p>
            )}
            <p className={styles.taskTextText}>
              - {index?.fk_maquinaria?.identificador}
            </p>
          </div>
        );
        auxtitleBoolean = true;
        counter++;
        auxtitle = index?.fk_maquinaria?.fk_categoria?.nombre;
      }
    });

    return y;
  };

  const GetTaskArrayCheckTimestamp = (idSubtarea: any, title: any) => {
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfCheckedHours; //array con las que ya estan checkeadas

    let x = auxiliaryArray.find((o) => o.key === idSubtarea);
    //encuentra la tarea
    let result = arrayOfCheckedHours.filter((item) => item?.key == idSubtarea);

    if (result.length === 0) {
      return (
        <>
          <p className={styles.checkTaskText}></p>{" "}
        </>
      );
    } else {
      return (
        <>
          <Dialog
            className={styles.dialogDelete}
            open={manualHourDialog}
            onClose={() => setmanualHourDialog(false)}
          >
            <div className={styles.dialogBack}>
              <div className={styles.dialogText}>
                <p>
                  <strong>
                    Introduzca la hora manual que desea introducir a la tarea
                    tipo check (formato 24hrs):{" "}
                  </strong>
                </p>
                <div className={styles.manualHoursInputsContainer}>
                  <p>Horas:</p>
                  <StandardInput
                    setValue={setmanualHourValue}
                    inputText=""
                    inputWidth="55px"
                  />
                  <p>Minuto:</p>
                  <StandardInput
                    setValue={setmanualMinuteValue}
                    inputText=""
                    inputWidth="55px"
                  />
                  <p>Segundos:</p>
                  <StandardInput
                    setValue={setmanualSecondsValue}
                    inputText=""
                    inputWidth="55px"
                  />
                </div>
                <div className={styles.dialogButtons}>
                  <GreenButton2
                    executableFunction={() => {
                      SetTaskArrayChecks2(
                        subtaskIDForchange,
                        subtaskTitleForchange,
                        manualHourValue +
                          ":" +
                          manualMinuteValue +
                          ":" +
                          manualSecondsValue
                      );
                      setmanualHourDialog(false);
                    }}
                    buttonText="Confirmar"
                  />
                  <RedButton2
                    executableFunction={() => setmanualHourDialog(false)}
                    buttonText="Cancelar"
                  />
                </div>
              </div>
            </div>
          </Dialog>
          <p
            className={styles.checkTaskText}
            onClick={() => {
              //chenge id subtarea and title of subtarea to a state variable
              setsubtaskIDForchange(idSubtarea);
              setsubtaskTitleForchange(title);
              setmanualHourDialog(true);
              console.log("Se hizo tap en ", idSubtarea, title);
            }}
          >
            Inicio: {result[0]?.timestamp}
          </p>{" "}
        </>
      );
    }
  };

  const GetTaskArrayCheckTimestampOnlyStart = (idSubtarea: any, title: any) => {
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfCheckedHoursStartEnd; //array con las que ya estan checkeadas

    let x = auxiliaryArray.find((o) => o.key === idSubtarea);
    //si existe la borro
    let result = arrayOfCheckedHoursStartEnd.filter(
      (item) => item?.key == idSubtarea
    );

    if (result.length === 0) {
      return (
        <>
          <p className={styles.checkTaskText}></p>{" "}
        </>
      );
    } else {
      return (
        <>
          <Dialog
            className={styles.dialogDelete}
            open={manualHourDialogOnlyStart}
            onClose={() => setmanualHourDialogOnlyStart(false)}
          >
            <div className={styles.dialogBack}>
              <div className={styles.dialogText}>
                <p>
                  <strong>
                    Introduzca la hora manual que desea introducir a la tarea
                    tipo doble check (formato 24hrs):{" "}
                  </strong>
                </p>
                <div className={styles.manualHoursInputsContainer}>
                  <p>Horas:</p>
                  <StandardInput
                    setValue={setmanualHourValue}
                    inputText=""
                    inputWidth="55px"
                  />
                  <p>Minuto:</p>
                  <StandardInput
                    setValue={setmanualMinuteValue}
                    inputText=""
                    inputWidth="55px"
                  />
                  <p>Segundos:</p>
                  <StandardInput
                    setValue={setmanualSecondsValue}
                    inputText=""
                    inputWidth="55px"
                  />
                  <p className={styles.dialogTextRed}>
                    <strong>
                      ASEGURATE DE QUE EL CHECK DE FIN NO ESTÉ CLIQUEADO AL
                      CAMBIAR ESTA HORA
                    </strong>
                  </p>
                </div>
                <div className={styles.dialogButtons}>
                  <GreenButton2
                    executableFunction={() => {
                      SetTaskArrayChecksOnlyStart2(
                        subtaskIDForchange,
                        subtaskTitleForchange,
                        manualHourValue +
                          ":" +
                          manualMinuteValue +
                          ":" +
                          manualSecondsValue
                      );
                      setmanualHourDialogOnlyStart(false);
                    }}
                    buttonText="Confirmar"
                  />
                  <RedButton2
                    executableFunction={() =>
                      setmanualHourDialogOnlyStart(false)
                    }
                    buttonText="Cancelar"
                  />
                </div>
              </div>
            </div>
          </Dialog>
          <p
            className={styles.checkTaskText}
            onClick={() => {
              setmanualHourDialogOnlyStart(true);
              setsubtaskIDForchange(idSubtarea);
              setsubtaskTitleForchange(title);
              //
              console.log("Se hizo tap en ", idSubtarea, title);
            }}
          >
            Inicio: {result[0]?.timestampStart}
          </p>{" "}
        </>
      );
    }
  };

  const GetTaskArrayCheckTimestampOnlyEnd = (idSubtarea: any, title: any) => {
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfCheckedHoursStartEnd; //array con las que ya estan checkeadas

    let x = auxiliaryArray.find((o) => o.key === idSubtarea);
    //si existe la borro
    let result = arrayOfCheckedHoursStartEnd.filter(
      (item) => item?.key == idSubtarea
    );

    if (result.length === 0) {
      return (
        <>
          <p className={styles.checkTaskText}></p>{" "}
        </>
      );
    } else {
      return (
        <>
          <Dialog
            className={styles.dialogDelete}
            open={manualHourDialogOnlyEnd}
            onClose={() => setmanualHourDialogOnlyStart(false)}
          >
            <div className={styles.dialogBack}>
              <div className={styles.dialogText}>
                <p>
                  <strong>
                    Introduzca la hora manual que desea introducir a la tarea
                    tipo doble check (formato 24hrs):{" "}
                  </strong>
                </p>
                <div className={styles.manualHoursInputsContainer}>
                  <p>Horas:</p>
                  <StandardInput
                    setValue={setmanualHourValue}
                    inputText=""
                    inputWidth="55px"
                  />
                  <p>Minuto:</p>
                  <StandardInput
                    setValue={setmanualMinuteValue}
                    inputText=""
                    inputWidth="55px"
                  />
                  <p>Segundos:</p>
                  <StandardInput
                    setValue={setmanualSecondsValue}
                    inputText=""
                    inputWidth="55px"
                  />
                </div>
                <div className={styles.dialogButtons}>
                  <GreenButton2
                    executableFunction={() => {
                      SetTaskArrayChecksOnlyEnd2(
                        subtaskIDForchange,
                        subtaskTitleForchange,
                        manualHourValue +
                          ":" +
                          manualMinuteValue +
                          ":" +
                          manualSecondsValue
                      );
                      setmanualHourDialogOnlyEnd(false);
                    }}
                    buttonText="Confirmar"
                  />
                  <RedButton2
                    executableFunction={() => setmanualHourDialogOnlyEnd(false)}
                    buttonText="Cancelar"
                  />
                </div>
              </div>
            </div>
          </Dialog>
          <p
            className={styles.checkTaskText}
            onClick={() => {
              setmanualHourDialogOnlyEnd(true);
              setsubtaskIDForchange(idSubtarea);
              setsubtaskTitleForchange(title);
              //
              console.log("Se hizo tap en ", idSubtarea, title);
            }}
          >
            Fin: {result[0]?.timestampEnd}
          </p>{" "}
        </>
      );
    }
  };

  const SetInputInArray = (idSubtarea: any, textoValue: any) => {
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfComments; //array con las que ya estan checkeadas
    let x = auxiliaryArray.find((o) => o.key === idSubtarea);

    if (x == undefined) {
      //si no existe, la meto en el array

      auxiliaryArray.push({
        key: idSubtarea,
        text: textoValue,
      });
      setArrayOfComments(auxiliaryArray);
    } else {
      //si existe la edito
      auxiliaryArray.find((o) => o.key === idSubtarea).text = textoValue;

      setArrayOfComments(auxiliaryArray);
    }
  };

  const SetTaskArrayChecks = (idSubtarea: any, tituloSubtarea: any) => {
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfCheckedHours; //array con las que ya estan checkeadas

    let x = auxiliaryArray.find((o) => o.key === idSubtarea);

    if (x == undefined) {
      //si no existe, la meto en el array

      let currentTimestamp = new Date();
      let currentTimestampString =
        currentTimestamp.getHours().toString() +
        ":" +
        currentTimestamp.getMinutes().toString() +
        ":" +
        currentTimestamp.getSeconds().toString();

      auxiliaryArray.push({
        key: idSubtarea,
        name: tituloSubtarea,
        timestamp: currentTimestampString,
      });
      setArrayOfCheckedHours(auxiliaryArray);
    } else {
      //si existe la borro
      let filteredArray = auxiliaryArray.filter(
        (item) => item.key !== idSubtarea
      );
      setArrayOfCheckedHours(filteredArray);
    }
    console.log("arrayOfCheckedHours", arrayOfCheckedHours);
  };

  const SetTaskArrayChecks2 = (
    idSubtarea: any,
    tituloSubtarea: any,
    manualTime: string
  ) => {
    console.log(
      "se va a proceder a cambiar la subtarea" +
        tituloSubtarea +
        " de id: " +
        idSubtarea +
        " con la hora : " +
        manualTime
    );
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfCheckedHours; //array con las que ya estan checkeadas

    let x = auxiliaryArray.find((o) => o.key === idSubtarea);

    //si existe la borro

    let filteredArray = auxiliaryArray.filter(
      (item) => item.key !== idSubtarea
    );
    setArrayOfCheckedHours(filteredArray);
    filteredArray.push({
      key: idSubtarea,
      name: tituloSubtarea,
      timestamp: manualTime,
    });
    setArrayOfCheckedHours(filteredArray);

    console.log("arrayOfCheckedHours", arrayOfCheckedHours);
  };

  const SetTaskArrayChecksOnlyStart = (
    idSubtarea: any,
    tituloSubtarea: any
  ) => {
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfCheckedHoursStartEnd; //array con las que ya estan checkeadas

    let x = auxiliaryArray.find((o) => o.key === idSubtarea);

    if (x == undefined) {
      //si no existe, la meto en el array
      let currentTimestamp = new Date();
      let currentTimestampString =
        currentTimestamp.getHours().toString() +
        ":" +
        currentTimestamp.getMinutes().toString() +
        ":" +
        currentTimestamp.getSeconds().toString();

      auxiliaryArray.push({
        key: idSubtarea,
        name: tituloSubtarea,
        timestampStart: currentTimestampString,
        timestampEnd: "",
      });
      setArrayOfCheckedHoursStartEnd(auxiliaryArray);
    } else {
      //si existe la borro
      let filteredArray = auxiliaryArray.filter(
        (item) => item.key !== idSubtarea
      );
      setArrayOfCheckedHoursStartEnd(filteredArray);
    }
    console.log("arrayOfCheckedHoursStartEnd", arrayOfCheckedHoursStartEnd);
  };

  const SetTaskArrayChecksOnlyStart2 = (
    idSubtarea: any,
    tituloSubtarea: any,
    manualTime: string
  ) => {
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfCheckedHoursStartEnd; //array con las que ya estan checkeadas

    let x = auxiliaryArray.find((o) => o.key === idSubtarea);

    //si existe la borro

    let filteredArray = auxiliaryArray.filter(
      (item) => item.key !== idSubtarea
    );
    setArrayOfCheckedHoursStartEnd(filteredArray);
    filteredArray.push({
      key: idSubtarea,
      name: tituloSubtarea,
      timestampStart: manualTime,
      timestampEnd: "",
    });
    setArrayOfCheckedHoursStartEnd(filteredArray);
    console.log("arrayOfCheckedHoursStartEnd", filteredArray);
  };

  const SetTaskArrayChecksOnlyEnd = (idSubtarea: any, tituloSubtarea: any) => {
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfCheckedHoursStartEnd; //array con las que ya estan checkeadas

    let x = auxiliaryArray.find((o) => o.key === idSubtarea);

    if (x == undefined) {
      //si no existe

      setArrayOfCheckedHoursStartEnd(auxiliaryArray);
    } else {
      //existe
      //si  timestampEnd NO existe meto el valor de finalizacion
      if (
        auxiliaryArray.find((o) => o.key === idSubtarea).timestampEnd === ""
      ) {
        let currentTimestamp = new Date();
        let currentTimestampString =
          currentTimestamp.getHours().toString() +
          ":" +
          currentTimestamp.getMinutes().toString() +
          ":" +
          currentTimestamp.getSeconds().toString();

        auxiliaryArray.find((o) => o.key === idSubtarea).timestampEnd =
          currentTimestampString;

        setArrayOfCheckedHoursStartEnd(auxiliaryArray);
      } else {
        auxiliaryArray.find((o) => o.key === idSubtarea).timestampEnd = "";
      }
    }
    console.log("arrayOfCheckedHoursStartEnd", arrayOfCheckedHoursStartEnd);
  };

  const SetTaskArrayChecksOnlyEnd2 = (
    idSubtarea: any,
    tituloSubtarea: any,
    timestampToEdit: any
  ) => {
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfCheckedHoursStartEnd; //array con las que ya estan checkeadas

    let x = auxiliaryArray.find((o) => o.key === idSubtarea);

    //existe
    //si  timestampEnd NO existe meto el valor de finalizacion

    auxiliaryArray.find((o) => o.key === idSubtarea).timestampEnd =
      timestampToEdit;

    setArrayOfCheckedHoursStartEnd(auxiliaryArray);

    console.log("arrayOfCheckedHoursStartEnd changed", auxiliaryArray);
  };

  const SetTaskArrayImages = (idSubtarea: any, metadataBlob: any) => {
    let auxiliaryArray = [];
    auxiliaryArray = arrayOfImages; //array con las que ya estan checkeadas

    let x = auxiliaryArray.find((o) => o.key === idSubtarea);

    if (x == undefined) {
      //si no existe, la meto en el array
      let currentTimestamp = new Date();

      auxiliaryArray.push({
        key: idSubtarea,
        taskImage: metadataBlob,
      });
      setArrayOfImages(auxiliaryArray);
    } else {
      //si existe la borro e inserto la nueva
      let filteredArray = auxiliaryArray.filter(
        (item) => item.key !== idSubtarea
      );
      filteredArray.push({
        key: idSubtarea,
        taskImage: metadataBlob,
      });
      setArrayOfImages(filteredArray);
    }
  };

  const handleSetTurnaroundStateTo2 = async (
    flightIdentificationValue: any
  ) => {
    let currentTimestamp = new Date();
    let currentTimestampString =
      currentTimestamp.getHours().toString() +
      ":" +
      currentTimestamp.getMinutes().toString() +
      ":" +
      currentTimestamp.getSeconds().toString();

    let x =
      currentTimestamp.getFullYear().toString() +
      "-" +
      (currentTimestamp.getMonth() + 1).toString() +
      "-" +
      currentTimestamp.getDate().toString();

    await patchStartHourDate(openDetailDialogID, currentTimestampString, x);
    //request para updatear el estado dew turnaround a "enb proceso"
    await setState1Overider(true);
    await updateFlightStateInProgress(flightID);
    await setTurnaroundState(2);
  };
  const handleSetTurnaroundStateTo3 = async (
    flightIdentificationValue: any
  ) => {
    //request para updatear el estado dew turnaround a "finalizado"
    await updateFlightStateFinalized(flightID);
  };
  const TasksArrayPrinter = () => {
    let y: any = [];
    let auxtitle = "";
    let auxtitleBoolean = true;
    let counter = 0;
    tasksarrayList.map((index: any) => {
      if (auxtitle === index?.fk_tarea?.titulo) {
        auxtitleBoolean = false;
      }
      y[counter] = (
        <div key={index?.id} className={styles.taskText}>
          {auxtitleBoolean && (
            <p className={styles.taskTextTitle}>{index?.fk_tarea?.titulo}</p>
          )}
          <div className={styles.taskAndCheckContainer}>
            <p className={styles.detailDialogInfoItemValueText}>
              {index?.titulo}
            </p>
            {index?.fk_tipo?.id == 1 ? ( //comentario
              <div className={styles.inputBox}>
                <Input
                  color="success"
                  disableUnderline
                  className={styles.inputText}
                  onChange={({ target: { value } }) =>
                    SetInputInArray(index?.id, value)
                  }
                />
              </div>
            ) : index?.fk_tipo?.id == 2 ? ( //hora de inicio
              <div className={styles.checksAndTimestampsContainer}>
                {GetTaskArrayCheckTimestamp(index?.id, index?.titulo)}
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                  color="success"
                  onChange={() => {
                    SetTaskArrayChecks(index?.id, index?.titulo); //anade al arreglo de insercion el item y hora de clickeado
                  }}
                />
              </div>
            ) : index?.fk_tipo?.id == 3 ? ( //hora de inicio y fin
              <div className={styles.checksAndTimestampsContainer}>
                {GetTaskArrayCheckTimestampOnlyStart(index?.id, index?.titulo)}
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                  color="success"
                  onChange={() => {
                    SetTaskArrayChecksOnlyStart(index?.id, index?.titulo); //anade al arreglo de insercion el item y hora de clickeado
                  }}
                />
                {GetTaskArrayCheckTimestampOnlyEnd(index?.id, index?.titulo)}
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                  color="success"
                  onChange={() => {
                    SetTaskArrayChecksOnlyEnd(index?.id, index?.titulo); //anade al arreglo de insercion el item y hora de clickeado
                  }}
                />
              </div>
            ) : (
              <div>
                {
                  <Camera
                    onPhoto={(e: any) => {
                      console.log("URL", e);
                      SetTaskArrayImages(index?.id, e);
                    }}
                  />
                }
                <input
                  type="file"
                  name="Archivos"
                  className={styles.imageInputContainer}
                  onChange={(e: any) => {
                    console.log("IMAGEN", e.target.files[0]);
                    SetTaskArrayImages(index?.id, e.target.files[0]);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      );
      auxtitleBoolean = true;
      counter++;
      auxtitle = index?.fk_tarea?.titulo;
    });

    return y;
  };

  const arrayPrinterAssistance = () => {
    let y: any = [];
    
    arrayAsistencia.map((index: any) => {
      console.log("ARRAY", index);
      y[index?.id] = (
        <div key={index?.id} className={styles.tableInfoRow}>
          <p>Cedula: {index}</p>
        </div>
      );
    });

    return y;
  };

  const arrayPrinter = () => {
    let y: any = [];
    let arrayList3aux: any = [];

    isFilteredResults
      ? (arrayList3aux = arrayFilteredList3)
      : (arrayList3aux = arrayList3);

    arrayList3aux.map((index: any) => {
      y[index.id] = (
        <div
          key={index.id}
          className={styles.tableInfoRow}
          onClick={() => {
            if (index?.fk_vuelo?.estado === "En proceso") {
              setTurnaroundState(2);
            } else if (index?.fk_vuelo?.estado === "Atendido") {
              setTurnaroundState(3);
            } else if (
              index?.fk_vuelo?.estado === "No ha llegado" &&
              state1Overider === false
            ) {
              setTurnaroundState(1);
            } else if (state1Overider === false) {
              setTurnaroundState(4);
            }

            let auxdate = new Date(index?.fecha_inicio + "\n");
            setCurrentTurnaroundDate(
              auxdate.getFullYear() +
                "-" +
                (auxdate.getMonth() + 1) +
                "-" +
                auxdate.getDate()
            );
            getTasksCompletionsList(index?.id);
            getTemplateTasks(index?.fk_vuelo?.fk_plantilla?.id);
            getMachinesByTurnaround(index?.id);
            setOpenDetailDialogID(index.id);
            setFlightID(index?.fk_vuelo?.id);
            getAssistanceByTurnaround(index.id);
            getPersonnelByTurnaround(index?.id);
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
                {turnaroundState === 1 ? (
                  <div className={styles.dialogDetailStartTurnaround}>
                    <div
                      className={styles.closeIconDialog}
                      onClick={() => router.reload()}
                    >
                      <CloseRoundedIcon htmlColor="#4d4e56" />
                    </div>
                    <p className={styles.detailDialogInfoItemTitleWarning}>
                      AVISO: comenzar el turnaround cambiara su estado a "En
                      proceso"
                    </p>
                  <p>
                    Confirme la asistencia del personal:
                  </p>
                    {<BarcodeScanner onQR={handleScanSuccess} />}
                    <br />
                    <center>
                      {result !== "" && (
                        <Button
                          color="primary"
                          variant="outlined"
                          className={styles.accept}
                          endIcon={<CheckCircleOutlineIcon />}
                          onClick={() => {
                            //updatePresence(index?.id);
                            addIDToAssistanceArray(result);
                          }}
                        >
                          Aceptar
                        </Button>
                      )}
                    </center>
                    <br />

                    <p>Lista:</p>
                    {arrayPrinterAssistance()}

                    <div className={styles.redButtonContainer}>
                      <div className={styles.redButton}>
                        <GreenButton
                          executableFunction={() => {
                            postAssistance(index?.id);
                            setTurnaroundState(2);
                            handleSetTurnaroundStateTo2(flightID);
                          }}
                          buttonText="Comenzar turnaround"
                          disabled={
                            currentTurnaroundDate != currentTodaysDateString
                          }
                        />
                      </div>
                    </div>
                    <p className={styles.detailDialogInfoItemTitleWarning}>
                      Solo podrás llenar turnarounds de la fecha de hoy.
                    </p>
                  </div>
                ) : turnaroundState === 2 ? (
                  <>
                    {roleID == 1 || roleID == 2 ? (
                      <div className={styles.dialogDetail}>
                        <div
                          className={styles.closeIconDialog}
                          onClick={() => router.reload()}
                        >
                          <CloseRoundedIcon htmlColor="#4d4e56" />
                        </div>
                        <div className={styles.detailDialogInfoContainer}>
                          <p
                            className={
                              styles.detailDialogInfoContainerTitleText
                            }
                          >
                            Datos de vuelo
                          </p>
                          <div></div>
                          <div className={styles.detailDialogInfoRow1}>
                            <div className={styles.detailDialogInfoItem}>
                              <span
                                className={styles.detailDialogInfoItemTitle}
                              >
                                Fecha y hora de inicio del turnaround:
                              </span>
                              <span
                                className={styles.detailDialogInfoItemValueText}
                              >
                                {index?.fecha_inicio +
                                  " - " +
                                  index?.hora_inicio}
                              </span>
                            </div>
                          </div>

                          <div className={styles.detailDialogInfoRow1}>
                            <div className={styles.detailDialogInfoItem}>
                              <span
                                className={styles.detailDialogInfoItemTitle}
                              >
                                Tipo de servicio:
                              </span>
                              <span
                                className={styles.detailDialogInfoItemValueText}
                              >
                                {index?.fk_vuelo?.tipo_servicio?.nombre}
                              </span>
                            </div>
                          </div>

                          <p className={styles.detailDialogInfoItemTitle2}>
                            Tareas
                          </p>
                          <div className={styles.detailDialogInfoRow1}>
                            <div className={styles.TasksArrayPrinterContainer}>
                              {TasksArrayPrinter()}
                            </div>
                          </div>
                          <p className={styles.detailDialogInfoItemTitle2}>
                            Maquinarias
                          </p>
                          <div className={styles.detailDialogInfoRow1}>
                            <div>{MachinesArrayPrinter()}</div>
                          </div>
                          <p className={styles.detailDialogInfoItemTitle2}>
                            Personal
                          </p>
                          <div className={styles.detailDialogInfoRow1}>
                            <div>{PersonnelArrayPrinter()}</div>
                          </div>
                        </div>
                        <p className={styles.detailDialogInfoItemTitleWarning}>
                          AVISO: Asegúrate de llenar todos los campos antes de
                          enviar el turnaround, pues este será clasificado como
                          "Atendido"
                        </p>
                        <div className={styles.redButtonContainer}>
                          <div className={styles.redButton}>
                            <GreenButton
                              executableFunction={() => handleSendData()}
                              buttonText="ENVIAR"
                            />
                          </div>
                        </div>

                        <div className={styles.redButtonContainer}>
                          <div className={styles.redButton}>
                            <RedButton2
                              executableFunction={() => {
                                router.reload();
                              }}
                              buttonText={"Cerrar"}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          className={styles.containerConfirmAssistanceMobile}
                        >
                          <div
                            className={styles.closeIconDialog}
                            onClick={() => router.reload()}
                          >
                            <CloseRoundedIcon htmlColor="#4d4e56" />
                          </div>
                          <p
                            className={styles.detailDialogInfoItemTitleWarning}
                          >
                            El turnaround esta siendo llenado por un rol
                            superior al tuyo, ¡contáctalo si tienes alguna duda!
                          </p>
                          <p
                            className={
                              styles.detailDialogInfoItemTitleWarningNotBold
                            }
                          >
                            Tu asistencia en este turnaround
                            {assistanceInTurnaround ? (
                              <strong className={styles.greenText}> SI</strong>
                            ) : (
                              <strong className={styles.redText}> NO</strong>
                            )}{" "}
                            está confirmada!
                          </p>
                        </div>
                      </>
                    )}
                  </>
                ) : turnaroundState === 3 ? (
                  <div className={styles.attendedTurnaroundContainer}>
                    <div
                      className={styles.closeIconDialog}
                      onClick={() => router.reload()}
                    >
                      <CloseRoundedIcon htmlColor="#4d4e56" />
                    </div>
                    <p className={styles.detailDialogInfoContainerTitleText}>
                      Turnaround atendido exitosamente!
                    </p>
                    {ArrayPrinterTaskDataForSummary()}
                    <div className={styles.redButtonContainer}>
                      <div className={styles.redButton}>
                        <RedButton2
                          executableFunction={() => {
                            router.reload();
                          }}
                          buttonText={"Cerrar"}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.attendedTurnaroundContainer}>
                    <div
                      className={styles.closeIconDialog}
                      onClick={() => router.reload()}
                    >
                      <CloseRoundedIcon htmlColor="#4d4e56" />
                    </div>
                    <p>ERROR, CONTACTE AL ADMINISTRADOR</p>
                    <div className={styles.redButtonContainer}>
                      <div className={styles.redButton}>
                        <RedButton2
                          executableFunction={() => {
                            router.reload();
                          }}
                          buttonText={"Cerrar"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Dialog>
            )}
            {openAssignDialogID === index?.id && (
              <Dialog
                open={openAssignDialog}
                onClose={() => setOpenAssignDialog(false)}
                className={styles.detailDialog}
                fullScreen={true}
              >
                <div className={styles.dialogDetail}>
                  <div
                    className={styles.closeIconDialog}
                    onClick={() => setOpenAssignDialog(false)}
                  >
                    <CloseRoundedIcon htmlColor="#4d4e56" />
                  </div>
                  <div className={styles.assignContainers}>
                    {personnelDateTimeSelected ? (
                      <div className={styles.detailDialogInfoContainer}>
                        <div className={styles.detailDialogInfoRow1}>
                          <div className={styles.detailDialogInfoItem}>
                            <span className={styles.detailDialogInfoItemTitle2}>
                              Asignar personal
                            </span>
                          </div>
                        </div>
                        {PersonnelQuantitiesArrayPrinter()}
                      </div>
                    ) : (
                      <div className={styles.detailDialogInfoContainer}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Selecciona la hora de inicio y fin de reserva del
                          personal
                        </span>
                        <p className={styles.detailDialogInfoItemText}>
                          Hora de inicio del turnaround:{" "}
                          <strong>{index?.hora_inicio}</strong>
                        </p>

                        <div className={styles.dateContainerRowItem}>
                          <p>Hora inicio:</p>
                          <StandardInputV2
                            setValue={setHoraInicioPersonnel}
                            labelText=""
                            placeholderText={"HH"}
                            inputWidth="55px"
                          />
                          <p>:</p>
                          <StandardInputV2
                            setValue={setMinutosInicioPersonnel}
                            labelText=""
                            placeholderText={"MM"}
                            inputWidth="55px"
                          />
                        </div>
                        <div className={styles.dateContainerRowItem}>
                          <p>Hora final:</p>
                          <StandardInputV2
                            setValue={setHoraFinPersonnel}
                            labelText=""
                            placeholderText={"HH"}
                            inputWidth="55px"
                          />
                          <p>:</p>
                          <StandardInputV2
                            setValue={setMinutosFinPersonnel}
                            labelText=""
                            placeholderText={"MM"}
                            inputWidth="55px"
                          />
                        </div>
                        {
                          <p className={styles.detailDialogInfoItemText}>
                            *El sistema tomará la reserva desde 30 minutos antes
                            de la hora de inicio hasta una hora después de la
                            hora final.
                          </p>
                        }
                        <div className={styles.greenButtonAssignContainer}>
                          <GreenButton2
                            executableFunction={async () => {
                              await getPersonnelReservationList(
                                index?.fecha_inicio
                              );

                              await setPersonnelDateTimeSelected(true);
                            }}
                            buttonText="Confirmar"
                            disabled={
                              horaInicioPersonnel === "" ||
                              horaFinPersonnel === "" ||
                              minutosInicioPersonnel === "" ||
                              minutosFinPersonnel === ""
                            }
                          />
                        </div>
                      </div>
                    )}

                    {machinesDateTimeSelected ? (
                      <div className={styles.detailDialogInfoContainer}>
                        <div className={styles.detailDialogInfoRow1}>
                          <div className={styles.detailDialogInfoItem}>
                            <span className={styles.detailDialogInfoItemTitle2}>
                              Asignar maquinaria
                            </span>
                          </div>
                        </div>

                        {MachineryQuantitiesArrayPrinter()}
                      </div>
                    ) : (
                      <div className={styles.detailDialogInfoContainer}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Selecciona la hora de inicio y fin de reserva de las
                          maquinarias
                        </span>
                        <p className={styles.detailDialogInfoItemText}>
                          Hora de inicio del turnaround:{" "}
                          <strong>{index?.hora_inicio}</strong>
                        </p>

                        <div className={styles.dateContainerRowItem}>
                          <p>Hora inicio:</p>
                          <StandardInputV2
                            setValue={setHoraInicio}
                            labelText=""
                            placeholderText={"HH"}
                            inputWidth="55px"
                          />
                          <p>:</p>
                          <StandardInputV2
                            setValue={setMinutosInicio}
                            labelText=""
                            placeholderText={"MM"}
                            inputWidth="55px"
                          />
                        </div>
                        <div className={styles.dateContainerRowItem}>
                          <p>Hora final:</p>
                          <StandardInputV2
                            setValue={setHoraFin}
                            labelText=""
                            placeholderText={"HH"}
                            inputWidth="55px"
                          />
                          <p>:</p>
                          <StandardInputV2
                            setValue={setMinutosFin}
                            labelText=""
                            placeholderText={"MM"}
                            inputWidth="55px"
                          />
                        </div>
                        <p className={styles.detailDialogInfoItemText}>
                          *El sistema tomará la reserva desde 30 minutos antes
                          de la hora de inicio hasta una hora después de la hora
                          final.
                        </p>
                        <div className={styles.greenButtonAssignContainer}>
                          <GreenButton2
                            executableFunction={async () => {
                              await getMachinesReservationList(
                                index?.fecha_inicio
                              );
                              await setMachinesDateTimeSelected(true);
                            }}
                            buttonText="Confirmar"
                            disabled={
                              horaInicio === "" ||
                              horaFin === "" ||
                              minutosInicio === "" ||
                              minutosFin === ""
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.redButtonContainer}>
                    <div className={styles.redButton}>
                      <GreenButton2
                        executableFunction={async () => {
                          await handleSaveData();
                          router.reload();
                        }}
                        buttonText={"Guardar"}
                      />
                    </div>
                  </div>
                  <div className={styles.redButtonContainer}>
                    <div className={styles.redButton}>
                      <RedButton2
                        executableFunction={() => {
                          //setOpenAssignDialog(false);
                          router.reload();
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
                          {index?.fk_vuelo?.numero_vuelo}?
                        </strong>
                      </p>
                      <div className={styles.dialogButtons}>
                        <GreenButton2
                          executableFunction={() => {
                            handleDeleteFlight(index?.fk_vuelo?.id);
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
            {index?.fk_vuelo?.fk_aerolinea?.nombre} image not found
          </div>
          <div className={styles.column1Container}>
            <p>Vuelo:</p>
            <p>REG:</p>
            <p>Estado:</p>
          </div>
          <div className={styles.column2Container}>
            <p>{index?.fk_vuelo?.numero_vuelo}</p>
            <p>{index?.fk_vuelo?.ac_reg}</p>
            <p
              className={
                index?.fk_vuelo?.estado == "Atendido"
                  ? styles.greenTextCol2
                  : index?.fk_vuelo?.estado == "En proceso"
                  ? styles.yellowTextCol2
                  : index?.fk_vuelo?.estado == "No ha llegado"
                  ? styles.redTextCol2
                  : undefined
              }
            >
              {index?.fk_vuelo?.estado}
            </p>
          </div>
          <div className={styles.column3Container}>
            <div className={styles.column3Icon}>
              <FlightLandIcon />
            </div>

            <p>
              {index?.fk_vuelo?.lugar_salida?.codigo}-
              {index?.fk_vuelo?.lugar_destino?.codigo}
            </p>
          </div>
          <div className={styles.column4Container}>
            <p>{index?.hora_inicio}</p>
          </div>
        </div>
      );
    });
    setFilterValues();
    return y;
  };

  const setFilterValues = () => {
    arrayList3.map((value: any) => {
      if (filterValues.indexOf(value?.fk_vuelo?.fk_aerolinea?.nombre)) {
        filterValues.push(value?.fk_vuelo?.fk_aerolinea?.nombre);
      }
    });
  };

  const filterArray = (filtername: string) => {
    let filteredUsers = arrayList3.filter((user) => {
      return user["fk_vuelo"]["fk_aerolinea"]["nombre"] === filtername;
    });
    setArrayFilteredList3(filteredUsers);
  };

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

export default TurnaroundsMainPageMobile;

let machineryArrayAux: any = [];
let machineryQuantityArrayAux: any = [];
