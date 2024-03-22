import GreenButton from "@/components/Reusables/GreenButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import styles from "./TurnaroundsMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useEffect, useState } from "react";
import router, { Router } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Table, Spacer } from "@nextui-org/react";
import { TableBody, Dialog, Autocomplete, TextField } from "@mui/material";
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
import SiacaLogo from "../../images/logos/siacaLogo.png";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import LoadingScreen from "../Reusables/LoadingScreen";
import { Image, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import RedButton from "../Reusables/RedButton2";
import StandardInput from "../Reusables/StandardInput";

interface PageProps {
  setStep: (value: number) => void;
}

const TurnaroundsMainPage: React.FC<PageProps> = ({ setStep }) => {
  useEffect(() => {
    getDateForCalendar();
  }, []);

  useEffect(() => {
    getList();
    getPersonnelList();
  }, []);

  const [arrayList3, setArrayList3] = useState([]);
  const [personnelListArray, setPersonnelListArray] = useState([]);
  const [tasksarrayList, setTasksarrayList] = useState([]);
  const [machinesByTurnaroundArrayList, setMachinesByTurnaroundArrayList] =
    useState([]);
  const [machinesarrayList, setMachinesarrayList] = useState([]);
  const [personnelByTurnaroundArrayList, setPersonneByTurnaroundArrayList] =
    useState([]);
  const [machinesReservationsarrayList, setMachinesReservationsarrayList] =
    useState([]);
  const [personnelReservationsarrayList, setPersonnelReservationsarrayList] =
    useState([]);
  const [
    machinesQuantityByTemplatearrayList,
    setMachinesQuantityByTemplatearrayList,
  ] = useState([]);
  const [personnelDepartmentsarrayList, setPersonnelDepartmentsarrayList] =
    useState([]);
  let date = new Date();
  const [arrayFilteredList3, setArrayFilteredList3] = useState([]);
  const [tasksCompletionValues, setTasksCompletionValues] = useState([]);
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
  const [clickedFlightState, setclickedFlightState] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSummaryDialog, setsaveSummaryDialog] = useState(false);
  const [saveSummaryDialogUpdate, setsaveSummaryDialogUpdate] = useState(false);
  const [manualHourDialog, setmanualHourDialog] = useState(false);
  const [manualHourValue, setmanualHourValue] = useState("0");
  const [manualMinuteValue, setmanualMinuteValue] = useState("0");
  const [manualSecondsValue, setmanualSecondsValue] = useState("0");
  const [manualHourValueOnlyEnd, setmanualHourValueOnlyEnd] = useState("0");
  const [manualMinuteValueOnlyEnd, setmanualMinuteValueOnlyEnd] = useState("0");
  const [manualSecondsValueOnlyEnd, setmanualSecondsValueOnlyEnd] =
    useState("0");
  const [taskNameToEdit, settaskNameToEdit] = useState("");
  const [taskIDToEdit, settaskIDToEdit] = useState("");
  const [taskTypeToEdit, settaskTypeToEdit] = useState(-1);
  const [CommentTaskToEdit, setCommentTaskToEdit] = useState("");
  const [lateCodesArray, setlateCodesArray] = useState([""]);
  const [lateCodesData, setlateCodesData] = useState();
  const [lateCodeValue, setlateCodeValue] = useState("");
  const [lateCodeValueIDForPatchUpdate, setlateCodeValueIDforPatchUpdate] =
    useState("");
  const PDFstyles = StyleSheet.create({
    page: {
      flexDirection: "column",
      //backgroundColor: "#E4E4E4",
      padding: 10,
      gap: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    mainbox: {
      border: "1px solid black",
    },
    titleText: {
      fontSize: 14,
      color: "black",
      fontWeight: 700,
      textAlign: "center",
    },
    titleTextUncentered: {
      fontSize: 14,
      color: "black",
      fontWeight: 700,
      paddingLeft: 6,
    },
    regularText: {
      fontSize: 14,
      color: "#4d4e56",
      paddingLeft: 6,
    },
    smallerText: {
      fontSize: 12,
      color: "#4d4e56",
      padding: 6,
    },
    innerContainerRow: {
      flexDirection: "row",
    },
    innerContainer0: {
      border: "1px solid black",
      width: "100%",
    },
    innerContainer1: {
      border: "1px solid black",
      width: "50%",
    },
    innerContainer2: {
      border: "1px solid black",
      width: "33.3%",
    },
    innerContainerTasksSection1: {
      border: "1px solid black",
      width: "10%",
    },
    innerContainerTasksSection2: {
      border: "1px solid black",
      width: "45%",
    },
    innerContainerTasksSection3: {
      border: "1px solid black",
      width: "45%",
    },
    image: {
      width: 80,
    },
  });

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
            console.log("turnarounds list", Object.values(result));
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

  const getPersonnelList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/personnelListTurnaround";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setPersonnelListArray(Object.values(result));
            console.log("Personnel List Array", result);
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
            console.log("getTasksCompletionsList  Array", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

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
            console.log("machines reservation list", result);
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
            console.log("personnel reservation list", result);
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
        const url = "/api/getPersonnelDepartmentsListTurnaround";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("getPersonnelDepartments", result);
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
            console.log("MachinesQuantityByTemplatearrayList", result);
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
            console.log("templateTasks list", result);
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
            console.log("Machines By Turnaround list", result);
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
            console.log("Guardar", result);

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
            console.log("Guardar", result);

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

  const updateTaskTypeComment = async (
    commentToUpdate: string,
    subtaskID: any
  ) => {
    const fetchData = async () => {
      try {
        const url = "/api/updateTaskTypeComment";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            comentario: commentToUpdate,
            subtaskID: subtaskID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("updateTaskTypeStartHour", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const updateTaskTypeStartHour = async (
    hourToUpdate: string,
    subtaskID: any
  ) => {
    const fetchData = async () => {
      try {
        const url = "/api/updateTaskTypeStartHour";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            hora_inicio: hourToUpdate,
            subtaskID: subtaskID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("updateTaskTypeStartHour", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const updateTaskTypeStartHourStartEnd = async (
    hourToUpdateStart: string,
    hourToUpdateEnd: string,
    subtaskID: any
  ) => {
    const fetchData = async () => {
      try {
        const url = "/api/updateTaskTypeStartEndHour";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            hora_inicio: hourToUpdateStart,
            hora_fin: hourToUpdateEnd,
            subtaskID: subtaskID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("updateTaskTypeStartHour", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const setlateCodesOptions = (data: any) => {
    let auxiliaryArray: string[] = [];
    data.map((element: any) => {
      auxiliaryArray.push(
        (
          element?.identificador +
          " - " +
          element?.alpha +
          " - " +
          element?.descripcion
        ).toString()
      );
    });
    setlateCodesArray(auxiliaryArray);
    console.log("auxiliaryArray", auxiliaryArray);
  };
  const getLateCodes = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/getLateCodesList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("getLateCodesList", result);
            setlateCodesOptions(Object.values(result));
            setlateCodesData(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const setlateCodeValueIDForPatch = (value: string) => {
    let identificadorAuxiliar = value.slice(0, 2).trim();
    lateCodesData?.map((element: any) => {
      if (element?.identificador === Number(identificadorAuxiliar)) {
        setlateCodeValueIDforPatchUpdate(element?.id);
        console.log("el ID clickeado es ", element?.id);
      }
    });
  };

  const patchLateCode = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/patchLateCode";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            turnaroundID: openDetailDialogID,
            fk_codigos_demora_id: lateCodeValueIDForPatchUpdate,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("patchLateCode", result);
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

  const formatTasksForPDFArray = (result: any) => {
    let y: any[] = [];

    //comentario === id =1
    //hora inicio === id =2
    //hora inicio y fin === id =3
    //hora imagen === id =4
    result?.comentarios.map((value: any) => {
      //console.log("value", value);
      y.push({
        key: value?.fk_subtarea__id,
        type: 1,
        name: value?.fk_subtarea__titulo,
        value: "Comentario: " + value?.comentario,
        idForEdition: value?.id,
      });
    });
    result?.horas.map((value: any) => {
      //console.log("value", value);
      y.push({
        key: value?.fk_subtarea__id,
        type: 2,
        name: value?.fk_subtarea__titulo,
        value: "Hora inicio: " + value?.hora_inicio,
        idForEdition: value?.id,
      });
    });
    result?.horas_inicio_fin.map((value: any) => {
      //console.log("value", value);
      y.push({
        key: value?.fk_subtarea__id,
        type: 3,
        name: value?.fk_subtarea__titulo,
        value:
          "hora inicio: " +
          value?.hora_inicio +
          " - " +
          "hora fin: " +
          value?.hora_fin,
        idForEdition: value?.id,
      });
    });

    console.log("array of tasks unorderred", y);
    let resultOfSorting: any[] = [];
    resultOfSorting = y.sort((a, b) => a.key - b.key);
    console.log("resultOfSorting", resultOfSorting);
    setTasksCompletionValues(resultOfSorting);
  };

  const arrayPrinterSelectedMachinesForCategory = (category: any) => {
    let y: any = [];
    machinesToPostArray.map((index: any) => {
      //console.log("the current category index is:", index);
      if (index?.categoryID === category) {
        console.log("entro", index);
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

  const tasksCompletionValuesArrayPrinter = () => {
    let y: any = [];
    let auxtitle = "";
    let auxtitleBoolean = true;
    let counter = 0;
    tasksCompletionValues.map((index: any) => {
      y[counter] = (
        <div className={styles.detailDialogInfoRow1}>
          {taskTypeToEdit === 1 && (
            <>
              <Dialog
                className={styles.dialogDelete}
                open={manualHourDialog}
                onClose={() => setmanualHourDialog(false)}
              >
                <div className={styles.dialogBack}>
                  <div className={styles.dialogHourInputsContainer}>
                    <p>
                      <strong>
                        Introduzca el comentario que desea introducir a la tarea{" "}
                        {taskNameToEdit} :
                      </strong>
                    </p>
                    <div className={styles.manualHoursInputsContainer}>
                      <p>Comentario:</p>
                      <StandardInput
                        setValue={setCommentTaskToEdit}
                        inputText=""
                        inputWidth="255px"
                      />
                    </div>
                    <div className={styles.dialogButtons}>
                      <GreenButton2
                        executableFunction={() => {
                          {
                            updateTaskTypeComment(
                              CommentTaskToEdit,
                              taskIDToEdit
                            );
                            router.reload();
                          }
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
            </>
          )}
          {taskTypeToEdit === 2 && (
            <>
              <Dialog
                className={styles.dialogDelete}
                open={manualHourDialog}
                onClose={() => setmanualHourDialog(false)}
              >
                <div className={styles.dialogBack}>
                  <div className={styles.dialogHourInputsContainer}>
                    <p>
                      <strong>
                        Introduzca la hora de inicio manual que desea introducir
                        a la tarea {taskNameToEdit} (formato 24hrs):
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
                          updateTaskTypeStartHour(
                            manualHourValue +
                              ":" +
                              manualMinuteValue +
                              ":" +
                              manualSecondsValue,
                            taskIDToEdit
                          );
                          router.reload();
                        }}
                        buttonText="Confirmar"
                      />
                      <RedButton2
                        executableFunction={() => {
                          setmanualHourDialog(false);
                        }}
                        buttonText="Cancelar"
                      />
                    </div>
                  </div>
                </div>
              </Dialog>
            </>
          )}

          {taskTypeToEdit === 3 && (
            <>
              <Dialog
                className={styles.dialogDelete}
                open={manualHourDialog}
                onClose={() => setmanualHourDialog(false)}
              >
                <div className={styles.dialogBack}>
                  <div className={styles.dialogHourInputsContainer}>
                    <p>
                      <strong>
                        Introduzca la hora de inicio y la hora fin manual que
                        desea introducir a la tarea {taskNameToEdit} (formato
                        24hrs):
                      </strong>
                    </p>
                    <div className={styles.manualHoursInputsContainer}>
                      <p>
                        <strong>INICIO:</strong>
                      </p>
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
                    <div className={styles.manualHoursInputsContainer}>
                      <p>
                        <strong>FIN:</strong>
                      </p>
                      <p>Horas:</p>
                      <StandardInput
                        setValue={setmanualHourValueOnlyEnd}
                        inputText=""
                        inputWidth="55px"
                      />
                      <p>Minuto:</p>
                      <StandardInput
                        setValue={setmanualMinuteValueOnlyEnd}
                        inputText=""
                        inputWidth="55px"
                      />
                      <p>Segundos:</p>
                      <StandardInput
                        setValue={setmanualSecondsValueOnlyEnd}
                        inputText=""
                        inputWidth="55px"
                      />
                    </div>
                    <div className={styles.dialogButtons}>
                      <GreenButton2
                        executableFunction={() => {
                          updateTaskTypeStartHourStartEnd(
                            manualHourValue +
                              ":" +
                              manualMinuteValue +
                              ":" +
                              manualSecondsValue,
                            manualHourValueOnlyEnd +
                              ":" +
                              manualMinuteValueOnlyEnd +
                              ":" +
                              manualSecondsValueOnlyEnd,
                            taskIDToEdit
                          );
                          router.reload();
                        }}
                        buttonText="Confirmar"
                      />
                      <RedButton2
                        executableFunction={() => {
                          setmanualHourDialog(false);
                        }}
                        buttonText="Cancelar"
                      />
                    </div>
                  </div>
                </div>
              </Dialog>
            </>
          )}

          <p>
            <strong>{index?.name}:</strong> {index?.value}
          </p>
          <button
            onClick={() => {
              settaskNameToEdit(index?.name);
              settaskIDToEdit(index?.idForEdition);
              settaskTypeToEdit(index?.type);
              setmanualHourDialog(true);
            }}
          >
            Editar
          </button>
        </div>
      );
      counter++;
    });

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
    console.log("selectedMachineModelID", selectedMachineModelID);
    console.log("machineryQuantityArrayAux", machineryQuantityArrayAux);
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

    console.log("machinesToPostArray after delete", machinesToPostArray);
  };

  const removePersonfromPage = (selectedPersonID: any) => {
    console.log("selectedMachineModelID", selectedPersonID);
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

    console.log("personnelToPostArray after delete", personnelToPostArray);
  };

  const addMachineToPage = (selectedMachineModelID: any) => {
    console.log("selectedMachineModelID", selectedMachineModelID);
    console.log("machineryQuantityArrayAux", machineryQuantityArrayAux);
    let arrayOfMachinesToPush: any = [];
    let x = 0;
    let cantidad = -1;
    let machineCategory = -1;
    let nombre = "";
    while (x <= machinesarrayList.length) {
      if (machinesarrayList[x]?.id === selectedMachineModelID) {
        machineCategory = machinesarrayList[x]?.fk_categoria?.id;
        //push into array the machine added
        nombre =
          machinesarrayList[x]?.identificador +
          " - " +
          machinesarrayList[x]?.fk_categoria?.nombre;
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

        console.log("x2", cantidad);
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

    console.log("machinesToPostArray", machinesToPostArray);
  };

  const personnelReservationSummaryArrayPrinter = () => {
    //.map
    let y: any = [];
    //setsaveSummaryDialogUpdate(!saveSummaryDialogUpdate);
    //console.log("ENTERING POST ARRAY", personnelToPostArray);

    personnelToPostArray.map((index: any) => {
      //console.log("ENTERING POST ARRAY .MAP", index?.machineName);
      y[index?.personID] = (
        <>
          <p className={styles.summaryListText}>• {index?.machineName}</p>
        </>
      );
    });

    return y;
  };
  const machinesReservationSummaryArrayPrinter = () => {
    //.map
    let y: any = [];
    //setsaveSummaryDialogUpdate(!saveSummaryDialogUpdate);
    console.log("ENTERING POST ARRAY", machinesToPostArray);

    machinesToPostArray.map((index: any) => {
      console.log("ENTERING POST ARRAY .MAP", index?.machineName);
      y[index?.machineID] = (
        <>
          <p className={styles.summaryListText}>• {index?.machineName}</p>
        </>
      );
    });

    return y;
  };

  const addPersonToPage = (selectedPersonID: any) => {
    console.log("selectedPersonID", selectedPersonID);
    console.log("machineryQuantityArrayAux", machineryQuantityArrayAux);
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
          " " +
          personnelListArray[x]?.fk_user?.last_name +
          " - " +
          personnelListArray[x]?.fk_departamento?.nombre +
          " - " +
          personnelListArray[x]?.fk_cargo?.nombre;
        //console.log("x1", personDepartment);
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

    console.log("personnelToPostArray", personnelToPostArray);
  };
  const GetTaskDataForPDF = (indexTurnaroundData: any) => {
    let y: any = [];
    let cont = 0;
    console.log("tasksCompletionValues", tasksCompletionValues);
    tasksCompletionValues.map((index: any) => {
      cont++;
      y[index?.key] = (
        <>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainerTasksSection1}>
              <Text style={PDFstyles.regularText}>{cont}</Text>
            </View>
            <View style={PDFstyles.innerContainerTasksSection2}>
              <Text style={PDFstyles.regularText}>{index?.name}</Text>
            </View>
            <View style={PDFstyles.innerContainerTasksSection3}>
              <Text style={PDFstyles.regularText}>{index?.value}</Text>
            </View>
          </View>
        </>
      );
    });

    return y;
  };
  const arrayPrinterPDFGeneratorSpanish = (indexTurnaroundData: any) => {
    let y;

    y = (
      <>
        <Image
          style={PDFstyles.image}
          //src="https://siacaservicios.com/es-VE/assets/imagenes/siaca-logo-gris.png"
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAABJCAMAAAAg/pLVAAACWFBMVEUAAABNTVYBply6urpNTVZNTVZNTVZNTVZNTVZNTVZNTVZNTVZNTVaXmJlNTVZNTVZNTVZNTVYBplwBplxNTVZNTVZNTVZNTVZNTVZNTVZNTVZNTVa6urpNTVZNTVZNTVZNTVZNTVZNTVZNTVYBplwBplxNTVYBplwBplxNTVZNTVYBplwBplxNTVYBplyXmJm3uLdNTVZNTVaXmJkBplxNTVZNTVZNTVZNTVYBplwBplxNTVZNTVYBplxNTVacnZ5NTVZNTVYBplwBplxNTVYBplxNTVZNTVYBplwBplwBplwBplxNTVYBplwBplwBplwBplwBplwBplyfoKBNTVYBplxNTVYBplwBplwBplwBplwBplxNTVa6uroBplwBply0tLQBplwBplxNTVZNTVZNTVanp6gBply6urq6urq6urq6urpNTVYBplwBplwBplxNTVaXmJlNTVYBplwBplwBply6urqXmJmXmJm6urq6urqXmJkBply6urqXmJmYmZq6urqXmJmtra6hoqOXmJm6urqYmZq6urqXmJkBplyXmJmXmJmXmJmYmZq6urq6urqXmJm6urqysrK6urqXmJm6urqutrO6urqXmJm6urq5ubmXmJmXmJmXmJm6urq6urq6urqqqqu6urqXmJm6urqXmJm6urpynIoCpl1+s5yXmJkgqWxDn3cuom4Lp2K6uroeqWtFrX5Qr4Sqqquvr7A9rHoFpl6cnZ6srK0iqm26urpOn3tRr4VgsI2puLE8rHqOtaRmsY+NtaOAmpC1tbWysrMuq3MVqGaNRvyDAAAAyHRSTlMA////E94Y4/EkQ1D1/7xABAL9AtgN+aotcoX7/csQ/grvuAYGExzp9YzVHAp+Mfz9qOsFIohVbV/dxXeR4s78ma/ujzqBICj58jpwwg+/sUfKW/fH2FnOJlOIfDRtnUH5qi3nTkj5Y/ACDs9muHdNniCyo9OWhxHtUvm4aQiv3hxF+/yC2k5J9jV08RjF4MOdJvZkKuX+QlmYLCRrzDaPoPy403c4XAP//5D/BQX/gRnkQQ29jg2l2OCtB7H/1v//S/QHD8vg/5KZu+YAAAsESURBVHic7Zz3X1PJGocnVWpIARMIhAAJKCUgoXdCAOlFOgjSUapi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"
          }
        />
        <View style={PDFstyles.mainbox}>
          <Text style={PDFstyles.titleText}>Resumen de Servicios de Vuelo</Text>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer1}>
              <Text style={PDFstyles.regularText}>
                STN: {indexTurnaroundData?.fk_vuelo?.stn?.codigo}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer1}>
              <Text style={PDFstyles.regularText}>
                CARRIER:{" "}
                {indexTurnaroundData?.fk_vuelo?.fk_aerolinea?.nombre +
                  " " +
                  indexTurnaroundData?.fk_vuelo?.fk_aerolinea?.codigo}
              </Text>
            </View>
          </View>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer1}>
              <Text style={PDFstyles.regularText}>
                Cargos pagados por:{" "}
                {indexTurnaroundData?.fk_vuelo?.fk_aerolinea?.nombre}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer1}>
              <Text style={PDFstyles.regularText}>
                Identificador Nro: {indexTurnaroundData?.fk_vuelo?.id}
              </Text>
            </View>
          </View>
          <Text style={PDFstyles.regularText}>
            Dirección completa:{" "}
            {indexTurnaroundData?.fk_vuelo?.fk_aerolinea?.ciudad +
              " " +
              indexTurnaroundData?.fk_vuelo?.fk_aerolinea?.pais}
          </Text>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                Vuelo Nro: {indexTurnaroundData?.fk_vuelo?.numero_vuelo}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                A/C Reg: {indexTurnaroundData?.fk_vuelo?.ac_reg}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                Tipo de A/C: {indexTurnaroundData?.fk_vuelo?.ac_type}
              </Text>
            </View>
          </View>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                ETA: {indexTurnaroundData?.fk_vuelo?.ETA}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                ATA: {indexTurnaroundData?.fk_vuelo?.ATA}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                FECHA: {indexTurnaroundData?.fk_vuelo?.ETA_fecha}
              </Text>
            </View>
          </View>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                FECHA: {indexTurnaroundData?.fk_vuelo?.ETD}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                ATD: {indexTurnaroundData?.fk_vuelo?.ATD}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                FECHA: {indexTurnaroundData?.fk_vuelo?.ETD_fecha}
              </Text>
            </View>
          </View>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                Routing:{" "}
                {indexTurnaroundData?.fk_vuelo?.lugar_salida?.codigo +
                  "/" +
                  indexTurnaroundData?.fk_vuelo?.lugar_destino?.codigo}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                Puerta: {indexTurnaroundData?.fk_vuelo?.gate}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                Tipo de vuelo:{" "}
                {indexTurnaroundData?.fk_vuelo?.tipo_vuelo?.nombre}
              </Text>
            </View>
          </View>
        </View>
        <View style={PDFstyles.mainbox}>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainerTasksSection1}>
              <Text style={PDFstyles.titleTextUncentered}>No.</Text>
            </View>
            <View style={PDFstyles.innerContainerTasksSection2}>
              <Text style={PDFstyles.titleTextUncentered}>
                SERVICIOS PROPORCIONADOS
              </Text>
            </View>
            <View style={PDFstyles.innerContainerTasksSection3}>
              <Text style={PDFstyles.titleTextUncentered}>
                Resultado al completar la tarea
              </Text>
            </View>
          </View>
          {GetTaskDataForPDF(indexTurnaroundData)}
        </View>

        <View style={PDFstyles.mainbox}>
          <View style={PDFstyles.innerContainer0}>
            <Text style={PDFstyles.regularText}>
              Cualquier discrepancia sobre los servicios prestados y reclamados
              en este documento deberá comunicarse dentro de los 7 días
              posteriores a la recepción de la factura mensual.
            </Text>
          </View>
          <View style={PDFstyles.innerContainer0}>
            <Text style={PDFstyles.smallerText}>
              Por la presente certifico, como representante autorizado del
              Transportista, que reconozco y acepto las condiciones de
              responsabilidad del Acuerdo Estándar de Handling en Tierra de
              IATA, según se ha modificado (que aparece al dorso) para la
              prestación del servicio solicitado por el Transportista.
            </Text>
            <Text style={PDFstyles.smallerText}>
              Aceptación de las condiciones y recepción del servicio como se
              indica anteriormente:
            </Text>
            <View style={PDFstyles.innerContainerRow}>
              <View style={PDFstyles.innerContainer1}>
                <Text style={PDFstyles.smallerText}>Nombre:</Text>
              </View>
              <View style={PDFstyles.innerContainer1}>
                <Text style={PDFstyles.smallerText}>
                  Firma del representante:
                </Text>
                <Text style={PDFstyles.smallerText}></Text>
                <Text style={PDFstyles.smallerText}></Text>
              </View>
            </View>
          </View>
          <View style={PDFstyles.innerContainer0}>
            <Text style={PDFstyles.smallerText}>
              La prestación de los servicios mencionados se ha realizado en base
              a la hora local.
            </Text>
            <View style={PDFstyles.innerContainerRow}>
              <View style={PDFstyles.innerContainer1}>
                <Text style={PDFstyles.smallerText}>Nombre:</Text>
              </View>
              <View style={PDFstyles.innerContainer1}>
                <Text style={PDFstyles.smallerText}>
                  Firma del representante de la compañia de handling:
                </Text>
                <Text style={PDFstyles.smallerText}></Text>
              </View>
            </View>
          </View>
          <Text style={PDFstyles.smallerText}>
            Todos los servicios indicados en este formulario están sujetos a la
            aprobación del departamento de contabilidad de la empresa de
            Handling. Los cobros en exceso se reembolsarán y los cobros
            insuficientes se facturarán.
          </Text>
        </View>
        <Text style={PDFstyles.smallerText}>
          Este documento fué autogenerado en la fecha:{" "}
          {date.getDate().toString()}-{(date.getMonth() + 1).toString()}-
          {date.getFullYear().toString()} a las {date.getHours()}:
          {date.getMinutes()}:{date.getSeconds()}.
        </Text>
      </>
    );

    return y;
  };

  const arrayPrinterPDFGenerator = (indexTurnaroundData: any) => {
    let y;

    y = (
      <>
        <Image
          style={PDFstyles.image}
          //src="https://siacaservicios.com/es-VE/assets/imagenes/siaca-logo-gris.png"
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAABJCAMAAAAg/pLVAAACWFBMVEUAAABNTVYBply6urpNTVZNTVZNTVZNTVZNTVZNTVZNTVZNTVZNTVaXmJlNTVZNTVZNTVZNTVYBplwBplxNTVZNTVZNTVZNTVZNTVZNTVZNTVZNTVa6urpNTVZNTVZNTVZNTVZNTVZNTVZNTVYBplwBplxNTVYBplwBplxNTVZNTVYBplwBplxNTVYBplyXmJm3uLdNTVZNTVaXmJkBplxNTVZNTVZNTVZNTVYBplwBplxNTVZNTVYBplxNTVacnZ5NTVZNTVYBplwBplxNTVYBplxNTVZNTVYBplwBplwBplwBplxNTVYBplwBplwBplwBplwBplwBplyfoKBNTVYBplxNTVYBplwBplwBplwBplwBplxNTVa6uroBplwBply0tLQBplwBplxNTVZNTVZNTVanp6gBply6urq6urq6urq6urpNTVYBplwBplwBplxNTVaXmJlNTVYBplwBplwBply6urqXmJmXmJm6urq6urqXmJkBply6urqXmJmYmZq6urqXmJmtra6hoqOXmJm6urqYmZq6urqXmJkBplyXmJmXmJmXmJmYmZq6urq6urqXmJm6urqysrK6urqXmJm6urqutrO6urqXmJm6urq5ubmXmJmXmJmXmJm6urq6urq6urqqqqu6urqXmJm6urqXmJm6urpynIoCpl1+s5yXmJkgqWxDn3cuom4Lp2K6uroeqWtFrX5Qr4Sqqquvr7A9rHoFpl6cnZ6srK0iqm26urpOn3tRr4VgsI2puLE8rHqOtaRmsY+NtaOAmpC1tbWysrMuq3MVqGaNRvyDAAAAyHRSTlMA////E94Y4/EkQ1D1/7xABAL9AtgN+aotcoX7/csQ/grvuAYGExzp9YzVHAp+Mfz9qOsFIohVbV/dxXeR4s78ma/ujzqBICj58jpwwg+/sUfKW/fH2FnOJlOIfDRtnUH5qi3nTkj5Y/ACDs9muHdNniCyo9OWhxHtUvm4aQiv3hxF+/yC2k5J9jV08RjF4MOdJvZkKuX+QlmYLCRrzDaPoPy403c4XAP//5D/BQX/gRnkQQ29jg2l2OCtB7H/1v//S/QHD8vg/5KZu+YAAAsESURBVHic7Zz3X1PJGocnVWpIARMIhAAJKCUgoXdCAOlFOgjSUapi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"
          }
        />
        <View style={PDFstyles.mainbox}>
          <Text style={PDFstyles.titleText}>Flight Services Summary</Text>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer1}>
              <Text style={PDFstyles.regularText}>
                STN: {indexTurnaroundData?.fk_vuelo?.stn?.codigo}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer1}>
              <Text style={PDFstyles.regularText}>
                CARRIER:{" "}
                {indexTurnaroundData?.fk_vuelo?.fk_aerolinea?.nombre +
                  " " +
                  indexTurnaroundData?.fk_vuelo?.fk_aerolinea?.codigo}
              </Text>
            </View>
          </View>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer1}>
              <Text style={PDFstyles.regularText}>
                Charges Payable By:{" "}
                {indexTurnaroundData?.fk_vuelo?.fk_aerolinea?.nombre}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer1}>
              <Text style={PDFstyles.regularText}>
                Identifier No: {indexTurnaroundData?.fk_vuelo?.id}
              </Text>
            </View>
          </View>
          <Text style={PDFstyles.regularText}>
            Full Address:{" "}
            {indexTurnaroundData?.fk_vuelo?.fk_aerolinea?.ciudad +
              " " +
              indexTurnaroundData?.fk_vuelo?.fk_aerolinea?.pais}
          </Text>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                Flight No: {indexTurnaroundData?.fk_vuelo?.numero_vuelo}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                A/C Reg: {indexTurnaroundData?.fk_vuelo?.ac_reg}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                A/C Type: {indexTurnaroundData?.fk_vuelo?.ac_type}
              </Text>
            </View>
          </View>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                ETA: {indexTurnaroundData?.fk_vuelo?.ETA}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                ATA: {indexTurnaroundData?.fk_vuelo?.ATA}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                DATE: {indexTurnaroundData?.fk_vuelo?.ETA_fecha}
              </Text>
            </View>
          </View>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                ETD: {indexTurnaroundData?.fk_vuelo?.ETD}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                ATD: {indexTurnaroundData?.fk_vuelo?.ATD}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                DATE: {indexTurnaroundData?.fk_vuelo?.ETD_fecha}
              </Text>
            </View>
          </View>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                Routing:{" "}
                {indexTurnaroundData?.fk_vuelo?.lugar_salida?.codigo +
                  "/" +
                  indexTurnaroundData?.fk_vuelo?.lugar_destino?.codigo}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                Gate: {indexTurnaroundData?.fk_vuelo?.gate}
              </Text>
            </View>
            <View style={PDFstyles.innerContainer2}>
              <Text style={PDFstyles.regularText}>
                Flight Type: {indexTurnaroundData?.fk_vuelo?.tipo_vuelo?.nombre}
              </Text>
            </View>
          </View>
        </View>
        <View style={PDFstyles.mainbox}>
          <View style={PDFstyles.innerContainerRow}>
            <View style={PDFstyles.innerContainerTasksSection1}>
              <Text style={PDFstyles.titleTextUncentered}>No.</Text>
            </View>
            <View style={PDFstyles.innerContainerTasksSection2}>
              <Text style={PDFstyles.titleTextUncentered}>
                SERVICES PROVIDED
              </Text>
            </View>
            <View style={PDFstyles.innerContainerTasksSection3}>
              <Text style={PDFstyles.titleTextUncentered}>
                Task completion result
              </Text>
            </View>
          </View>
          {GetTaskDataForPDF(indexTurnaroundData)}
        </View>

        <View style={PDFstyles.mainbox}>
          <View style={PDFstyles.innerContainer0}>
            <Text style={PDFstyles.regularText}>
              Any dispute on the provided services claimed in this document
              shall be raised within 7 days of receiving the monthly invoice.
            </Text>
          </View>
          <View style={PDFstyles.innerContainer0}>
            <Text style={PDFstyles.smallerText}>
              I hereby certify, as authorised representative of the Carrier,
              that I recognise and accept the liability conditions of the IATA
              Standard Ground Handling Agreement, as amended (appearing
              overleaf) for the performence of the service requested by the
              Carner
            </Text>
            <Text style={PDFstyles.smallerText}>
              Acceptance of conditions and receipt of service as indicated
              above:
            </Text>
            <View style={PDFstyles.innerContainerRow}>
              <View style={PDFstyles.innerContainer1}>
                <Text style={PDFstyles.smallerText}>Name:</Text>
              </View>
              <View style={PDFstyles.innerContainer1}>
                <Text style={PDFstyles.smallerText}>
                  Representative Signature:
                </Text>
                <Text style={PDFstyles.smallerText}></Text>
                <Text style={PDFstyles.smallerText}></Text>
              </View>
            </View>
          </View>
          <View style={PDFstyles.innerContainer0}>
            <Text style={PDFstyles.smallerText}>
              The above services have been rendered based on local time
            </Text>
            <View style={PDFstyles.innerContainerRow}>
              <View style={PDFstyles.innerContainer1}>
                <Text style={PDFstyles.smallerText}>Name:</Text>
              </View>
              <View style={PDFstyles.innerContainer1}>
                <Text style={PDFstyles.smallerText}>
                  Handling Company's Representative Signature:
                </Text>
                <Text style={PDFstyles.smallerText}></Text>
              </View>
            </View>
          </View>
          <Text style={PDFstyles.smallerText}>
            All services shown on this form are subject to approval by the
            Handling company's accounting department, Over-collections will be
            refunded, undercollections will be invoiced.
          </Text>
        </View>
        <Text style={PDFstyles.smallerText}>
          This document was autogenerated on the following date:{" "}
          {(date.getMonth() + 1).toString()}-{date.getDate().toString()}-
          {date.getFullYear().toString()} at {date.getHours()}:
          {date.getMinutes()}:{date.getSeconds()}.
        </Text>
      </>
    );

    return y;
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
                    console.log("entro al remover");
                    await removePersonfromPage(index?.id);
                    await setcheckTask(false);
                    await setcheckTaskID(checkTaskID - 1);
                  } else {
                    console.log("entro al anadir");
                    await addPersonToPage(index?.id);
                    await setcheckTask(true);
                    await setcheckTaskID(index?.id);
                  }
                }
              }}
            >
              <p className={styles.taskTextText}>
                {" "}
                <strong>
                  {index?.fk_user?.first_name +
                    "   " +
                    index?.fk_user?.last_name}
                </strong>{" "}
                <br />
                {index?.fk_cargo?.nombre}
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
      console.log("machinesToPostArray", machinesToPostArray);

      if (index?.categoryID === machineCategoryID) {
        console.log("index?.machineName", index?.machineName);
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
      auxtitleBoolean = true;
      counter++;
      auxtitle = index?.fk_maquinaria?.fk_categoria?.nombre;
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
    });

    return y;
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
          <p className={styles.taskTextText}>- {index?.titulo}</p>
        </div>
      );
      auxtitleBoolean = true;
      counter++;
      auxtitle = index?.fk_tarea?.titulo;
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
        <div key={index.id} className={styles.tableInfoRow}>
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
                      <div className={styles.detailDialogInfoItemLateCodes}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Código de demora:
                        </span>
                        <div>
                          <Autocomplete
                            size="small"
                            sx={{ width: "1000px" }}
                            value={lateCodeValue} //el valor que toma por defecto, esta comentado por que debe ser nulo
                            onInputChange={(event, newInputValue) => {
                              setlateCodeValue(newInputValue);
                              setlateCodeValueIDForPatch(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={lateCodesArray}
                            renderInput={(params) => (
                              <TextField {...params} label={""} />
                            )}
                          />
                        </div>
                        <GreenButton2
                          executableFunction={() => {
                            patchLateCode();
                          }}
                          buttonText="Guardar"
                        />
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Tipo de servicio:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.fk_vuelo?.tipo_servicio?.nombre}
                        </span>
                      </div>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          ICAO HEX:
                        </span>
                        <span>
                          {" "}
                          {index?.fk_vuelo?.icao_hex === null
                            ? "Indefinido"
                            : index?.fk_vuelo?.icao_hex}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          STN:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.fk_vuelo?.stn?.codigo}
                        </span>
                      </div>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          CARRIER:
                        </span>
                        <span>{index?.fk_vuelo?.fk_aerolinea?.nombre}</span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Charges Payable By:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.fk_vuelo?.ente_pagador}
                        </span>
                      </div>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          No.:
                        </span>
                        <span>{index?.fk_vuelo?.id}</span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Routing:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.fk_vuelo?.lugar_salida?.codigo}/
                          {index?.fk_vuelo?.lugar_destino?.codigo}
                        </span>
                      </div>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Tipo de vuelo:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.fk_vuelo?.tipo_vuelo?.nombre}
                        </span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Flight No.:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.fk_vuelo?.numero_vuelo}
                        </span>
                      </div>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          Gate/Gate:
                        </span>
                        <span>{index?.fk_vuelo?.gate}</span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          A/C Reg:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.fk_vuelo?.ac_reg}
                        </span>
                      </div>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          A/C Type:
                        </span>
                        <span>{index?.fk_vuelo?.ac_type}</span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          ETA:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.fk_vuelo?.ETA}
                        </span>
                      </div>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          ATA:
                        </span>
                        <span>
                          {index?.fk_vuelo?.ATA === null
                            ? "Indefinido"
                            : index?.ATA}
                        </span>
                      </div>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          DATE:
                        </span>
                        <span>{index?.fk_vuelo?.ETA_fecha}</span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          ETD:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText}>
                          {index?.fk_vuelo?.ETD}
                        </span>
                      </div>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          ATD:
                        </span>
                        <span>
                          {index?.fk_vuelo?.ATD === null
                            ? "Indefinido"
                            : index?.ATD}
                        </span>
                      </div>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle}>
                          DATE:
                        </span>
                        <span>{index?.fk_vuelo?.ETD_fecha}</span>
                      </div>
                    </div>
                    <div className={styles.detailDialogInfoRow1}>
                      <div className={styles.detailDialogInfoItem}>
                        <span className={styles.detailDialogInfoItemTitle2}>
                          PLANTILLA:
                        </span>
                        <span className={styles.detailDialogInfoItemValueText2}>
                          {index?.fk_vuelo?.fk_plantilla?.titulo}
                        </span>
                      </div>
                    </div>
                    <p
                      className={
                        styles.detailDialogInfoContainerTitleTextNoMargin
                      }
                    >
                      Tareas
                    </p>
                    <div className={styles.detailDialogInfoRow1}>
                      <div>{TasksArrayPrinter()}</div>
                    </div>
                    <p
                      className={
                        styles.detailDialogInfoContainerTitleTextNoMargin
                      }
                    >
                      Maquinarias
                    </p>
                    <div className={styles.detailDialogInfoRow1}>
                      <div>{MachinesArrayPrinter()}</div>
                    </div>
                    <p
                      className={
                        styles.detailDialogInfoContainerTitleTextNoMargin
                      }
                    >
                      Personal
                    </p>
                    <div className={styles.detailDialogInfoRow1}>
                      <div>{PersonnelArrayPrinter()}</div>
                    </div>
                    <div className={styles.messageContainer}>
                      {clickedFlightState != "Atendido" ? (
                        <>
                          <p className={styles.messageText}>
                            Tu Documento será generado automaticamente cuando el
                            servicio sea completado y enviado!.
                          </p>
                        </>
                      ) : (
                        <div className={styles.detailDialogInfoRow1}>
                          <div className={styles.turnaroundPDFSLinksContainers}>
                            <PDFDownloadLink
                              document={
                                <Document
                                  title={
                                    "Registro del servicio al turnaround Nro: " +
                                    index?.id
                                  }
                                  author={"SIACA"}
                                >
                                  <Page size="A4" style={PDFstyles.page}>
                                    {arrayPrinterPDFGenerator(index)}
                                  </Page>
                                </Document>
                              }
                              fileName={
                                "Turnaround_Data_" +
                                index?.fk_vuelo?.ETA_fecha +
                                "_" +
                                index?.fk_vuelo?.ETA +
                                "_" +
                                index?.fk_vuelo?.fk_aerolinea?.nombre +
                                "_puerta:" +
                                index?.fk_vuelo?.gate +
                                "_id:" +
                                index?.id +
                                ".pdf"
                              }
                            >
                              {({ blob, url, loading, error }) =>
                                loading
                                  ? "Loading document..."
                                  : "Descargar documento del turnaround en inglés"
                              }
                            </PDFDownloadLink>
                            <PDFDownloadLink
                              document={
                                <Document
                                  title={
                                    "Registro del servicio al turnaround Nro: " +
                                    index?.id
                                  }
                                  author={"SIACA"}
                                >
                                  <Page size="A4" style={PDFstyles.page}>
                                    {arrayPrinterPDFGeneratorSpanish(index)}
                                  </Page>
                                </Document>
                              }
                              fileName={
                                "Turnaround_Data_" +
                                index?.fk_vuelo?.ETA_fecha +
                                "_" +
                                index?.fk_vuelo?.ETA +
                                "_" +
                                index?.fk_vuelo?.fk_aerolinea?.nombre +
                                "_puerta:" +
                                index?.fk_vuelo?.gate +
                                "_id:" +
                                index?.id +
                                ".pdf"
                              }
                            >
                              {({ blob, url, loading, error }) =>
                                loading
                                  ? "Loading document..."
                                  : "Descargar documento del turnaround en español"
                              }
                            </PDFDownloadLink>
                          </div>
                        </div>
                      )}
                    </div>
                    {index?.fk_vuelo?.estado === "Atendido" && (
                      <>
                        <p
                          className={styles.detailDialogInfoContainerTitleText}
                        >
                          Datos de ejecución turnaround{" "}
                        </p>
                        <div className={styles.rowOfTurnaroundDataContainer}>
                          {tasksCompletionValuesArrayPrinter()}
                        </div>
                      </>
                    )}
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
            {openAssignDialogID === index?.id && (
              <Dialog
                open={openAssignDialog}
                onClose={() => setOpenAssignDialog(false)}
                className={styles.detailDialog}
                fullScreen={true}
              >
                {(personnelToPostArray.length > 0 ||
                  machinesToPostArray.length > 0) && (
                  <Dialog
                    className={styles.dialogDelete}
                    open={saveSummaryDialog}
                    onClose={() => setsaveSummaryDialog(false)}
                  >
                    <div className={styles.dialogAddMachine}>
                      <p className={styles.taskTextTitle}>
                        Resumen de la reservacion:
                      </p>
                      <p className={styles.taskTextSubTitle}>Personal:</p>
                      <div>{personnelReservationSummaryArrayPrinter()}</div>
                      <p className={styles.taskTextSubTitle}>Maquinarias:</p>
                      <div>{machinesReservationSummaryArrayPrinter()}</div>
                      <div>
                        <GreenButton
                          executableFunction={async () => {
                            await handleSaveData();
                            router.reload();
                          }}
                          buttonText="Confirmar"
                        />
                      </div>
                      <div className={styles.closeDialogSummaryContainer}>
                        <RedButton
                          executableFunction={() => setsaveSummaryDialog(false)}
                          buttonText="Volver"
                        />
                      </div>
                    </div>
                  </Dialog>
                )}
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
                            *El sistema tomará la reserva en las horas que
                            insertaste. Se recomienda tomar la reserva al menos
                            media hora antes y una hora despues de la hora de
                            inicio del turnaround señalada arriba.
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
                          *El sistema tomará la reserva en las horas que
                          insertaste. Se recomienda tomar la reserva al menos
                          media hora antes y una hora despues de la hora de
                          inicio del turnaround señalada arriba.
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
                          setsaveSummaryDialogUpdate(!saveSummaryDialogUpdate);
                          setsaveSummaryDialog(true);
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
              <Tooltip title="Opciones">
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div
            className={styles.openDetailContainer}
            onClick={() => {
              console.log("se hizo click en vermas", index);
              setlateCodeValue(
                index?.fk_codigos_demora?.identificador +
                  " - " +
                  index?.fk_codigos_demora?.alpha +
                  " - " +
                  index?.fk_codigos_demora?.descripcion
              );
              setLoading(true);
              getTemplateTasks(index?.fk_vuelo?.fk_plantilla?.id);
              getLateCodes();
              getMachinesByTurnaround(index?.id);
              getPersonnelByTurnaround(index?.id);
              getTasksCompletionsList(index?.id);
              setOpenDetailDialogID(index?.id);
              setclickedFlightState(index?.fk_vuelo?.estado);
              setOpenDetailDialog(true);
              setLoading(false);
            }}
          >
            {loading && <LoadingScreen />}
            <p className={styles.openDetailContainerText}>Ver mas</p>
          </div>
          <div
            className={styles.openDetailContainer2}
            onClick={async () => {
              await setLoading(true);
              await getMachinesList();
              await getTemplateTasks(index?.fk_vuelo?.fk_plantilla?.id);
              await getMachinesByTurnaround(index?.id);
              await getMachineryQuantityByTemplate(
                index?.fk_vuelo?.fk_plantilla?.id
              );
              await getPersonnelDepartments();
              await setOpenAssignDialogID(index.id);
              await setTurnaroundDate(index?.fecha_inicio);
              await setOpenAssignDialog(true);
              await setLoading(false);
            }}
          >
            {loading && <LoadingScreen />}
            <p className={styles.openDetailContainerText}>Asignar</p>
          </div>
          <div className={styles.imageContainer}>
            {index?.fk_aerolinea?.nombre} image not found
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
        <div className={styles.filtreContainer}>
          <Combobox
            onClickFilteringFunction={filterArray}
            setIsFiltered={setIsFilteredResults}
            filterValues={filterValues}
          />
        </div>

        <GreenButton
          executableFunction={() => router.push("/Turnarounds/Templates")}
          buttonText="Plantillas"
        />
      </div>
      <div className={styles.flightsListContainer}>
        {arrayList3?.[0]?.["status"] != 400 ? arrayPrinter() : undefined}
      </div>
    </main>
  );
};

export default TurnaroundsMainPage;

let machineryArrayAux: any = [];
let machineryQuantityArrayAux: any = [];
