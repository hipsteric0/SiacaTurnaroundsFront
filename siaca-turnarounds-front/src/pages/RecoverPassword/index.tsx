import { useEffect, useState } from "react";
import styles from "./index.style.module.css";
import dynamic from "next/dynamic";
import ReactDOMServer, { renderToString } from "react-dom/server";
import React from "react";
import { useRouter } from "next/router";
import RegisterStep1 from "@/components/login/register/RegisterStep1";
import RegisterStep2 from "@/components/login/register/RegisterStep2";
import RegisterStep3 from "@/components/login/register/RegisterStep3";
import RecoverPasswordStep1 from "@/components/login/recoverPassword/RecoverPasswordStep1";
import RecoverPasswordStep2 from "@/components/login/recoverPassword/RecoverPasswordStep2";
import RecoverPasswordStep3 from "@/components/login/recoverPassword/RecoverPasswordStep3";
import RecoverPasswordStep1part2 from "@/components/login/recoverPassword/RecoverPasswordStep1part2";

export default function Flights() {
  const { query } = useRouter();
  const token = query.token;
  const email = query.email;

  const [step, setStep] = useState(1);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  return (
    <main className={styles.main}>
      {
        step === 1 && (
          <>
            <RecoverPasswordStep1 setStep={setStep} />
          </>
        ) /*el step 1 es el paso 2 de recuperar contrasena*/
      }
      {
        step === 2 && (
          <>
            <RecoverPasswordStep1part2 setStep={setStep} />
          </>
        ) /*el step 2 es el paso 1.5 de recuperar contrasena*/
      }
    </main>
  );
}
