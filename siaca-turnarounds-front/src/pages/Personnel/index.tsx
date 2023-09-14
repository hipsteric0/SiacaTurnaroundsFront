import styles from "./index.style.module.css";
import { useState } from "react";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import PersonnelMainPage from "@/components/Personnel/PersonnelMainPage";
import userApproval from "@/components/Personnel/userApproval/userApproval";

export default function Personnel() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);

  return (
    <main className={styles.mainContainerPersonnelPage}>
      <SiacaNavbar activePersonnelValue={true} />
      <PersonnelMainPage />
    </main>
  );
}
