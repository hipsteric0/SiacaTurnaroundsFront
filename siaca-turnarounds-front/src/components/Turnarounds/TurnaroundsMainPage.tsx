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
import StandardInputV2 from "../Reusables/StandardInputV2";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import LoadingScreen from '../Reusables/LoadingScreen';

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

  const [loading, setLoading] = useState(false);


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
        const url = "/api/getPersonnelDepartmentsList";
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
          personnelListArray[x]?.fk_user?.last_name;
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
                    <p className={styles.detailDialogInfoContainerTitleText}>
                      personal
                    </p>
                    <div className={styles.detailDialogInfoRow1}>
                      lista de personal y seleccion: -1 -2 -3
                    </div>
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
              setLoading(true);
              getTemplateTasks(index?.fk_vuelo?.fk_plantilla?.id);
              getMachinesByTurnaround(index?.id);
              setOpenDetailDialogID(index.id);

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
