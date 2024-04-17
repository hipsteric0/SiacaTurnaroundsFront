import styles from "./index.style.module.css";
import { useEffect, useState } from "react";
import AirlinesMainPage from "@/components/airlines/AirlinesMainPage";
import RegisterAirline from "@/components/airlines/RegisterAirline/RegisterAirline";

import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import DocsMainPage from "@/components/docs/DocsMainPage";
import UnauthorizedPage from "@/components/UnauthorizedPage/UnauthorizedPage";
export default function Docs() {
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
    <main className={styles.mainContainerDocsPage}>
      <SiacaNavbar activeDocsValue={true} />
      {roleID == 1 ? <DocsMainPage /> : <UnauthorizedPage />}
    </main>
  );
}
