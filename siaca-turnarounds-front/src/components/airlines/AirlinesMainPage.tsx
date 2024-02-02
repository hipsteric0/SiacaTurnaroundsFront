import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./AirlinesMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Table, Spacer } from "@nextui-org/react";
import { Dialog, TableBody } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Dropdown } from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { text } from "stream/consumers";
import RedButton2 from "../Reusables/RedButton2";
import GreenButton2 from "@/components/Reusables/GreenButton2";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Divider from '@mui/material/Divider';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';


import { motion } from 'framer-motion';
import LoadingScreen from '../Reusables/LoadingScreen';



interface PageProps {
  setStep: (value: number) => void;
  setflightID: (value: number) => void;
  setCityID: (value: number) => void;
}

const AirlinesMainPage: React.FC<PageProps> = ({
  setStep,
  setflightID,
  setCityID,
}) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState([]);
  const [arrayList4, setArrayList4] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [citiesDialog, setCitiesDialog] = useState(false);
  const [registerDialog, setRegisterDialog] = useState(false);
  const [deleteCitiesDialog, setDeleteCitiesDialog] = useState(false);

  const [aerolinea, setAerolinea] = useState("");
  const [codigo, setCodigo] = useState("");
  const [correoPrincipal, setCorreoPrincipal] = useState("");
  const [correoSecundario, setCorreoSecundario] = useState("");
  const [telefonoPrincipal, setTelefonoPrincipal] = useState("");
  const [telefonoSecundario, setTelefonoSecundario] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");

  const [arrayAirline, setArrayAirline] = useState([]);
  const [airlineDialog, setAirlineDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
    getCitiesList();
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

  const deleteAirline = async (airlineID: number) => {
    const fetchData = async () => {
      try {
        const url = "/api/deleteAirline";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            airlineId: airlineID,
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

  /* ELIMINAR CIUDAD */
  const deleteCity = async (cityID: number) => {
    const fetchData = async () => {
      try {
        const url = "/api/deleteCity";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            cityId: cityID,
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

  const getCitiesList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/citiesListDeparture";
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


  /* DATOS DE LA AEROLINEA */
  const getAirline = async ( airlineID : number) => {
    const fetchData = async () => {
      try {
        const url = "/api/specificAirlineByID";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            flightID: airlineID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setArrayAirline(Object.values(result));
            console.log("result", result);

            setAerolinea(result?.nombre);
            setCodigo(result?.codigo);
            setCorreoPrincipal(result?.correo);
            setCorreoSecundario(result?.correo_secundario);
            setTelefonoPrincipal(result?.telefono);
            setTelefonoSecundario(result?.telefono_secundario);
            setPais(result?.pais);
            setCiudad(result?.ciudad);


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

  const handleDeleteAirline = async (airlineID: number) => {
    deleteAirline(airlineID);
  };

  const handleDeleteCity = async (cityID: number) => {
    deleteCity(cityID);
  };

  const handleAirline = async (airlineID: number) => {
    getAirline(airlineID);
    console.log("DATOS DE AEROLINEA",airlineID)
  };


  const arrayPrinter = () => {
    let y: any = [];

    console.log("arrayList3", arrayList3.length);
    const [hoverEye, sethoverEye] = useState(false);
    const [hoverEyeId, sethoverEyeId] = useState(-1);
    const [hoverPencilId, sethoverPencilId] = useState(-1);
    const [hoverTrashId, sethoverTrashId] = useState(-1);
    const [clickID, setclickID] = useState(-1);

    arrayList3.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          {
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
                      ¿Está seguro que desea eliminar{" "}
                      {arrayList3.find((o) => o.id === clickID)?.nombre}?
                    </strong>
                  </p>
                  <br />
                  <p>
                    Si elimina esta aerolinea seran eliminados{" "}
                    <strong>todos</strong> los vuelos y
                  </p>
                  turnarounds asociados a ella.
                  <div className={styles.dialogButtons}>
                    <GreenButton2
                      executableFunction={() => {
                        handleDeleteAirline(clickID);
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
              className={styles.dialogTextAirline}
              open={airlineDialog}
              fullWidth={true}
              maxWidth= "sm"
              scroll="paper"
              onClose={() => setAirlineDialog(false)}
            >
              <div className={styles.dialogBack}>
              <div
              className={styles.closeIconDialog}
              onClick={() => setAirlineDialog(false)}
            >
              <Tooltip title="Cerrar">
              <IconButton>
              <CloseRoundedIcon htmlColor="#4d4e56" />
              </IconButton>
              </Tooltip>
            </div>
                <div className={styles.dialogTextAirline}>
                  <div className={styles.warningIcon}>
                  <div className={styles.dividerText}>
                   <center> <AirplaneTicketIcon fontSize="inherit" /></center>
                   </div>
                   <Spacer/>
                  </div>

                      <div className={styles.dividerText}>
                      <Divider> Aerolinea </Divider> 
                      </div>
                      <br/>
                      {arrayList3.find((o) => o.id === clickID)?.nombre}
                      <Spacer/>

                      <div className={styles.dividerText}>
                      <Divider> Código </Divider> 
                      </div>
                      <br/>
                      {arrayList3.find((o) => o.id === clickID)?.codigo}
                      <Spacer/>

                      <div className={styles.dividerText}>
                      <Divider> Correos </Divider> 
                      </div>
                    <br/>
                     <strong>Principal:</strong> {arrayList3.find((o) => o.id === clickID)?.correo} 
                      <Spacer/> 
                      <strong>Secundario:</strong>  {arrayList3.find((o) => o.id === clickID)?.correo_secundario}
                      <Spacer/>

                      <div className={styles.dividerText}>
                      <Divider> Teléfonos </Divider> 
                      </div>
                    <br/>
                    <strong>Principal:</strong>  {arrayList3.find((o) => o.id === clickID)?.telefono}
                      <Spacer/>
                      <strong>Secundario:</strong>  {arrayList3.find((o) => o.id === clickID)?.telefono_secundario}
                      <Spacer/>
                </div>
              </div>
            </Dialog>
          }
          
          <td><img src={"http://127.0.0.1:8000"+index.imagen} alt="Logo" width={50} height={50}/></td>
          <td>{index.nombre}</td>
          <td>{index.correo}</td>
          <td>{index.telefono}</td>
          <td>{index.codigo}</td>
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
                  handleAirline(index.id)
                  setclickID(index.id);
                  setAirlineDialog(true);
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
              <Tooltip title="Editar">
              <IconButton>
              <BorderColorOutlinedIcon
                htmlColor={hoverPencilId === index.id ? "#00A75D" : "#4D4E56"}
                onClick={() => {
                  setflightID(index.id);
                  setStep(2);
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
                  setclickID(index.id);
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

    return y;
  };

  const arrayPrinter2 = () => {
    let y: any = [];

    const [hoverEye, sethoverEye] = useState(false);
    const [hoverEyeId, sethoverEyeId] = useState(-1);
    const [hoverPencilId, sethoverPencilId] = useState(-1);
    const [hoverTrashId, sethoverTrashId] = useState(-1);
    const [clickID, setclickID] = useState(-1);

    arrayList4.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          {
            <Dialog
              className={styles.dialogDelete}
              open={deleteCitiesDialog}
              onClose={() => setDeleteCitiesDialog(false)}
            >
              <div className={styles.dialogBack}>
                <div className={styles.dialogText}>
                  <div className={styles.warningIcon}>
                    <WarningAmberIcon color="warning" fontSize="inherit" />
                  </div>
                  <p>
                    <strong>
                      ¿Está seguro que desea eliminar{" "}
                      {arrayList4.find((o) => o.id === clickID)?.nombre}?
                    </strong>
                  </p>
                  <br />
                  <div className={styles.dialogButtons}>
                    <GreenButton2
                      executableFunction={() => {
                        handleDeleteCity(clickID);
                      }}
                      buttonText="Si"
                    />
                    <RedButton2
                      executableFunction={() => {
                        setDeleteCitiesDialog(false);
                      }}
                      buttonText="No"
                    />
                  </div>
                </div>
              </div>
            </Dialog>
          }

          <td>{index.codigo}</td>
          <td>{index.codigo_oaci}</td>
          <td>{index.nombre}</td>
          <td>{index.pais}</td>
          <td>{index.aeropuerto}</td>
          <td className={styles.iconsContainer2}>
            <div
              className={styles.functionIcon}
              onMouseEnter={() => {
                sethoverPencilId(index.id);
              }}
              onMouseLeave={() => {
                sethoverPencilId(-1);
              }}
            >
              <Tooltip title="Editar">
              <IconButton>
              <BorderColorOutlinedIcon
                htmlColor={hoverPencilId === index.id ? "#00A75D" : "#4D4E56"}
                onClick={() => {
                  setCityID(index.id);
                  setStep(4);
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
                  setclickID(index.id);
                  setDeleteCitiesDialog(true);
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


  const Load = () => {
  

    setLoading(true);
    setStep(1);

  }

  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.registerbuttoncontainer}>
        {
          <Dialog
            className={styles.dialogDelete}
            open={citiesDialog}
            fullWidth={true}
            maxWidth="xl"
            scroll="paper"
            onClose={() => setCitiesDialog(false)}
          >
            <div className={styles.dialogBack}>
            <div
              className={styles.closeIconDialog}
              onClick={() => setCitiesDialog(false)}
            >
              <Tooltip title="Cerrar">
              <IconButton>
              <CloseRoundedIcon htmlColor="#4d4e56" />
              </IconButton>
              </Tooltip>
            </div>
              <div className={styles.dialogText}>
                <GreenButton
                  executableFunction={() => setStep(3)}
                  buttonText="Agregar Ciudades"
                />
                <Spacer />
                <div className={styles.airlinesListContainer}>
                  <div>
                    <div className={styles.tableTitlesContainer}>
                      <span>IATA</span>
                      <span>OACI</span>
                      <span>Ciudad/Estado</span>
                      <span>Pais</span>
                      <span>Aeropuerto</span>
                      <span>Opciones</span>
                    </div>
                    {arrayPrinter2()}
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        }
        
        <GreenButton
          executableFunction={() => setCitiesDialog(true)}
          buttonText="Ciudades"
        />
        <Spacer />
        <GreenButton
          executableFunction={() => Load()}
          buttonText="Registrar aerolinea"
        />
        {loading && <LoadingScreen />}
      </div>
      <div className={styles.airlinesListContainer}>
        <div>
          <div className={styles.tableTitlesContainer}>
            <span>Logo</span>
            <span>Nombre</span>
            <span>Correo</span>
            <span>Teléfono</span>
            <span>Código</span>
            <span>Opciones</span>
          </div>
          {arrayPrinter()}
        </div>
      </div>
    </main>
  );
};

export default AirlinesMainPage;
