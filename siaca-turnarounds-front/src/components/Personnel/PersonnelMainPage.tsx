import GreenButton2 from "@/components/Reusables/GreenButton2";
import styles from "./PersonnelMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Table, Spacer } from "@nextui-org/react";
import { TableBody, Dialog, Autocomplete, TextField } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Dropdown } from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { text } from "stream/consumers";
import Combobox from "../Reusables/Combobox";
import RedButton2 from "../Reusables/RedButton2";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GreenButton from "../Reusables/GreenButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { AccessAlarmOutlined } from "@mui/icons-material";


interface PageProps {
  setStep: (value: number) => void;
}

const PersonnelMainPage: React.FC = () => {
  //if token exists show regular html else show not signed in screen

  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState([]);
  const [arrayList4, setArrayList4] = useState([]);
  const [arrayFilteredList3, setArrayFilteredList3] = useState([]);
  const [isFilteredResults, setIsFilteredResults] = useState(false);
  const [filterValues2, setfilterValues2] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [denyDialog, setDenyDialog] = useState(false);
  const [aceptDialog, setAceptDialog] = useState(false);
  const [listDialog, setListDialog] = useState(false);

  const [infoDialog, setInfoDialog] = useState(false);
  const [RoleDialog, setRoleDialog] = useState(false);
  
  const [solicitudeCounter, setSolicitudeCounter] = useState(-1);


  const [lateCodesArray, setlateCodesArray] = useState([""]);
  const [lateCodesData, setlateCodesData] = useState();
  const [lateCodeValue, setlateCodeValue] = useState("");
  const [lateCodeValueIDForPatchUpdate, setlateCodeValueIDforPatchUpdate] =
    useState("");

  let filterValues: any[] = [];

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getSolicitudeList();
  }, []);

  useEffect(() => {
    getSolicitudeCount();
  }, []);

  const getList = async () => {
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
  const setFilterValues = () => {
    arrayList3.map((value: any) => {
      if (filterValues.indexOf(value["departamento"])) {
        filterValues.push(value["departamento"]);
      }
    });
  };

  const getSolicitudeList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/personnelSolicitudeList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setArrayList4(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const filterArray = (filtername: string) => {
    let filteredUsers = arrayList3.filter((user) => {
      return user["departamento"] === filtername;
    });
    setArrayFilteredList3(filteredUsers);
  };

  const sortArrayByName = () => {
    let filteredUsers = arrayList3.sort((item1, item2) => {
      if (item1["fk_user"]["first_name"] < item2["fk_user"]["first_name"]) {
        return -1;
      }
      if (item1["fk_user"]["first_name"] > item2["fk_user"]["first_name"]) {
        return 1;
      }
      return 0;
    });

    setIsFilteredResults(true);
    setArrayFilteredList3(filteredUsers);
    setArrayFilteredList3(filteredUsers);
    filteredUsers.pop();
    setArrayFilteredList3(filteredUsers);
  };

  const deletePersonnel = async (personnelID: number) => {
    const fetchData = async () => {
      try {
        const url = "/api/deletePersonnel";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            personnelId: personnelID,
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

  const handleDeletePersonnel = async (airlineID: number) => {
    deletePersonnel(airlineID);
  };

  const changePersonnelState = async (personnelID: number) => {
    const fetchData = async () => {
      try {
        const url = "/api/changePersonnelState";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            personnelId: personnelID,
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

  const getSolicitudeCount = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/solicitudeCounter";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setSolicitudeCounter(result.contador);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };


  const [searchTerm, setSearchTerm] = useState('');

  const arrayPrinter = () => {
    let y: any = [];
    let arrayList3aux: any = [];
    const [hoverEyeId, sethoverEyeId] = useState(-1);
    const [hoverPencilId, sethoverPencilId] = useState(-1);
    const [hoverTrashId, sethoverTrashId] = useState(-1);
    const [clickID, setclickID] = useState(-1);

    isFilteredResults
      ? (arrayList3aux = arrayFilteredList3)
      : (arrayList3aux = arrayList3);

      const filteredArray = arrayList3aux.filter(
        (index: any) =>
          `${index?.fk_user?.first_name} ${index?.fk_user?.last_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );

    filteredArray.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          {
            <Dialog
              className={styles.dialogDelete}
              open={deleteDialog}
              onClose={() => setDeleteDialog(false)}
            >
          <div>
            <div
              className={styles.closeIconDialog}
              onClick={() => setDeleteDialog(false)}
            >
              <Tooltip title="Cerrar">
              <IconButton>
              <CloseRoundedIcon htmlColor="#4d4e56" />
              </IconButton>
              </Tooltip>
            </div>
          </div>
              <div className={styles.dialogBack}>
                <div className={styles.dialogText}>
                  <div className={styles.warningIcon}>
                    <WarningAmberIcon color="warning" fontSize="inherit" />
                  </div>
                  <p>
                    <strong>
                      ¿Está seguro que desea eliminar este usuario?
                    </strong>
                  </p>
                  <br />
                  <div className={styles.dialogButtons}>
                    <GreenButton2
                      executableFunction={() => {
                        handleDeletePersonnel(clickID);
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
          }

{
            <Dialog
              className={styles.dialogTextPersonnel}
              open={infoDialog}
              fullWidth={true}
              maxWidth= "sm"
              scroll="paper"
              onClose={() => setInfoDialog(false)}
            >
              <div className={styles.dialogBack}>
              <div>
            <div
              className={styles.closeIconDialog}
              onClick={() => setInfoDialog(false)}
            >
              <Tooltip title="Cerrar">
              <IconButton>
              <CloseRoundedIcon htmlColor="#4d4e56" />
              </IconButton>
              </Tooltip>
            </div>
          </div>
                <div className={styles.dialogTextPersonnel}>
                  <div className={styles.warningIcon}>
                  <center>  <AccountCircleIcon fontSize="inherit" /> </center>
                  </div>
                  <div className={styles.dividerText}>
                      <Divider> Nombre </Divider> 
                      </div>
                      <br/>
                      {arrayList3.find((o) => o.fk_user?.id === clickID)?.fk_user?.first_name} {" "} {arrayList3.find((o) => o.fk_user?.id  === clickID)?.fk_user?.last_name}
                      <Spacer/>

                      <div className={styles.dividerText}>
                      <Divider> Cédula </Divider> 
                      </div>
                      <br/>
                      {arrayList3.find((o) => o.fk_user?.id  === clickID)?.cedula}
                      <Spacer/>

                      <div className={styles.dividerText}>
                      <Divider> Contacto </Divider> 
                      </div>
                    <br/>
                     <strong>Teléfono:</strong> {arrayList3.find((o) => o.fk_user?.id  === clickID)?.telefono} 
                      <Spacer/>
                      <strong>Correo:</strong>  {arrayList3.find((o) => o.fk_user?.id === clickID)?.fk_user?.username}
                      <Spacer/>

                      <div className={styles.dividerText}>
                      <Divider> Información </Divider> 
                      </div>
                    <br/>
                    <strong>Departamento:</strong>  {arrayList3.find((o) => o.fk_user?.id  === clickID)?.fk_departamento?.nombre}
                      <Spacer/>
                      <strong>Cargo:</strong>  {arrayList3.find((o) => o.fk_user?.id  === clickID)?.fk_cargo?.nombre}
                      <Spacer/>
                      <strong>Turno:</strong>  {arrayList3.find((o) => o.fk_user?.id  === clickID)?.turno}
                      <Spacer/>
                </div>
              </div>
            </Dialog>
          }


            {
            <Dialog
              className={styles.dialogDelete}
              open={RoleDialog}
              onClose={() => setRoleDialog(false)}
              fullWidth={true}
            >
          <div>
            <div
              className={styles.closeIconDialog}
              onClick={() => setRoleDialog(false)}
            >
              <Tooltip title="Cerrar">
              <IconButton>
              <CloseRoundedIcon htmlColor="#4d4e56" />
              </IconButton>
              </Tooltip>
            </div>
          </div>
              <div className={styles.dialogBack}>
                <div className={styles.dialogText}>
                  <div className={styles.warningIcon}>
                    <EditNoteIcon color="success" fontSize="inherit" />
                  </div>
                  
                    <strong>
                      Editar rol del usuario:
                    </strong>
                    <Spacer/>
                    <p>{arrayList3.find((o) => o.fk_user?.id === clickID)?.fk_user?.first_name} {" "} {arrayList3.find((o) => o.fk_user?.id  === clickID)?.fk_user?.last_name}</p>
                    <Spacer/>
                    <div className={styles.roleList}>

                          <Autocomplete
                          className={styles.autoComplete}
                            size="small"
                            sx={{ width: "400px"}}
                            value={lateCodeValue} //el valor que toma por defecto, esta comentado por que debe ser nulo
                            onInputChange={(event, newInputValue) => {
                              setlateCodeValue(newInputValue);
                              setlateCodeValueIDForPatch(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={lateCodesArray}
                            renderInput={(params) => (
                              <TextField {...params} label={""} 
                              />
                            )}
                          />

                        </div>
                        <Spacer/>
                  <div className={styles.dialogButtons}>
                    <GreenButton2
                      executableFunction={() => {
                        patchLateCode(clickID);
                        setRoleDialog(false);

                      }}
                      buttonText="Aceptar"
                    />
                    <RedButton2
                      executableFunction={() => {
                        setRoleDialog(false);
                      }}
                      buttonText="Regresar"
                    />
                  </div>
                </div>
              </div>
            </Dialog>
          }

          <td>
            {index?.fk_user?.first_name} {index?.fk_user?.last_name}
          </td>
          <td>{index?.fk_cargo?.nombre}</td>
          <td>{index?.fk_departamento?.nombre}</td>
          <td>
            {index?.fk_user?.username}
            <p>{index?.telefono}</p>
          </td>
          <td>{index?.turno}</td>
          <td className={styles.iconsContainer}>
            <div
              className={styles.functionIcon}
              onMouseEnter={() => {
                sethoverEyeId(index.id);
              }}
              onMouseLeave={() => {
                sethoverEyeId(-1);
              }}
            >
              <Tooltip title="Detalles">
              <IconButton>
              <RemoveRedEyeIcon
                htmlColor={hoverEyeId === index.id ? "#00A75D" : "#4D4E56"}
                onClick={() => {
                  setclickID(index?.fk_user?.id);
                  setInfoDialog(true);
                }}
              />{" "}
              </IconButton>
              </Tooltip>
            </div>

            <div
              className={styles.functionIcon}
              onMouseEnter={() => {
                sethoverPencilId(index.id);
              }}
              onMouseLeave={() => {
                sethoverPencilId(-1);
              }}
            >
               <Tooltip title="Editar rol">
              <IconButton>
              <BorderColorOutlinedIcon
                htmlColor={hoverPencilId === index.id ? "#00A75D" : "#4D4E56"}
                onClick={() => {
                  getLateCodes();
                  setclickID(index?.fk_user?.id);
                  setRoleDialog(true);
                }}
              />{" "}
              </IconButton>
              </Tooltip>
            </div>

            <div
              className={styles.functionIcon}
              onMouseEnter={() => {
                sethoverTrashId(index.id);
              }}
              onMouseLeave={() => {
                sethoverTrashId(-1);
              }}
            >
               <Tooltip title="Eliminar">
              <IconButton>
              <DeleteOutlineOutlinedIcon
                htmlColor={hoverTrashId === index.id ? "#f10303" : "#4D4E56"}
                onClick={() => {
                  setclickID(index.fk_user.id);
                  setDeleteDialog(true);
                }}
              />
              </IconButton>
              </Tooltip>
            </div>
          </td>
        </div>
      );
    });
    setFilterValues();
    return y;
  };

  const arrayPrinter2 = () => {
    let y: any = [];
    let arrayList4aux: any = [];
    const [hoverEyeId, sethoverEyeId] = useState(-1);
    const [hoverPencilId, sethoverPencilId] = useState(-1);
    const [hoverTrashId, sethoverTrashId] = useState(-1);
    const [clickID2, setclickID2] = useState(-1);

    isFilteredResults
      ? (arrayList4aux = arrayFilteredList3)
      : (arrayList4aux = arrayList4);
    arrayList4aux.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          {
            <Dialog
              className={styles.dialogDelete}
              open={aceptDialog}
              onClose={() => setAceptDialog(false)}
            >
          <div>
            <div
              className={styles.closeIconDialog}
              onClick={() => setAceptDialog(false)}
            >
              <Tooltip title="Cerrar">
              <IconButton>
              <CloseRoundedIcon htmlColor="#4d4e56" />
              </IconButton>
              </Tooltip>
            </div>
          </div>
              <div className={styles.dialogBack}>
                <div className={styles.dialogText}>
                  <div className={styles.warningIcon}>
                    <CheckCircleOutlineIcon
                      color="success"
                      fontSize="inherit"
                    />
                  </div>
                  <p>
                    <strong>
                      ¿Está seguro que desea aceptar este usuario?
                    </strong>
                    <Spacer/>
                    <p>Asignar rol del usuario:</p>
                    <Spacer/>
                    <div className={styles.roleList}>
                      <center>
                          <Autocomplete
                            size="small"
                            sx={{ width: "350px" }}
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
                          </center>
                        </div>

                  </p>
                  <br />
                  <div className={styles.dialogButtons}>
                    <GreenButton2
                      executableFunction={() => {
                        changePersonnelState(clickID2);
                        patchLateCode(clickID2);
                      }}
                      buttonText="Aceptar"
                    />
                    <RedButton2
                      executableFunction={() => {
                        setAceptDialog(false);
                      }}
                      buttonText="Volver"
                    />
                  </div>
                </div>
              </div>
            </Dialog>
          }

          {
            <Dialog
              className={styles.dialogDelete}
              open={denyDialog}
              onClose={() => setDenyDialog(false)}
            >
          <div>
            <div
              className={styles.closeIconDialog}
              onClick={() => setDenyDialog(false)}
            >
              <Tooltip title="Cerrar">
              <IconButton>
              <CloseRoundedIcon htmlColor="#4d4e56" />
              </IconButton>
              </Tooltip>
            </div>
          </div>
              <div className={styles.dialogBack}>
                <div className={styles.dialogText}>
                  <div className={styles.warningIcon}>
                    <BlockIcon color="error" fontSize="inherit" />
                  </div>
                  <p>
                    <strong>
                      ¿Está seguro que desea rechazar a este usuario?
                    </strong>
                  </p>
                  <br />
                  <div className={styles.dialogButtons}>
                    <GreenButton2
                      executableFunction={() => {
                        handleDeletePersonnel(clickID2);
                      }}
                      buttonText="Si"
                    />
                    <RedButton2
                      executableFunction={() => {
                        setDenyDialog(false);
                      }}
                      buttonText="No"
                    />
                  </div>
                </div>
              </div>
            </Dialog>
          }

          <td>
            {index?.fk_user?.first_name} {index?.fk_user?.last_name}
          </td>
          <td>{index?.fk_cargo?.nombre}</td>
          <td>{index?.fk_departamento?.nombre}</td>
          <td>
            {index?.fk_user?.username}
            <p>{index?.telefono}</p>
          </td>
          <td>{index?.turno}</td>
          <td className={styles.iconsContainer}>
            <div
              className={styles.functionIcon}
              onMouseEnter={() => {
                sethoverEyeId(index.id);
              }}
              onMouseLeave={() => {
                sethoverEyeId(-1);
              }}
            >
              <Tooltip title="Aceptar">
              <IconButton>
              <CheckCircleOutlineIcon
                htmlColor={hoverEyeId === index.id ? "#00A75D" : "#4D4E56"}
                onClick={() => {
                  setclickID2(index.fk_user.id);
                  setAceptDialog(true);
                }}
              />{" "}
              </IconButton>
              </Tooltip>
            </div>

            <div
              className={styles.functionIcon}
              onMouseEnter={() => {
                sethoverTrashId(index.id);
              }}
              onMouseLeave={() => {
                sethoverTrashId(-1);
              }}
            >
              <Tooltip title="Denegar">
              <IconButton>
              <BlockIcon
                htmlColor={hoverTrashId === index.id ? "#f10303" : "#4D4E56"}
                onClick={() => {
                  setclickID2(index.fk_user.id);
                  setDenyDialog(true);
                }}
              />
              </IconButton>
              </Tooltip>
            </div>
          </td>
        </div>
      );
    });
    return y;
  };



  const setlateCodeValueIDForPatch = (value: string) => {
    let identificadorAuxiliar = value;
    lateCodesData?.map((element: any) => {
      if (element?.rol === identificadorAuxiliar) {
        setlateCodeValueIDforPatchUpdate(element?.id);
        console.log("el ID clickeado es ", element?.id);
      }
    });
  };

  
  const getLateCodes = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/getRoleList";
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


  const setlateCodesOptions = (data: any) => {
    let auxiliaryArray: string[] = [];
    data.map((element: any) => {
      auxiliaryArray.push(
        (
          element?.rol
        ).toString()
      );
    });
    setlateCodesArray(auxiliaryArray);
    console.log("auxiliaryArray", auxiliaryArray);
  };

  
  const patchLateCode = async (userID: any) => {
    const fetchData = async () => {
      try {
        const url = "/api/patchRole";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            userId: userID,
            role_id: lateCodeValueIDForPatchUpdate,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("patchLateCode", result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };





  return (
    <main className={styles.containerPersonnelMainPage}>
      <Spacer />

      {
        <Dialog
          className={styles.dialogList}
          open={listDialog}
          onClose={() => setListDialog(false)}
          fullScreen={true}
        >
          <div>
            <div
              className={styles.closeIconDialog}
              onClick={() => setListDialog(false)}
            >
              <Tooltip title="Cerrar">
              <IconButton>
              <CloseRoundedIcon htmlColor="#4d4e56" />
              </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className={styles.personnelListDialogContainer}>
            <div className={styles.personnelListDialog}>
              <div>
                <div className={styles.tableTitlesContainer}>
                  <span>Nombre</span>
                  <span>Cargo</span>
                  <span>Departamento</span>
                  <span>Contacto</span>
                  <span>Turno</span>
                  <span>Opciones</span>
                </div>
                {arrayPrinter2()}
              </div>
            </div>
          </div>

          {!allowContinue}
        </Dialog>
      }

      <div className={styles.upperSectionContainer}>
      <div>
          <input
            className={styles.comboboxMainContainer}
            type="text"
            placeholder="Filtrar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
        <div className={styles.greenbuttonSuperContainer}>
        <Badge badgeContent={solicitudeCounter} color="error">
          <GreenButton
            executableFunction={() => {setListDialog(true); getLateCodes();}}
            buttonText={"Solicitudes"}
            disabled={solicitudeCounter < 1}
          />
          </Badge>
        </div>
      </div>

      <div className={styles.personnelListContainer}>
        <div>
          <div className={styles.tableTitlesContainer}>
            <span /*onClick={() => sortArrayByName()}*/>Nombre</span>
            <span>Cargo</span>
            <span>Departamento</span>
            <span>Contacto</span>
            <span>Turno</span>
            <span>Opciones</span>
          </div>
          {arrayPrinter()}
        </div>
      </div>
      {!allowContinue}
    </main>
  );
};

export default PersonnelMainPage;
