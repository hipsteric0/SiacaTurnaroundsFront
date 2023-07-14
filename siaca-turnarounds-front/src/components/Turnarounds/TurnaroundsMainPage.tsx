import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./TurnaroundsMainPage.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
import router from "next/router";
import { Table } from "@nextui-org/react";
import { TableBody } from "@mui/material";

interface PageProps {
  setStep: (value: number) => void;
}

const TemplatesPage: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  let tableHTML = (
    <Table.Row key={1}>
      <Table.Cell>Tony Reichert</Table.Cell>
      <Table.Cell>CEO</Table.Cell>
      <Table.Cell>Active</Table.Cell>
      <Table.Cell>CEO</Table.Cell>
      <Table.Cell>Active</Table.Cell>
    </Table.Row>
  );
  const arrayPrinter = () => {
    let y: any = [];
    arrayAux.map((index: any) => {
      return (y[index.id] = (
        <Table.Row key={index?.id}>
          <Table.Cell>{index?.imagen}</Table.Cell>
          <Table.Cell>{index?.nombre}</Table.Cell>
          <Table.Cell>{index?.correo}</Table.Cell>
          <Table.Cell>{index?.telefono}</Table.Cell>
          <Table.Cell>{index?.codigo}</Table.Cell>
        </Table.Row>
      ));
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
    </main>
  );
};

export default TemplatesPage;

let arrayAux = [
  {
    id: 0,
    nombre: "Aerolinea 1",
    correo: "corre1@gmail.com",
    telefono: "48374783784",
    codigo: "123",
    imagen: "link",
  },
  {
    id: 1,
    nombre: "Aerolinea 2",
    correo: "correo2@gmail.com",
    telefono: "48374783784",
    codigo: "123",
    imagen: "link",
  },
  {
    id: 2,
    nombre: "Aerolinea 3",
    correo: "correo3@gmail.com",
    telefono: "48374783784",
    codigo: "123",
    imagen: "link",
  },
];
