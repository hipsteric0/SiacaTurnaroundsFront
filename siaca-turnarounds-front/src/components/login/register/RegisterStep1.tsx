import styles from "./RegisterStep1.style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import MailLockIcon from "@mui/icons-material/MailLock";
import { Input, Grid, Spacer } from "@nextui-org/react";
import BackArrow from "@/components/Reusables/BackArrow";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/Reusables/LoadingScreen";


interface PageProps {
  setStep: (value: number) => void;
  setEmailValue: (value: string) => void;
  setPasswordValue: (value: string) => void;
}

const LoginMainPage: React.FC<PageProps> = ({
  setStep,
  setEmailValue,
  setPasswordValue,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allowContinue, setAllowContinue] = useState(false);
  const [response, setResponse] = useState(false);
  const [continueIsClicked, setContinueIsClicked] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);

  let responseValue = false;

  const registerStep1request = () => {
    const fetchData = async () => {
      try {
        const url = "/api/register";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            username: email,
            password: password,
            is_active : 0
          }),
        };
        const response = await fetch(url, requestOptions).then((value) => {
          if (value?.status === 400) {
            responseValue = false;
          } else {
            responseValue = true;
          }
          return true;
        });
        if (!response) {
          responseValue = false;

          throw new Error("Error in response registering user");
        }
      } catch (error) {
        responseValue = false;
        //mostrar mensaje de no se pudo validasr usuario, ya existe o su conexion es limitada
      }
    };
    fetchData().catch(console.error);
  };

  const validateContinueButton = () => {
    if ((email && password && confirmPassword) === "") {
      if (allowContinue === true) setAllowContinue(false);
    } else if (!email.includes("@")) {
      if (allowContinue === true) setAllowContinue(false);
    } else if (password != confirmPassword) {
      if (allowContinue === true) setAllowContinue(false);
    } else {
      if (allowContinue === false) setAllowContinue(true);
    }
    return <></>;
  };
  const continueButton = () => {
    setLoading(true);
    setEmailValue(email);
    setPasswordValue(password);
    registerStep1request();
    setTimeout(() => {
      if (responseValue) {
        setStep(5);
      } else {
        if (responseValue) {
          setTimeout(() => {
            if (responseValue) {
              setStep(5);
            }
          }, 5000);
        }
      }
    }, 5000);
  };

  const isMobile = useMediaQuery("(max-width: 1270px)");

  const handleCheckEmail = (e :any) => {
    e.preventDefault();
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    fetch(`http://127.0.0.1:8000/usuarios/correos/`)
      .then((response) => response.json())
      .then((data) => {
        // Compureba si el correo se encuentra en el array de los correos registrados
        setEmailExists(data.some((item : any) => item.username === inputEmail));
        console.log("CORREO", email);
      })
      .catch((error) => console.error("Error fetching ", error));
  };
  
  const Back = () => {
    setLoading(true);
    setStep(0);
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
      <BackArrow
          executableFunction={() => {
            Back();
          }}
        />
      <MailLockIcon sx={{ fontSize: 150 }}></MailLockIcon>
      <strong>
        <p className={styles.welcomeBackText}>Registro de usuario</p>
      </strong>
      <div
        className={
          isMobile ? styles.inputsContainerMobile : styles.inputsContainer
        }
      >
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Spacer y={1} />
          <Input
            bordered
            labelPlaceholder="Correo Electrónico"
            color="success"
            width={isMobile ? "85%" : "335px"}
            onChange={(e) => {setEmail(e.target.value);
              handleCheckEmail(e);
          }}
            type="email"
          />
        {emailExists === true && (<p style={{ color: 'red' }}>Este correo ya se encuentra registrado en el sistema</p>)}
        </div>

        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Spacer y={0.1} />
          <Input
            type="password"
            bordered
            labelPlaceholder="Contraseña"
            color="success"
            width={isMobile ? "85%" : "335px"}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <div
          className={isMobile ? styles.singleInputMobile : styles.singleInput}
        >
          <Spacer y={0.1} />
          <Input
            type="password"
            bordered
            labelPlaceholder="Confirmar contraseña"
            color="success"
            width={isMobile ? "85%" : "335px"}
            onChange={({ target: { value } }) => setConfirmPassword(value)}
          />
          {password != confirmPassword && (<p style={{ color: 'red' }}>Las claves no coinciden</p>)}
        </div>
      </div>

      <button
        className={
          allowContinue ? styles.ingresarButton : styles.ingresarButtonDisabled
        }
        onClick={allowContinue ? () => continueButton() : undefined}
      >
        <strong>CONTINUAR</strong>
      </button>
      {loading && <LoadingScreen />}
    </div>
  );
};

export default LoginMainPage;
