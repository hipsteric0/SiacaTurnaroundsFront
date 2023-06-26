import styles from "./RegisterStep2.style.module.css";
import React from "react";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Dropdown } from "@nextui-org/react";
import { Input, Grid } from "@nextui-org/react";


interface PageProps {
  setStep: (value: number) => void;
}

const LoginMainPage: React.FC<PageProps> = ({ setStep }) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [selected, setSelected] = React.useState(new Set([" "]));
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  return (
    <div
      className={
        isMobile
          ? styles.mainContainerLoginMainPageMobile
          : styles.mainContainerLoginMainPage
      }
    >
      <AccountCircleIcon  sx={{ fontSize: 100 }}></AccountCircleIcon>
      <div
        className={
          isMobile ? styles.inputsContainerMobile : styles.inputsContainer
        }
      >
        <strong><p className={isMobile ? styles.tituloMobile : styles.titulo}>Información Personal</p></strong>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
        <Grid>
        <Input 
          bordered 
          labelLeft="Nombres" 
          color="success"
          width="375px"
        />
      </Grid>
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Grid>
        <Input 
          bordered 
          labelLeft="Apellidos" 
          color="success"
          width="375px"
        />
      </Grid>
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Grid>
        <Input 
          bordered 
          labelLeft="Cédula" 
          color="success"
          width="375px"
        />
      </Grid>
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Grid>
        <Input 
          bordered 
          labelLeft="Teléfono" 
          color="success"
          width="375px"
        />
      </Grid>
        </div>

        <strong><p className={isMobile ? styles.tituloMobile : styles.titulo}>Información Empresarial</p></strong>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
            Departamento
          </p>
        
          <Dropdown>
      <Dropdown.Button flat color="success" css={{ tt: "capitalize" }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="success"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Dropdown.Item key="Opción 1">Opción 1</Dropdown.Item>
        <Dropdown.Item key="Opción 2">Opción 2</Dropdown.Item>
        <Dropdown.Item key="Opción 3">Opción 3</Dropdown.Item>
        <Dropdown.Item key="Opción 4">Opción 4</Dropdown.Item>
        <Dropdown.Item key="Opción 5">Opción 5</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
            Cargo
          </p>
          <Dropdown>
      <Dropdown.Button flat color="success" css={{ tt: "capitalize" }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="success"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Dropdown.Item key="Opción 1">Opción 1</Dropdown.Item>
        <Dropdown.Item key="Opción 2">Opción 2</Dropdown.Item>
        <Dropdown.Item key="Opción 3">Opción 3</Dropdown.Item>
        <Dropdown.Item key="Opción 4">Opción 4</Dropdown.Item>
        <Dropdown.Item key="Opción 5">Opción 5</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
            Turno
          </p>
          <Dropdown>
      <Dropdown.Button flat color="success" css={{ tt: "capitalize" }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="success"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Dropdown.Item key="Opción 1">Opción 1</Dropdown.Item>
        <Dropdown.Item key="Opción 2">Opción 2</Dropdown.Item>
        <Dropdown.Item key="Opción 3">Opción 3</Dropdown.Item>
        <Dropdown.Item key="Opción 4">Opción 4</Dropdown.Item>
        <Dropdown.Item key="Opción 5">Opción 5</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
      </div>

      <button className={styles.ingresarButton}  onClick={() => setStep(5)}><strong>REGISTRAR</strong></button>
    </div>
  );
};

export default LoginMainPage;
