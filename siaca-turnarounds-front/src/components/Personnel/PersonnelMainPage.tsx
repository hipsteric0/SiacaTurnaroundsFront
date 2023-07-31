import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./PersonnelMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Table, Spacer } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Dropdown } from "@nextui-org/react";
import { useMediaQuery } from "@mui/material";
import { text } from "stream/consumers";

interface PageProps {
  setStep: (value: number) => void;
}

const PersonnelMainPage: React.FC = () => {
  //if token exists show regular html else show not signed in screen

  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [arrayList3, setArrayList3] = useState([]);

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
    arrayList3.map((index: any) => {
      y[index.id] = (
        <div key={index.id} className={styles.tableInfoRow}>
          <td>
            {index.fk_user.first_name} {index.fk_user.last_name}
          </td>
          <td>{index.cargo}</td>
          <td>{index.departamento}</td>
          <td>
            {index.fk_user.username} - {index.telefono}
          </td>
          <td>{index.turno}</td>
        </div>
      );
    });

    return y;
  };

  return (
    <main className={styles.containerPersonnelMainPage}>
      <Spacer />
      <div className={styles.personnelListContainer}>
        <div>
          <div className={styles.tableTitlesContainer}>
            <span>Nombre</span>
            <span>Cargo</span>
            <span>Departamento</span>
            <span>Contacto</span>
            <span>Turno</span>
          </div>
          {arrayPrinter()}
        </div>
      </div>
      {!allowContinue}

      <Table
        aria-label="Example table with dynamic content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={arrayList3}>
          {(item) => (
            <Table.Row key={item.key}>
              {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </main>
  );
};

export default PersonnelMainPage;

const columns = [
  {
    key: "fk_user.first_name",
    label: "Nombre",
  },
  {
    key: "fk_user.last_name",
    label: "Apellido",
  },
  {
    key: "cargo",
    label: "Cargo",
  },
  {
    key: "telefono",
    label: "Telefono",
  },
  {
    key: "fk_user.username",
    label: "Correo",
  },
  {
    key: "departamento",
    label: "Departamento",
  },
];
