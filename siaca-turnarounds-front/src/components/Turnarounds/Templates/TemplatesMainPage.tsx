import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./TemplatesMainPage.style.module.css";
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

const TurnaroundsMainPage: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen
  const arrayPrinter = () => {
    let y: any = [];
    arrayAux.map((index: any) => {
      return (y[index.id] = (
        <Table.Row key={index?.id}>
          <Table.Cell>{index?.titulo}</Table.Cell>
          <Table.Cell>buttons</Table.Cell>
        </Table.Row>
      ));
    });
    return y;
  };
  return (
    <main className={styles.containerAirlinesMainPage}>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => setStep(1)}
          buttonText="Registrar plantilla"
        />
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
            <Table.Column>titulo </Table.Column>
            <Table.Column> </Table.Column>
          </Table.Header>
          <Table.Body>{arrayPrinter()}</Table.Body>
        </Table>
      </div>
    </main>
  );
};

export default TurnaroundsMainPage;

let arrayAux = [
  {
    id: 0,
    titulo: "Plantilla 1",
  },
  {
    id: 1,
    titulo: "Plantilla 2",
  },
  {
    id: 2,
    titulo: "Plantilla 3",
  },
];
