import styles from "./RegisterStep2.style.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Dropdown } from "@nextui-org/react";
import { Input, Grid } from "@nextui-org/react";
import BackArrow from "@/components/Reusables/BackArrow";
import LoadingScreen from "@/components/Reusables/LoadingScreen";
import { Telex } from "next/font/google";

interface PageProps {
  setStep: (value: number) => void;
  emailValue: string;
  passwordValue: string;
}
//step 2 de registrar usuario
const LoginMainPage: React.FC<PageProps> = ({
  setStep,
  emailValue, //el email que introdujo el user en el paso anterior
  passwordValue, //el password  que introdujo el user en el paso anterior
}) => {
  //el usuario seleccionara su cargo, para ello nos traemos las listas de cargos y departamentos
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
  const [loading, setLoading] = useState(false);
  let userIDValue;
  //se busca en la BD el usuario llenado en el paso anterior para asociarlo a estos datos que seran llenados en este paso
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
  //request para registrar los datos del paso 2
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
  //selecciona el departamento especifico del arreglo de departamentos
  const getDepartmentFromArray = (departmentName: string) => {
    let result = arrayDepartmentsList.find(
      (o) => o.nombre === departmentName
    )?.id;
    return result;
  };
  //selecciona el cargo especifico del arreglo de cargos
  const getJobPositionFromArray = (jobPositionName: any) => {
    let result = arrayJobPositionsList.find(
      (o) => o.nombre === jobPositionName
    )?.id;
    return result;
  };
  //segundo registro de los datos llenados en esta consulta
  const registerStep2requestSecond = (
    departmentID: number,
    jobPositionID: number
  ) => {
    const fetchData = async () => {
      try {
        const url = "/api/registerStep2Part2";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            cedula: cedula,
            fk_cargo: jobPositionID,
            fk_departamento: departmentID,
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
  //request para conseguir lista d e departamentos
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
  //request para traer lista de cargos
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
  //deshabilita el boton de continuar si hacen falta datos por llenar
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
  //manejador de funciones del boton continuar
  const continueButton = async () => {
    //setEmailValue(email);
    //setPasswordValue(password);
    //registerStep2request();
    setLoading(true);
    let departmentID = 0;
    let jobPositionID = 0;
    departmentID = await getDepartmentFromArray(selectedDepartmentValue);
    jobPositionID = await getJobPositionFromArray(selectedPositionValue);
    await registerStep2requestFirst();
    await registerStep2requestSecond(departmentID, jobPositionID);
    await setStep(6);
  };
  //imprime dinamicamente todos los departamentos en el combobox
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
  //imprime dinamicamente los cargos consultados
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

  const [value, setValue] = useState("");
  const [valuePhone, setValuePhone] = useState("");

  //Valida que solo se escriban números
  const isNumber = (key: any) => {
    const tildeRegex = /[+-]/;
    return (
      key.length === 1 &&
      (key.match(/[0-9]/) || key === " " || key.match(tildeRegex))
    );
  };

  //Valida que se escriban solo letras en el input
  const isLetter = (key: any) => {
    const tildeRegex = /[áéíóúüÁÉÍÓÚÜ]/;
    return (
      key.length === 1 &&
      (key.match(/[a-z]/i) || key === " " || key.match(tildeRegex))
    );
  };

  //Validación para poder corregir inputs de letras
  const handleKeyDown = (e: any) => {
    if (e.key === "Backspace") {
      return;
    }
    if (!isLetter(e.key)) {
      e.preventDefault();
    }
  };

  //Validación para poder corregir inputs de números
  const handleKeyDown2 = (e: any) => {
    if (e.key === "Backspace") {
      return;
    }
    if (!isNumber(e.key)) {
      e.preventDefault();
    }
  };
  //html principal
  return (
    <div
      className={
        isMobile
          ? styles.mainContainerLoginMainPageMobile
          : styles.mainContainerLoginMainPage
      }
    >
      {validateContinueButton()}

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
            type="text"
            color="success"
            onKeyDown={handleKeyDown}
            width={isMobile ? "85%" : "335px"}
            onChange={(e) => {
              setFirstName(e.target.value);
              setValue(e.target.value);
            }}
            aria-label="Input nombre"
          />
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Input
            bordered
            labelLeft="Apellidos"
            type="text"
            color="success"
            onKeyDown={handleKeyDown}
            width={isMobile ? "85%" : "335px"}
            onChange={(e) => {
              setLastName(e.target.value);
              setValue(e.target.value);
            }}
            aria-label="Input apellido"
          />
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Input
            bordered
            labelLeft="Cédula"
            type="number"
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
            onKeyDown={handleKeyDown2}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setValuePhone(e.target.value);
            }}
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
      {loading && <LoadingScreen />}
    </div>
  );
};

export default LoginMainPage;
