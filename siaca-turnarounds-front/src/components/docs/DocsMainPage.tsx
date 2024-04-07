import styles from "./DocsMainPage.style.module.css";
import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import SimpleStorage from "../../../build/contracts/SimpleStorage.json";
import FlightData1 from "../../../build/contracts/FlightData1.json";
import router from "next/router";
import { Provider } from "web3/providers";
interface PageProps {}

const DocsMainPage: React.FC<PageProps> = ({}) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL; // from .env.local file
  const [arrayList3, setArrayList3] = useState([]);
  const [envData, setEnvData] = useState();
  const [contractState, setcontractState] = useState({
    web3: null,
    contract: null,
  });
  const [contractData, setcontractData] = useState(false);
  let envData2;
  const getEnv = async () => {
    const fetchData = async () => {
      try {
        const url = "/api/getEnv";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            envData2 = result;
            setEnvData(result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  useEffect(() => {
    getEnv();
    const provider = new Web3.providers.HttpProvider("https://rpc.sepolia.org");
    async function template() {
      await getEnv();
      const web3 = new Web3(provider);
      const acc = web3.eth.accounts.privateKeyToAccount(
        String(envData2?.PRIVATE_KEY)
      );
      web3.eth.accounts.wallet.add(acc);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FlightData1.networks[/*networkId*/ 11155111];
      const contract = new web3.eth.Contract(
        FlightData1.abi,
        deployedNetwork.address
      );
      setcontractState({ web3: web3, contract: contract });

      try {
        const data = await contract?.methods?.getter().call();
        setcontractData(data);
      } catch (error) {
        console.error("Error blickchain", error);
        return;
      }
    }
    console.log("contractDATA", Object.values(contractData));
    provider && template();
  }, []);

  async function writeData() {
    const { contract } = contractState;
    try {
      await contract?.methods?.setter(10, "20", 30)?.send({
        from:
          //"
          envData.WALLET_ID,
      });
    } catch (error) {
      console.error("Error blockchain", error);
      return;
    }
    router.reload();
  }

  return (
    <main className={styles.containerAirlinesMainPage}>
      <p>
        Data de contrato:{" "}
        {contractData.toString() === "false"
          ? "Buscando..."
          : contractData[0].toString() +
            contractData[1].toString() +
            contractData[2].toString()}
      </p>
      <button onClick={() => writeData()}>Cambiar</button>
    </main>
  );
};

export default DocsMainPage;
