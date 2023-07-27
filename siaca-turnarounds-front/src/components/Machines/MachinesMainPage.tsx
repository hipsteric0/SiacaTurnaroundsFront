import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./MachinesMainPage.style.module.css";
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




interface PageProps {
  setStep: (value: number) => void;
}

const MachinesMainPage: React.FC = () => {
  //if token exists show regular html else show not signed in screen

  const isMobile = useMediaQuery("(max-width: 1270px)");


  return (
    <main className={styles.containerMachineMainPage}>
      <Spacer/>
      <div className={styles.machineListContainer}>
      <Collapse.Group>
      <Collapse title="Aguas Servidas">
        <Text>
          MAQUINARIAS
        </Text>
      </Collapse>
      <Collapse title="Tractor de arrastre">
        <Text>
        MAQUINARIAS
        </Text>
      </Collapse>
      <Collapse title="Escalera">
        <Text>
        MAQUINARIAS
        </Text>
      </Collapse>
      <Collapse title="Cinta Trasportadora">
        <Text>
        MAQUINARIAS
        </Text>
      </Collapse>
      <Collapse title="Loader">
        <Text>
        MAQUINARIAS
        </Text>
      </Collapse>
      <Collapse title="Tractor de empuje">
        <Text>
        MAQUINARIAS
        </Text>
      </Collapse>
      <Collapse title="Aire acondicionado">
        <Text>
        MAQUINARIAS
        </Text>
      </Collapse>
      <Collapse title="Planta numática">
        <Text>
        MAQUINARIAS
        </Text>
      </Collapse>
      <Collapse title="GPU Planta eléctica">
        <Text>
          MAQUINARIAS
        </Text>
      </Collapse>
    </Collapse.Group>
      </div>
    </main>
  );
};

export default MachinesMainPage;

