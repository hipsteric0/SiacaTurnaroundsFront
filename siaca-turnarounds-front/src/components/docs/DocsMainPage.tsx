import styles from "./DocsMainPage.style.module.css";
import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import SimpleStorage from "../../../build/contracts/SimpleStorage.json";
import FlightData1 from "../../../build/contracts/FlightData1.json";
import FlightData2 from "../../../build/contracts/FlightData2.json";
import FlightData3 from "../../../build/contracts/FlightData3.json";
import FlightData4 from "../../../build/contracts/FlightData4.json";
import router from "next/router";
import { Provider } from "web3/providers";
interface PageProps {}
//esta pagina contiene los datos del alojamiento por blockchain
//Actualmente esta en la red etherum sepolia, que es una red de prueba de blockchain
//el funcionamiento de esta es identico al de una red verdadera de blockchain
//con la diferencia de que las monedas se pueden conseguir en un faucet gratuitamente
//Los datos de la wallet se encuentran en el archivo truffle.config, asi como en el env
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
  const [contractState2, setcontractState2] = useState({
    web3: null,
    contract: null,
  });
  const [contractState3, setcontractState3] = useState({
    web3: null,
    contract: null,
  });
  const [contractState4, setcontractState4] = useState({
    web3: null,
    contract: null,
  });
  const [contractData, setcontractData] = useState(false);
  const [contractData2, setcontractData2] = useState(false);
  const [contractData3, setcontractData3] = useState(false);
  const [contractData4, setcontractData4] = useState(false);
  const [card1opened, setcard1opened] = useState(false);
  const [card2opened, setcard2opened] = useState(false);
  const [card3opened, setcard3opened] = useState(false);
  const [card4opened, setcard4opened] = useState(false);

  let envData2;

  //consulta para traer datos encriptados que se encuentran en el .env
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

  //al entrar a la pagina, consulta la blockchain y consigue los datos almacenados en el contrato de slot 1
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
      //
      try {
        const data = await contract?.methods?.getter().call();
        setcontractData(data);
      } catch (error) {
        console.error("Error blickchain", error);
        return;
      }
    }
    provider && template();
  }, []);

  //al entrar a la pagina, consulta la blockchain y consigue los datos almacenados en el contrato de slot 2

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
      const deployedNetwork = FlightData2.networks[/*networkId*/ 11155111];
      const contract = new web3.eth.Contract(
        FlightData2.abi,
        deployedNetwork.address
      );
      setcontractState2({ web3: web3, contract: contract });
      //
      try {
        const data = await contract?.methods?.getter().call();
        setcontractData2(data);
      } catch (error) {
        console.error("Error blickchain", error);
        return;
      }
    }
    provider && template();
  }, []);

  //al entrar a la pagina, consulta la blockchain y consigue los datos almacenados en el contrato de slot 3

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
      const deployedNetwork = FlightData3.networks[/*networkId*/ 11155111];
      const contract = new web3.eth.Contract(
        FlightData3.abi,
        deployedNetwork.address
      );
      setcontractState3({ web3: web3, contract: contract });
      //
      try {
        const data = await contract?.methods?.getter().call();
        setcontractData3(data);
      } catch (error) {
        console.error("Error blickchain", error);
        return;
      }
    }
    provider && template();
  }, []);

  //al entrar a la pagina, consulta la blockchain y consigue los datos almacenados en el contrato de slot 4

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
      const deployedNetwork = FlightData4.networks[/*networkId*/ 11155111];
      const contract = new web3.eth.Contract(
        FlightData4.abi,
        deployedNetwork.address
      );
      setcontractState4({ web3: web3, contract: contract });
      //
      try {
        const data = await contract?.methods?.getter().call();
        setcontractData4(data);
      } catch (error) {
        console.error("Error blickchain", error);
        return;
      }
    }
    provider && template();
  }, []);

  //funcion para introducir datos en la blockchain a un slot
  async function writeData() {
    const { contract } = contractState;
    try {
      await contract?.methods
        ?.setter(
          "1000",
          "2000",
          "3000",
          "4000",
          "5000",
          "6000",
          '["string1", "string2"]',
          "[1, 2]"
        )
        ?.send({
          from:
            //"
            envData.WALLET_ID,
        });
    } catch (error) {
      console.error("Error blockchain", error);
      return;
    } //
    router.reload();
  }

  //imprime nombre y valor, sera usado ciclicamente para imprimir data de blockchain y devolver htmls
  const arrayPrinterTasks = (namesArray: any, valuesArray: any) => {
    let y: any = [];
    let cont = 0;
    namesArray.map((index: any) => {
      y[cont] = (
        <>
          <p>
            {namesArray[cont]}: {valuesArray[cont]}
          </p>
        </>
      );
      cont++;
    });

    return y;
  };

  //html principal
  return (
    <main className={styles.docsMainPage}>
      <p>
        <strong>AVISO: </strong>
        Los siguientes datos son consultados a una red Blockchain de Ethereum, y
        solo pueden ser alterados por usuarios nivel ADMINISTRADOR. La fecha de
        validez del contrato garantiza que los datos no han sido modificados de
        la blockchain desde esa fecha, incluso si la base de datos de SIACA
        fuera editada o eliminada, garantizando la seguridad de los datos
        almacenados de esta forma.
      </p>
      <div className={styles.blockchainCard}>
        <div className={styles.openCardContainer}>
          <p onClick={() => setcard1opened(!card1opened)}>
            {card1opened ? "Ver menos" : "Ver Mas"}
          </p>
        </div>
        {card1opened ? (
          <>
            <p className={styles.blockchainCardMainTitle}>SLOT 1</p>
            <p className={styles.blockchainCardTitle}>Datos del turnaround</p>
            <p>
              {contractData.toString() === "false"
                ? "Buscando..."
                : contractData[0].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Datos del vuelo</p>
            <p>
              {contractData.toString() === "false"
                ? "Buscando..."
                : contractData[1].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Datos de la Aerolínea</p>
            <p>
              {contractData.toString() === "false"
                ? "Buscando..."
                : contractData[2].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Código de demora</p>
            <p>
              {contractData.toString() === "false"
                ? "Buscando..."
                : contractData[3].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Datos del lugar de salida y llegada
            </p>
            <p>
              {contractData.toString() === "false"
                ? "Buscando..."
                : contractData[4].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Fecha de validez del contrato
            </p>
            <p>
              {contractData.toString() === "false"
                ? "Buscando..."
                : contractData[5].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Datos de Tareas realizadas
            </p>
            {(contractData[6] || contractData[7]) === undefined
              ? undefined
              : (contractData[6] || contractData[7]) === ""
              ? undefined
              : arrayPrinterTasks(
                  JSON.parse(contractData[6]), //a
                  JSON.parse(contractData[7])
                )}
          </>
        ) : (
          <>
            <p className={styles.blockchainCardMainTitle}>SLOT 1</p>
            <p>
              {contractData.toString() === "false"
                ? "Buscando..."
                : contractData[5].toString()}
            </p>
            <p>
              {contractData.toString() === "false"
                ? "Buscando..."
                : contractData[0].toString()}
            </p>
          </>
        )}
      </div>

      <div className={styles.blockchainCard}>
        <div className={styles.openCardContainer}>
          <p onClick={() => setcard2opened(!card2opened)}>
            {card2opened ? "Ver menos" : "Ver Mas"}
          </p>
        </div>
        {card2opened ? (
          <>
            <p className={styles.blockchainCardMainTitle}>SLOT 2</p>
            <p className={styles.blockchainCardTitle}>Datos del turnaround</p>
            <p>
              {contractData2.toString() === "false"
                ? "Buscando..."
                : contractData2[0].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Datos del vuelo</p>
            <p>
              {contractData2.toString() === "false"
                ? "Buscando..."
                : contractData2[1].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Datos de la Aerolínea</p>
            <p>
              {contractData2.toString() === "false"
                ? "Buscando..."
                : contractData2[2].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Código de demora</p>
            <p>
              {contractData2.toString() === "false"
                ? "Buscando..."
                : contractData2[3].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Datos del lugar de salida y llegada
            </p>
            <p>
              {contractData2.toString() === "false"
                ? "Buscando..."
                : contractData2[4].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Fecha de validez del contrato
            </p>
            <p>
              {contractData2.toString() === "false"
                ? "Buscando..."
                : contractData2[5].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Datos de Tareas realizadas
            </p>
            {(contractData2[6] || contractData2[7]) === undefined
              ? undefined
              : (contractData2[6] || contractData2[7]) === ""
              ? undefined
              : arrayPrinterTasks(
                  JSON.parse(contractData2[6]), //a
                  JSON.parse(contractData2[7])
                )}
          </>
        ) : (
          <>
            <p className={styles.blockchainCardMainTitle}>SLOT 2</p>
            <p>
              {contractData2.toString() === "false"
                ? "Buscando..."
                : contractData2[5].toString()}
            </p>
            <p>
              {contractData2.toString() === "false"
                ? "Buscando..."
                : contractData2[0].toString()}
            </p>
          </>
        )}
      </div>

      <div className={styles.blockchainCard}>
        <div className={styles.openCardContainer}>
          <p onClick={() => setcard3opened(!card3opened)}>
            {card3opened ? "Ver menos" : "Ver Mas"}
          </p>
        </div>
        {card3opened ? (
          <>
            <p className={styles.blockchainCardMainTitle}>SLOT 3</p>
            <p className={styles.blockchainCardTitle}>Datos del turnaround</p>
            <p>
              {contractData3.toString() === "false"
                ? "Buscando..."
                : contractData3[0].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Datos del vuelo</p>
            <p>
              {contractData3.toString() === "false"
                ? "Buscando..."
                : contractData3[1].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Datos de la Aerolínea</p>
            <p>
              {contractData3.toString() === "false"
                ? "Buscando..."
                : contractData3[2].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Código de demora</p>
            <p>
              {contractData3.toString() === "false"
                ? "Buscando..."
                : contractData3[3].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Datos del lugar de salida y llegada
            </p>
            <p>
              {contractData3.toString() === "false"
                ? "Buscando..."
                : contractData3[4].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Fecha de validez del contrato
            </p>
            <p>
              {contractData3.toString() === "false"
                ? "Buscando..."
                : contractData3[5].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Datos de Tareas realizadas
            </p>
            {(contractData3[6] || contractData3[7]) === undefined
              ? undefined
              : (contractData3[6] || contractData3[7]) === ""
              ? undefined
              : arrayPrinterTasks(
                  JSON.parse(contractData3[6]), //a
                  JSON.parse(contractData3[7])
                )}
          </>
        ) : (
          <>
            <p className={styles.blockchainCardMainTitle}>SLOT 3</p>
            <p>
              {contractData3.toString() === "false"
                ? "Buscando..."
                : contractData3[5].toString()}
            </p>
            <p>
              {contractData3.toString() === "false"
                ? "Buscando..."
                : contractData3[0].toString()}
            </p>
          </>
        )}
      </div>

      <div className={styles.blockchainCard}>
        <div className={styles.openCardContainer}>
          <p onClick={() => setcard4opened(!card4opened)}>
            {card4opened ? "Ver menos" : "Ver Mas"}
          </p>
        </div>
        {card4opened ? (
          <>
            <p className={styles.blockchainCardMainTitle}>SLOT 4</p>
            <p className={styles.blockchainCardTitle}>Datos del turnaround</p>
            <p>
              {contractData4.toString() === "false"
                ? "Buscando..."
                : contractData4[0].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Datos del vuelo</p>
            <p>
              {contractData4.toString() === "false"
                ? "Buscando..."
                : contractData4[1].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Datos de la Aerolínea</p>
            <p>
              {contractData4.toString() === "false"
                ? "Buscando..."
                : contractData4[2].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>Código de demora</p>
            <p>
              {contractData4.toString() === "false"
                ? "Buscando..."
                : contractData4[3].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Datos del lugar de salida y llegada
            </p>
            <p>
              {contractData4.toString() === "false"
                ? "Buscando..."
                : contractData4[4].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Fecha de validez del contrato
            </p>
            <p>
              {contractData4.toString() === "false"
                ? "Buscando..."
                : contractData4[5].toString()}
            </p>
            <p className={styles.blockchainCardTitle}>
              Datos de Tareas realizadas
            </p>
            {(contractData4[6] || contractData4[7]) === undefined
              ? undefined
              : (contractData4[6] || contractData4[7]) === ""
              ? undefined
              : arrayPrinterTasks(
                  JSON.parse(contractData4[6]), //a
                  JSON.parse(contractData4[7])
                )}
          </>
        ) : (
          <>
            <p className={styles.blockchainCardMainTitle}>SLOT 4</p>
            <p>
              {contractData4.toString() === "false"
                ? "Buscando..."
                : contractData4[5].toString()}
            </p>
            <p>
              {contractData4.toString() === "false"
                ? "Buscando..."
                : contractData4[0].toString()}
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default DocsMainPage;
