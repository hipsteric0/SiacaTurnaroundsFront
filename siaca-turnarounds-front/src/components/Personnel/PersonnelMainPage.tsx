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
  const [selectedDepartment, setSelectedDepartment] = React.useState(
    new Set([" "])
  );
  const selectedDepartmentValue = React.useMemo(
    () => Array.from(selectedDepartment).join(", ").replaceAll("_", " "),
    [selectedDepartment]
  );

  let arrayList: any = [];
  let h: any;

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
            arrayList = Object.values(result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
    h = arrayPrinter();
  };

  const arrayPrinter = () => {
    let y: any = [];
    arrayList.map((index: any) => {
      console.log("index", index);
      console.log("index?.fk_user.first_name", index.fk_user.first_name);
      console.log("index.cargo", index.cargo);
      return (y[index.id] = (
        <Table.Row key={index.id}>
          <Table.Cell>
            {index.fk_user.first_name} {index.fk_user.last_name}{" "}
          </Table.Cell>
          <Table.Cell>{index.cargo}</Table.Cell>
          <Table.Cell>{index.departamento}</Table.Cell>
          <Table.Cell>
            {index.fk_user.username} - {index.telefono}
          </Table.Cell>
          <Table.Cell>{index.turno}</Table.Cell>
          <Table.Cell>
            <RemoveRedEyeIcon /> <BorderColorOutlinedIcon />{" "}
            <DeleteOutlineOutlinedIcon />{" "}
          </Table.Cell>
        </Table.Row>
      ));
    });
    console.log("arrayList", Symbol(arrayList[0]?.cargo).description);
    let sas = arrayList[0]?.cargo;
    let x = (
      <Table.Row key={1}>
        <Table.Cell>{Symbol(arrayList[0]?.cargo).description}</Table.Cell>
        <Table.Cell>asdas</Table.Cell>
        <Table.Cell>asd</Table.Cell>
        <Table.Cell>asdasd</Table.Cell>
        <Table.Cell>asdas</Table.Cell>
        <Table.Cell>
          <RemoveRedEyeIcon /> <BorderColorOutlinedIcon />{" "}
          <DeleteOutlineOutlinedIcon />{" "}
        </Table.Cell>
      </Table.Row>
    );

    return x;
  };

  return (
    <main className={styles.containerPersonnelMainPage}>
      <Spacer />
      <div className={styles.personnelListContainer}>
        <Table
          lined
          headerLined
          shadow={false}
          aria-label="Example static collection table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>Nombre</Table.Column>
            <Table.Column>Cargo</Table.Column>
            <Table.Column>Departamento</Table.Column>
            <Table.Column>Contacto</Table.Column>
            <Table.Column>Turno</Table.Column>
            <Table.Column>Opciones</Table.Column>
          </Table.Header>
          <Table.Body>{arrayPrinter()}</Table.Body>
        </Table>
      </div>
      {allowContinue}
    </main>
  );
};

export default PersonnelMainPage;

let PersonnelArray: any = [];

let arrayAux = [
  {
    id: 0,
    first_name: "Nombre",
    last_name: "Apellido",
    username: "correo@gmail.com",
    cargo: "Cargo",
    departamento: "Departamento",
    telefono: "48374783784",
    turno: "diurno",
  },

  {
    id: 1,
    first_name: "Nombre",
    last_name: "Apellido",
    username: "correo@gmail.com",
    cargo: "Cargo",
    departamento: "Departamento",
    telefono: "48374783784",
    turno: "diurno",
  },
  {
    id: 2,
    first_name: "Nombre",
    last_name: "Apellido",
    username: "correo@gmail.com",
    cargo: "Cargo",
    departamento: "Departamento",
    telefono: "48374783784",
    turno: "diurno",
  },
];
