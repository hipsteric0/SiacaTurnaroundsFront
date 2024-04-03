import styles from "./DocsMainPage.style.module.css";
import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import SimpleStorage from "../../../build/contracts/SimpleStorage.json";
import router from "next/router";
interface PageProps {}

const DocsMainPage: React.FC<PageProps> = ({}) => {
  //if token exists show regular html else show not signed in screen
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [arrayList3, setArrayList3] = useState([]);
  const [contractState, setcontractState] = useState({
    web3: null,
    contract: null,
  });
  const [contractData, setcontractData] = useState(false);

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("https://rpc.sepolia.org");
    async function template() {
      console.log("SimpleStorage", SimpleStorage);
      console.log("provider", provider);
      const web3 = new Web3(provider);

      const acc = web3.eth.accounts.privateKeyToAccount(
        String(
          "0x9ecf854af884998ab917946adc8a226995b02f10e161e516a383b8c1083d5a87"
        )
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
    }
    provider && template();
  }, []);

  useEffect(() => {
    const { contract } = contractState;
    async function readData() {
      const data = await contract?.methods?.getter().call();
      console.log(data);
      console.log("DATAA", data);
      setcontractData(data);
    }
    contract && readData();
  }, []);

  async function writeData() {
    const { contract } = contractState;
    console.log("contract", contract);
    console.log("contractState", contractState);
    console.log("contractDATA", contractData);
    try {
      await contract?.methods?.setter(30)?.send({
        from:
          //"
          "0x41e2004dC8f0D79042C220A571499ecE2fb7D019",
      });
    } catch (error) {
      console.error("Error blickchain", error);
      return;
    }
    //router.reload();
  }

  // async function writeData2() {
  //   const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  //   const nonce = await web3.eth.getTransactionCount(account.address);
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
      <p>Data de contrato: {contractData.toString()}</p>
      <button onClick={() => writeData()}>Cambiar</button>
    </main>
  );
};

export default DocsMainPage;
