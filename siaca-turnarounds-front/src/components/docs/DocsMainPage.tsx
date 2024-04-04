import styles from "./DocsMainPage.style.module.css";
import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import SimpleStorage from "../../../build/contracts/SimpleStorage.json";
import router from "next/router";
import { Provider } from "web3/providers";
interface PageProps {}

const DocsMainPage: React.FC<PageProps> = ({}) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL; // from .env.local file
  console.log("BACKEND_BASE_URL", BACKEND_BASE_URL);
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
            console.log("ENV:", result);
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

      console.log("SimpleStorage", SimpleStorage);
      console.log("provider", provider);
      const web3 = new Web3(provider);
      console.log("envData", envData);
      const acc = web3.eth.accounts.privateKeyToAccount(
        String(envData2?.PRIVATE_KEY)
      );
      web3.eth.accounts.wallet.add(acc);
      console.log("acc", acc);
      console.log("web3", web3);
      const networkId = await web3.eth.net.getId();
      console.log("networkId", networkId.toString());
      const deployedNetwork = SimpleStorage.networks[/*networkId*/ 11155111];
      console.log("deployedNetwork", deployedNetwork);

      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork.address
      );
      console.log("setcontractState web3", web3);
      console.log("setcontractState contract", contract);
      setcontractState({ web3: web3, contract: contract });

      try {
        const data = await contract?.methods?.getter().call();
        console.log(data);
        console.log("DATAA", data);
        setcontractData(data);
      } catch (error) {
        console.error("Error blickchain", error);
        return;
      }
    }
    provider && template();
  }, []);

  async function writeData() {
    const { contract } = contractState;
    console.log("contract", contract);
    console.log("contractState", contractState);
    console.log("contractDATA", contractData);
    console.log("envData2 BEFORE SET", envData2);
    try {
      await contract?.methods?.setter(10)?.send({
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

  //   const gasPrice = await web3.eth.getGasPrice();
  //   const gasLimit = 300000; // Adjust gas limit as needed

  //   const encodedData = contractInstance.methods.setValue(newValue).encodeABI();

  //   const tx = {
  //     from: account.address,
  //     to: contractAddress,
  //     gas: gasLimit,
  //     gasPrice: gasPrice,
  //     data: encodedData,
  //     nonce: nonce,
  //   };

  //   const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  //   const receipt = await web3.eth.sendSignedTransaction(
  //     signedTx.rawTransaction
  //   );

  //   console.log("Transaction hash:", receipt.transactionHash);
  // }

  return (
    <main className={styles.containerAirlinesMainPage}>
      <p>
        Data de contrato:{" "}
        {contractData.toString() === "false"
          ? "Buscando..."
          : contractData.toString()}
      </p>
      <button onClick={() => writeData()}>Cambiar</button>
    </main>
  );
};

export default DocsMainPage;
