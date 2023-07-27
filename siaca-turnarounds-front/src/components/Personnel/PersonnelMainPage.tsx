import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./PersonnelMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
import router from "next/router";
import { Table } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


interface PageProps {
  setStep: (value: number) => void;
}

const PersonnelMainPage: React.FC = () => {
  //if token exists show regular html else show not signed in screen

  const arrayPrinter = () => {
    let y: any = [];
    arrayAux.map((index: any) => {
      return (y[index.id] = (
        <Table.Row key={index?.id}>
          <Table.Cell>{index?.first_name} {index?.last_name} </Table.Cell>
          <Table.Cell>{index?.cargo}</Table.Cell>
          <Table.Cell>{index?.departamento}</Table.Cell>
          <Table.Cell>{index?.username} - {index?.telefono}</Table.Cell>
          <Table.Cell>{index?.turno}</Table.Cell>
          <Table.Cell><RemoveRedEyeIcon/>  <BorderColorOutlinedIcon/>  <DeleteOutlineOutlinedIcon/> </Table.Cell>
        </Table.Row>
      ));
    });
    return y;
  };
  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.registerbuttoncontainer}>
      </div>
      <div className={styles.airlinesListContainer}>
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
    </main>
  );
};


export default PersonnelMainPage;

let arrayAux = [
  {
    id: 0,
    first_name: "Nombre",
    last_name: "Apellido",
    username: "correo@gmail.com",
    cargo: "Cargo",
    departamento: "Departamento",
    telefono: "48374783784",
    turno : "diurno"
  },

  {
    id: 1,
    first_name: "Nombre",
    last_name: "Apellido",
    username: "correo@gmail.com",
    cargo: "Cargo",
    departamento: "Departamento",
    telefono: "48374783784",
    turno : "diurno"
  },
  {
    id: 2,
    first_name: "Nombre",
    last_name: "Apellido",
    username: "correo@gmail.com",
    cargo: "Cargo",
    departamento: "Departamento",
    telefono: "48374783784",
    turno : "diurno"
  }
];
