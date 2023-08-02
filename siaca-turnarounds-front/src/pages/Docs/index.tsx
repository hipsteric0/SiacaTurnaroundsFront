import styles from "./index.style.module.css";
import { useState } from "react";
import AirlinesMainPage from "@/components/airlines/AirlinesMainPage";
import RegisterAirline from "@/components/airlines/RegisterAirline/RegisterAirline";
import DocsPage from "@/components/docs/DocsMainPage"
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
export default function Docs() {
  //if token exists show regular html else show not signed in screen
  const [step, setStep] = useState(0);

  return (
    <main className={styles.mainContainerDocsPage}>
      <SiacaNavbar activeDocsValue={true} />
      <DocsPage/>
    </main>
  );
}
