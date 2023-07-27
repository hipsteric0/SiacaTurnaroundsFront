import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./PersonnelMainPage.style.module.css";
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
import { IconButton } from "@mui/material/IconButton";


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
          <Table.Cell><IconButton onClick={() => console.log("View user")}></IconButton><RemoveRedEyeIcon/>  <BorderColorOutlinedIcon/>  <DeleteOutlineOutlinedIcon/> </Table.Cell>
        </Table.Row>
      ));
    });
    return y;
  };
  return (
    <main className={styles.containerPersonnelMainPage}>
      <div className="filtro">
        <Dropdown>
            <Dropdown.Button flat color="success" css={{ tt: "capitalize" }}>
              {selectedDepartmentValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedDepartment}
              onSelectionChange={setSelectedDepartment}
            >
              <Dropdown.Item key="Departamento 1">Departamento 1</Dropdown.Item>
              <Dropdown.Item key="Departamento 2">Departamento 2</Dropdown.Item>
              <Dropdown.Item key="Departamento 3">Departamento 3</Dropdown.Item>
              <Dropdown.Item key="Departamento 4">Departamento 4</Dropdown.Item>
              <Dropdown.Item key="Departamento 5">Departamento 5</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      <Spacer/>
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
