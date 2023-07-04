import styles from "./RegisterStep2.style.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Dropdown } from "@nextui-org/react";
import { Input, Grid } from "@nextui-org/react";
import BackArrow from "@/components/Reusables/BackArrow";
import { Telex } from "next/font/google";

interface PageProps {
  setStep: (value: number) => void;
  emailValue: string;
  passwordValue: string;
}

const LoginMainPage: React.FC<PageProps> = ({
  setStep,
  emailValue, //el email que introdujo el user en el paso anterior
  passwordValue, //el password  que introdujo el user en el paso anterior
}) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [allowContinue, setAllowContinue] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = React.useState(
    new Set([" "])
  );
  const selectedDepartmentValue = React.useMemo(
    () => Array.from(selectedDepartment).join(", ").replaceAll("_", " "),
    [selectedDepartment]
  );

  const [selectedPosition, setSelectedPosition] = React.useState(
    new Set([" "])
  );
  const selectedPositionValue = React.useMemo(
    () => Array.from(selectedPosition).join(", ").replaceAll("_", " "),
    [selectedPosition]
  );

  const [selectedWorkshift, setSelectedWorkshift] = React.useState(
    new Set([" "])
  );
  const selectedWorkshiftValue = React.useMemo(
    () => Array.from(selectedWorkshift).join(", ").replaceAll("_", " "),
    [selectedWorkshift]
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cedula, setCedula] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [userID, setUserID] = useState(-1);
  const [responseJson, setResponseJson] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/user";
        console.log("url", url);
        console.log("emailValue", emailValue);
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            searchValue: emailValue,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => setResponseJson(result))
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    fetchData().catch(console.error);
  }, []);

  const validateContinueButton = () => {
    console.log("responseJson", responseJson);
    if ((firstName && lastName && cedula && phoneNumber) === "") {
      if (allowContinue === true) setAllowContinue(false);
    } else if (
      (selectedDepartmentValue &&
        selectedPositionValue &&
        selectedWorkshiftValue) === " "
    ) {
      if (allowContinue === true) setAllowContinue(false);
    } else {
      if (allowContinue === false) setAllowContinue(true);
    }
    return <></>;
  };

  const registerStep2request = () => {
    const fetchData = async () => {
      try {
        const url = "/api/register";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Error in response registering user");
        } else {
          console.log(response);
        }

        // Update maquinarias state
      } catch (error) {
        console.error("Error registering user", error);
        return;
      }
    };
    fetchData().catch(console.error);
  };

  const continueButton = () => {
    //setEmailValue(email);
    //setPasswordValue(password);
    //registerStep2request();
    setStep(6);
  };

  return (
    <div
      className={
        isMobile
          ? styles.mainContainerLoginMainPageMobile
          : styles.mainContainerLoginMainPage
      }
    >
      {validateContinueButton()}

      <BackArrow executableFunction={() => setStep(4)} />
      <AccountCircleIcon sx={{ fontSize: 100 }}></AccountCircleIcon>
      <div
        className={
          isMobile ? styles.inputsContainerMobile : styles.inputsContainer
        }
      >
        <strong>
          <p className={isMobile ? styles.tituloMobile : styles.titulo}>
            Información Personal
          </p>
        </strong>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Input
            bordered
            labelLeft="Nombres"
            color="success"
            width={isMobile ? "85%" : "335px"}
            onChange={({ target: { value } }) => setFirstName(value)}
            aria-label="Input nombre"
          />
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Input
            bordered
            labelLeft="Apellidos"
            color="success"
            width={isMobile ? "85%" : "335px"}
            onChange={({ target: { value } }) => setLastName(value)}
            aria-label="Input apellido"
          />
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Input
            bordered
            labelLeft="Cédula"
            color="success"
            width={isMobile ? "85%" : "335px"}
            onChange={({ target: { value } }) => setCedula(value)}
            aria-label="Input cedula"
          />
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Input
            bordered
            labelLeft="Teléfono"
            color="success"
            width={isMobile ? "85%" : "335px"}
            onChange={({ target: { value } }) => setPhoneNumber(value)}
            type="phone"
            aria-label="Input telefono"
          />
        </div>

        <strong>
          <p className={isMobile ? styles.tituloMobile : styles.titulo}>
            Información Empresarial
          </p>
        </strong>
        <div className={isMobile ? styles.ComboboxMobile : styles.singleInput}>
          <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
            Departamento
          </p>

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
        <div className={isMobile ? styles.ComboboxMobile : styles.singleInput}>
          <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
            Cargo
          </p>
          <Dropdown>
            <Dropdown.Button flat color="success" css={{ tt: "capitalize" }}>
              {selectedPositionValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedPosition}
              onSelectionChange={setSelectedPosition}
            >
              <Dropdown.Item key="Cargo 1">Cargo 1</Dropdown.Item>
              <Dropdown.Item key="Cargo 2">Cargo 2</Dropdown.Item>
              <Dropdown.Item key="Cargo 3">Cargo 3</Dropdown.Item>
              <Dropdown.Item key="Cargo 4">Cargo 4</Dropdown.Item>
              <Dropdown.Item key="Cargo 5">Cargo 5</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={isMobile ? styles.ComboboxMobile : styles.singleInput}>
          <p className={isMobile ? styles.inputTextMobile : styles.inputText}>
            Turno
          </p>
          <Dropdown>
            <Dropdown.Button flat color="success" css={{ tt: "capitalize" }}>
              {selectedWorkshiftValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedWorkshift}
              onSelectionChange={setSelectedWorkshift}
            >
              <Dropdown.Item key="Turno 1">Turno 1</Dropdown.Item>
              <Dropdown.Item key="Turno 2">Turno 2</Dropdown.Item>
              <Dropdown.Item key="Turno 3">Turno 3</Dropdown.Item>
              <Dropdown.Item key="Turno 4">Turno 4</Dropdown.Item>
              <Dropdown.Item key="Turno 5">Turno 5</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <button
        aria-label="Continue"
        className={
          allowContinue ? styles.ingresarButton : styles.ingresarButtonDisabled
        }
        onClick={allowContinue ? () => continueButton() : undefined}
      >
        <strong>REGISTRAR</strong>
      </button>
    </div>
  );
};

export default LoginMainPage;
