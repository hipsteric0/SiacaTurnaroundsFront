import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./DocsMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Table , Spacer} from "@nextui-org/react";
import { TableBody } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Dropdown } from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { Collapse, Text } from "@nextui-org/react";
import {Card, Image} from "@nextui-org/react";

interface PageProps {
  setStep: (value: number) => void;
}

const DocsPage: React.FC<PageProps> = ({ setStep }) => {
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
        const url = "/api/docsList";
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

  const arrayPrinter = () => {
    let y: any = [];
    console.log("arrayList3", arrayList3.length);
    const [hoverEyeId, sethoverEyeId] = useState(-1);
    const [hoverPencilId, sethoverPencilId] = useState(-1);
    const [hoverTrashId, sethoverTrashId] = useState(-1);

    arrayList3.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          <td>{index.fk_vuelo.numero_vuelo}</td>
          <td>{index.fecha}</td>
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
      <div className={styles.airlinesListContainer}>
        <div>
          <div className={styles.tableTitlesContainer}>
            <span>No. vuelo</span>
            <span>Fecha</span>
            <span>Opciones</span>
          </div>
          {arrayPrinter()}
        </div>
        </div>
    </main>
  );
};

export default DocsPage;


