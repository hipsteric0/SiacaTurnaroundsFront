import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./PersonnelMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Table, Spacer } from "@nextui-org/react";
import { TableBody, Dialog} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Dropdown } from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { text } from "stream/consumers";
import Combobox from "../Reusables/Combobox";
import RedButton from "../Reusables/RedButton";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface PageProps {
  setStep: (value: number) => void;
}

const PersonnelMainPage: React.FC = () => {
  //if token exists show regular html else show not signed in screen

  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState([]);
  const [arrayFilteredList3, setArrayFilteredList3] = useState([]);
  const [isFilteredResults, setIsFilteredResults] = useState(false);
  const [filterValues2, setfilterValues2] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  let filterValues: any[] = [];

  useEffect(() => {
    getList();
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

  const filterArray = (filtername: string) => {
    let filteredUsers = arrayList3.filter((user) => {
      return user["departamento"] === filtername;
    });
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

  const arrayPrinter = () => {
    let y: any = [];
    let arrayList3aux: any = [];
    const [hoverEyeId, sethoverEyeId] = useState(-1);
    const [hoverPencilId, sethoverPencilId] = useState(-1);
    const [hoverTrashId, sethoverTrashId] = useState(-1);

    isFilteredResults
      ? (arrayList3aux = arrayFilteredList3)
      : (arrayList3aux = arrayList3);
    arrayList3aux.map((index: any) => {
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
              <p><strong>¿Está seguro que desea eliminar este usuario?</strong></p>
              <br/>
              <p>{index.fk_user.first_name} {" "} {index.fk_user.last_name}</p>
              <div className={styles.dialogButtons}>
              <GreenButton
                executableFunction={() => {
                handleDeletePersonnel(index.fk_user.id);
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

          }
          <td>
            {index.fk_user.first_name} {index.fk_user.last_name}
          </td>
          <td>{index.cargo}</td>
          <td>{index.departamento}</td>
          <td>
            {index.fk_user.username} 
            <p>{index.telefono}</p>
          </td>
          <td>{index.turno}</td>
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
    setFilterValues();
    return y;
  };

  return (
    <main className={styles.containerPersonnelMainPage}>
      <Spacer />

      <div className={styles.comboboxMainContainer}>
        <Combobox
          onClickFilteringFunction={filterArray}
          setIsFiltered={setIsFilteredResults}
          filterValues={filterValues}
        />
      </div>

      <div className={styles.personnelListContainer}>
        <div>
          <div className={styles.tableTitlesContainer}>
            <span>Nombre</span>
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
