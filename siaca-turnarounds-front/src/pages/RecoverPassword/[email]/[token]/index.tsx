import { useEffect, useState } from "react";
import styles from "./index.style.module.css";
import dynamic from "next/dynamic";
import ReactDOMServer, { renderToString } from "react-dom/server";
import React from "react";
import { useRouter } from "next/router";
import RegisterStep1 from "@/components/login/register/RegisterStep1";
import RegisterStep2 from "@/components/login/register/RegisterStep2";
import RegisterStep3 from "@/components/login/register/RegisterStep3";
import RecoverPasswordStep2 from "@/components/login/recoverPassword/RecoverPasswordStep2";
import RecoverPasswordStep3 from "@/components/login/recoverPassword/RecoverPasswordStep3";

export default function Flights() {
  const { query } = useRouter();
  const token = query.token;
  const email = query.email;
  console.log("token", token);
  console.log("email", email);

  const [step, setStep] = useState(1);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  return (
    <main>
      {
        step === 1 && (
          <>
            <RecoverPasswordStep2 setStep={setStep} />
          </>
        ) /*el step 2 es el paso 2 de recuperar contrasena*/
      }
      {
        step === 2 && (
          <>
            <RecoverPasswordStep3 setStep={setStep} />
          </>
        ) /*el step 3 es el paso 3 de recuperar contrasena*/
      }
    </main>
  );
}
