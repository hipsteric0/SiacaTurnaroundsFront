import styles from "./index.style.module.css";
import { useEffect, useState } from "react";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import PersonnelMainPage from "@/components/Personnel/PersonnelMainPage";
import userApproval from "@/components/Personnel/userApproval/userApproval";
import UnauthorizedPage from "@/components/UnauthorizedPage/UnauthorizedPage";

export default function Personnel() {
  //if token exists show regular html else show not signed in screen
  useEffect(() => {
    let role = localStorage.getItem("userRole");
    if (role != null) {
      setRoleID(parseInt(role));
    }
  }, []);

  const [roleID, setRoleID] = useState(-1);
  const [step, setStep] = useState(0);

  return (
    <main className={styles.mainContainerPersonnelPage}>
      <SiacaNavbar activePersonnelValue={true} />
      {roleID == 1 || roleID == 2 ? (
        <PersonnelMainPage />
      ) : (
        <UnauthorizedPage />
      )}
    </main>
  );
}
