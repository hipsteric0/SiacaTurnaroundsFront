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
  useEffect(() => {
    getJobPositionsList();
    getDepartmentsList();
  }, []);

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
  const [arrayJobPositionsList, setArrayJobPositionsList] = useState([]);
  const [arrayDepartmentsList, setArrayDepartmentsList] = useState([]);
  const [userID, setUserID] = useState("");
  let userIDValue;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/user";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            searchValue: emailValue,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setUserID(result[0].id);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    fetchData().catch(console.error);
  }, []);

  const registerStep2requestFirst = () => {
    const fetchData = async () => {
      try {
        const url = "/api/registerStep2Part1";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            searchValue: parseInt(userID),
            first_name: firstName,
            last_name: lastName,
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setUserID(result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    fetchData().catch(console.error);
  };

  const registerStep2requestSecond = () => {
    const fetchData = async () => {
      try {
        const url = "/api/registerStep2Part2";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            cedula: cedula,
            cargo: selectedPositionValue,
            departamento: selectedDepartmentValue,
            telefono: phoneNumber,
            turno: selectedWorkshiftValue,
            fk_user: userID.toString(),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            setUserID(result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    fetchData().catch(console.error);
  };

  const getDepartmentsList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/getPersonnelDepartmentsList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };

        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("getJobPositionsList", Object.values(result));

            setArrayDepartmentsList(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const getJobPositionsList = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/getPersonnelJobPositionsList";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };

        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log("getJobPositionsList", Object.values(result));

            setArrayJobPositionsList(Object.values(result));
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  const validateContinueButton = () => {
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

  const continueButton = () => {
    //setEmailValue(email);
    //setPasswordValue(password);
    //registerStep2request();
    registerStep2requestFirst();
    registerStep2requestSecond();
    setStep(6);
  };

  const arrayPrinterDepartments = () => {
    let y: any = [];

    arrayDepartmentsList.map((index: any) => {
      y[index?.id] = (
        <Dropdown.Item key={index?.nombre} className={styles.dropdownItem}>
          {index?.nombre}
        </Dropdown.Item>
      );
    });

    return y;
  };

  const arrayPrinterJobPositions = () => {
    let y: any = [];

    arrayJobPositionsList.map((index: any) => {
      y[index?.id] = (
        <Dropdown.Item key={index?.nombre} className={styles.dropdownItem}>
          {index?.nombre}
        </Dropdown.Item>
      );
    });

    return y;
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
              {arrayPrinterDepartments()}
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
              {arrayPrinterJobPositions()}
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
              <Dropdown.Item key="Diurno" className={styles.dropdownItem}>
                Diurno
              </Dropdown.Item>
              <Dropdown.Item key="Nocturno" className={styles.dropdownItem}>
                Nocturno
              </Dropdown.Item>
              <Dropdown.Item key="Mixto" className={styles.dropdownItem}>
                Mixto
              </Dropdown.Item>
              <Dropdown.Item key="Matutino" className={styles.dropdownItem}>
                Matutino
              </Dropdown.Item>
              <Dropdown.Item key="Vespertino" className={styles.dropdownItem}>
                Vespertino
              </Dropdown.Item>
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
