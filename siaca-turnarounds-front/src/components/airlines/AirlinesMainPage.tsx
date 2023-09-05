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
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface PageProps {
  setStep: (value: number) => void;
  setflightID: (value: number) => void;
}

const AirlinesMainPage: React.FC<PageProps> = ({ setStep, setflightID }) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
 

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

  const handleDeleteAirline = async (airlineID: number) => {
    deleteAirline(airlineID);
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
                <div className={styles.warningIcon}><WarningAmberIcon color="warning" fontSize="inherit"/></div>
                <p><strong>¿Está seguro que desea eliminar {arrayList3.find((o) => o.id=== clickID)?.nombre}?</strong></p>
                <br/>
                <p>Si elimina esta aerolinea seran eliminados <strong>todos</strong> los vuelos y</p>
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
          <td>Logo</td>
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
              <RemoveRedEyeIcon
              htmlColor={hoverEyeId === index.id ? "#00A75D" : "#4D4E56"}
              onClick={() => {
                
              }}/>{" "}
            </div>

            <div className={styles.functionIcon}
            onMouseEnter={() => {
              sethoverPencilId(index.id);
            }}
            onMouseLeave={() => {              
              sethoverPencilId(-1);
            }}>
              <BorderColorOutlinedIcon 
              htmlColor={hoverPencilId === index.id ? "#00A75D" : "#4D4E56"}
              onClick={() => {
                setflightID(index.id);
                setStep(2);
              }}/>{" "}
            </div>

            <div className={styles.functionIcon}
            onMouseEnter={() => {
              sethoverTrashId(index.id);
            }}
            onMouseLeave={() => {              
              sethoverTrashId(-1);
            }}>
              <DeleteOutlineOutlinedIcon
               htmlColor={hoverTrashId === index.id ? "#f10303" : "#4D4E56"}
               onClick={() => {
                setclickID(index.id);
                setDeleteDialog(true);
               }}
              />
            </div>
          </td>
        </div>
      );
    });

    return y;
  };

  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => setStep(1)}
          buttonText="Registrar aerolinea"
        />
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
