import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./TemplatesMainPage.style.module.css";
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
import { Collapse, Text } from "@nextui-org/react";
import { Card, Image } from "@nextui-org/react";
import BackArrow from "@/components/Reusables/BackArrow";
import GreenButton2 from "@/components/Reusables/GreenButton2";
import RedButton2 from "@/components/Reusables/RedButton2";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface PageProps {
  setStep: (value: number) => void;
}

const TurnaroundsMainPage: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [clickID, setclickID] = useState(-1);
  const [deleteCitiesDialog, setDeleteCitiesDialog] = useState(false);
  const [hoverTrashId, sethoverTrashId] = useState(-1);
  const [hoverPencilId, sethoverPencilId] = useState(-1);

  const [detailsDialog, setDetailsDialog] = useState(false);
  const [arrayTemplate, setArrayTemplate] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
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

  const arrayPrinterMachinery = () => {
    let y: any = [];

    const [hoverEye, sethoverEye] = useState(false);
    const [hoverEyeId, sethoverEyeId] = useState(-1);
    const [hoverPencilId, sethoverPencilId] = useState(-1);
    const [hoverTrashId, sethoverTrashId] = useState(-1);
    const [clickID, setclickID] = useState(-1);

    arrayList3.map((index: any) => {
      y[index.id] = <div key={index.id} className={styles.tableInfoRow}></div>;
    });

    return y;
  };

  const deleteTemplate = async (templateID: number) => {
    const fetchData = async () => {
      try {
        const url = "/api/deleteTemplate";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            templateId: templateID,
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

  const detailsTemplate = async (templateID: number) => {
    const fetchData = async () => {
      try {
        const url = "/api/templatesDetails";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
            templateId: templateID,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log(result);
            console.log("values", Object.values(result));
            setArrayTemplate(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const arrayPrinter = () => {
    let y: any = [];
    console.log("arrayList3", arrayList3.length);
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
                      ¿Está seguro que desea eliminar esta plantilla?
                    </strong>
                  </p>
                  <br />
                  <p>
                    Si elimina esta plantilla serán eliminados{" "}
                    <strong>todos</strong> los vuelos y
                  </p>
                  turnarounds asociados a ella.
                  <div className={styles.dialogButtons}>
                    <GreenButton2
                      executableFunction={() => {
                        handleDeleteTemplate(clickID);
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
              className={styles.dialogDelete}
              open={detailsDialog}
              fullScreen={true}
              onClose={() => setDetailsDialog(false)}
            >
              <div className={styles.dialogBack}>
                <div
                className={styles.closeIconDialog}
                onClick={() => setDetailsDialog(false)}
              >
                <CloseRoundedIcon htmlColor="#4d4e56" />
              </div>

                <div className={styles.dialogText}>
                    <div className={styles.detailsListContainer}>
                      <div>
                      <div className={styles.tableContainer}>
                        <span>Tarea</span>
                        <span>Subtarea</span>
                        <span>Tipo</span>
                      </div>
                      {arrayPrinter2()}
                    </div>
                  </div>
                </div>
              </div>

            </Dialog>
          }

          <td>{index.titulo}</td>
          <td>
            <div className={styles.iconRow}>
              <div
                className={styles.functionIcon}
                onMouseEnter={() => {
                  sethoverPencilId(index.id);
                }}
                onMouseLeave={() => {
                  sethoverPencilId(-1);
                }}
              >
              <Tooltip title="Detalles">
                <IconButton>
                <RemoveRedEyeIcon
                  htmlColor={hoverPencilId === index.id ? "#00A75D" : "#4D4E56"}
                  onClick={() => {
                    //setCityID(index.id);
                    //setStep(4);
                    setDetailsDialog(true);
                    handleDetailsTemplate(index.id)
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
                />{" "}
              </IconButton>
            </Tooltip>
              </div>
            </div>
          </td>
        </div>
      );
    });

    return y;
  };


  const arrayPrinter2 = () => {
    let y: any = [];
    console.log("arrayTemplate", arrayTemplate.length);
    arrayTemplate.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableDetailsRow}>

          <td><strong>{index?.fk_tarea?.titulo}</strong></td>
          <td>{index?.titulo}</td>
          <td>{index?.fk_tipo?.nombre}</td>

        </div>
      );
    });

    return y;
  };

  const handleDeleteTemplate = async (templateID: number) => {
    deleteTemplate(templateID);
  };

  const handleDetailsTemplate = async (templateID: number) => {
    detailsTemplate(templateID);
  };



  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.backArrowIcon}>
        <BackArrow executableFunction={() => router.push("/Turnarounds")} />
      </div>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => setStep(1)}
          buttonText="Registrar plantilla"
        />
      </div>
      <div className={styles.airlinesListContainer}>
        <div>
          <div className={styles.tableTitlesContainer}>
            <span>Plantillas</span>
            <span>Opciones</span>
          </div>
          {arrayPrinter()}
        </div>
      </div>
    </main>
  );
};

export default TurnaroundsMainPage;


