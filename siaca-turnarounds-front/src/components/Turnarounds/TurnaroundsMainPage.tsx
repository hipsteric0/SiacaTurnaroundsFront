import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./TurnaroundsMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Table , Spacer} from "@nextui-org/react";
import { TableBody, Dialog } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Dropdown } from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { Collapse, Text } from "@nextui-org/react";
import {Card, Image} from "@nextui-org/react";
import RedButton from "../Reusables/RedButton";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface PageProps {
  setStep: (value: number) => void;
}

const TemplatesPage: React.FC<PageProps> = ({ setStep }) => {
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
        const url = "/api/turnaroundsList";
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

  const deleteTurnaround = async (turnaroundID: number) => {
    const fetchData = async () => {
      try {
        const url = "/api/deleteTurnaround";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            turnaroundId: turnaroundID,
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

  const handleDeleteTurnaround = async (turnaroundID: number) => {
    deleteTurnaround(turnaroundID);
  };

  const arrayPrinter = () => {
    let y: any = [];
    console.log("arrayList3", arrayList3.length);
    const [hoverEyeId, sethoverEyeId] = useState(-1);
    const [hoverPencilId, sethoverPencilId] = useState(-1);
    const [hoverTrashId, sethoverTrashId] = useState(-1);

    arrayList3.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
              <Dialog
              className={styles.dialogDelete}
              open={deleteDialog}
              onClose={() => setDeleteDialog(false)}
            >
              <div className={styles.dialogBack}>
              <div className={styles.dialogText}>
                <div className={styles.warningIcon}><WarningAmberIcon color="warning" fontSize="inherit"/></div>
                <p><strong>¿Está seguro que desea eliminar este Turnaround?</strong></p>
                <br/>
                <p>Identificador: <strong>{index.identificador}</strong></p>
                <p>No. vuelo: <strong>{index.fk_vuelo.numero_vuelo}</strong></p>
                <div className={styles.dialogButtons}>
                <GreenButton
                  executableFunction={() => {
                  handleDeleteTurnaround(index.id);
                  }}
                  buttonText="Si"
                />
                <RedButton
                  executableFunction={() => {
                    setDeleteDialog(false);
                  }}
                  buttonText="No"
                />
                </div>
              </div>
              </div>
            </Dialog>
          <td>{index.identificador}</td>
          <td>{index.fk_vuelo.numero_vuelo}</td>
          <td>{index.fecha_inicio}</td>
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
               /**id  */
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
                /**id  */
                
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
          executableFunction={() => router.push("/Turnarounds/Templates")}
          buttonText="Plantillas"
        />
      </div>
      <div className={styles.airlinesListContainer}>
        <div>
          <div className={styles.tableTitlesContainer}>
            <span>Identificador</span>
            <span>No. vuelo</span>
            <span>Fecha de inicio</span>
            <span>Opciones</span>
          </div>
          {arrayPrinter()}
        </div>
        </div>
    </main>
  );
};

export default TemplatesPage;


