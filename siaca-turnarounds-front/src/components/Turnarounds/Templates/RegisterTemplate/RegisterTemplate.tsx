import GreenButton from "@/components/Reusables/GreenButton";
import styles from "./RegisterTemplate.style.module.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { log } from "console";
import { useEffect, useState } from "react";
import router from "next/router";
import { Input, Table } from "@nextui-org/react";
import { TableBody } from "@mui/material";
import StandardInput from "@/components/Reusables/StandardInput";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SiacaNavbar from "@/components/Reusables/Navbar/SiacaNavbar";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BackArrow from "@/components/Reusables/BackArrow";
interface PageProps {
  setStep: (value: number) => void;
}

const RegisterTemplate: React.FC<PageProps> = ({ setStep }) => {
  //if token exists show regular html else show not signed in screen

  const [savedTemplateTitle, setSavedTemplateTitle] = useState(false);
  const [templateTitle, setTemplateTitle] = useState("");
  const [handleMachineryQuantities, sethandleMachineryQuantities] = useState(0);
  const [handleTasksQuantities, sethandleTasksQuantities] = useState(0);
  const [handleSubTasksQuantities, sethandleSubTasksQuantities] = useState(0);
  const [handleMachineryAvailable, sethhandleMachineryAvailable] = useState(0);
  const [inputTitleAux, setinputTitleAux] = useState("");
  const [inputAux, setinputAux] = useState("");

  const createTemplate = () => {
    const fetchData = async () => {
      try {
        const url = "/api/createTemplate";
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            titulo: templateTitle,
            userToken: localStorage.getItem("userToken"),
          }),
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            console.log(result);
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    fetchData().catch(console.error);
  };

  const handleSavingTitle = async () => {
    await createTemplate();
    await setSavedTemplateTitle(true);
  };

  const handleAddOtherItem = async () => {
    machinesArray.push({
      id: machinesArray.length,
      name: "Otro",
      quantity: 0,
      hasInput: true,
    });
    sethhandleMachineryAvailable(machinesArray.length);
    //console.log("machinesArray", machinesArray);
  };

  const handleAddMachineryItem = async (index: number) => {
    machinesArray[index].quantity++;
    await sethandleMachineryQuantities(machinesArray[index].quantity + 1);
    await sethandleMachineryQuantities(-10);
  };

  const handleRemoveMachineryItem = async (index: number) => {
    if (machinesArray[index].quantity > 0) {
      machinesArray[index].quantity--;
      await sethandleMachineryQuantities(machinesArray[index].quantity - 1);
      await sethandleMachineryQuantities(-10);
    }
  };

  const getMachineRegularItems = () => {
    let y: any = [];
    machinesArray.map((value: any) => {
      let currentArrayPosition = value.id;
      if (value.hasInput === false) {
        return (y[value.id] = (
          <div className={styles.machineryItemContainer}>
            <h4 className={styles.machineryItemText}>{value.name}</h4>
            <div className={styles.counterContainer}>
              <div className={styles.addMachineryButtonIcon}>
                <DoNotDisturbOnRoundedIcon
                  onClick={() => {
                    {
                      savedTemplateTitle
                        ? handleRemoveMachineryItem(value.id)
                        : undefined;
                    }
                  }}
                />
              </div>
              <div className={styles.itemCount}>{value.quantity}</div>
              <div className={styles.addMachineryButtonIcon}>
                <AddCircleRoundedIcon
                  onClick={() => {
                    savedTemplateTitle
                      ? handleAddMachineryItem(value.id)
                      : undefined;
                  }}
                />
              </div>
            </div>
          </div>
        ));
      } else {
        return (y[value.id] = (
          <div className={styles.machineryOtherItemContainer}>
            <div className={styles.singleInput}>
              <Input
                bordered
                labelPlaceholder={"otro"}
                color={savedTemplateTitle ? "success" : "error"}
                width={"125px"}
                height={"10px"}
                onChange={({ target: { value } }) => {
                  machinesArray[currentArrayPosition].name = value;
                }}
                disabled={!savedTemplateTitle}
              />
            </div>

            <div className={styles.counterContainer}>
              <div className={styles.addMachineryButtonIcon}>
                <DoNotDisturbOnRoundedIcon
                  onClick={() => {
                    {
                      savedTemplateTitle
                        ? handleRemoveMachineryItem(value.id)
                        : undefined;
                    }
                  }}
                />
              </div>

              <div className={styles.itemCount}>{value.quantity}</div>
              <div className={styles.addMachineryButtonIcon}>
                <AddCircleRoundedIcon
                  onClick={() => {
                    savedTemplateTitle
                      ? handleAddMachineryItem(value.id)
                      : undefined;
                  }}
                />
              </div>
            </div>
          </div>
        ));
      }
    });

    return y;
  };
  const addTask = () => {
    tasksArray.push({
      id: tasksArray.length,
      title: "",
      subtasks: [
        {
          key: 0,
          title: "",
          type: "",
        },
      ],
    });
    sethandleTasksQuantities(tasksArray.length);
  };

  const addSubTask = async (index: number) => {
    await sethandleSubTasksQuantities(0);
    tasksArray[index].subtasks.push({
      key: tasksArray[index].subtasks.length,
      title: "",
      type: "",
    });
    sethandleSubTasksQuantities(tasksArray[index].subtasks.length);
  };

  const getTareasArray = () => {
    let y: any = [];
    //console.log("tasksArray", tasksArray);
    tasksArray.map((value: any) => {
      let currentArrayPosition = value.id;

      return (y[value.id] = (
        <>
          <div className={styles.inputsList}>
            <div className={styles.inputColumn}>
              {
                <div
                  className={
                    !savedTemplateTitle
                      ? styles.dissappearingMessage
                      : styles.hiddenDissappearingMessage
                  }
                >
                  Guarda el titulo de la plantilla para poder rellenar estos
                  campos
                </div>
              }
              <div className={styles.messageAndInput}>
                <div className={styles.singleInput}>
                  <Input
                    bordered
                    labelPlaceholder={"Tarea Principal"}
                    color={savedTemplateTitle ? "success" : "error"}
                    onChange={({ target: { value } }) => {
                      tasksArray[currentArrayPosition].title = value;
                    }}
                    disabled={!savedTemplateTitle}
                    width="240px"
                  />
                </div>
              </div>
              {tasksArray[value.id].subtasks.map((index: any) => {
                return (
                  <>
                    <div className={styles.messageAndInput}>
                      <div className={styles.inputRow}>
                        <div className={styles.singleInput}>
                          <Input
                            bordered
                            labelPlaceholder={"Subtarea"}
                            color={savedTemplateTitle ? "success" : "error"}
                            onChange={({ target: { value } }) => {
                              tasksArray[currentArrayPosition].subtasks[
                                index.key
                              ].title = value;
                            }}
                            disabled={!savedTemplateTitle}
                          />
                        </div>
                        <div className={styles.singleInput}>
                          <Input
                            bordered
                            labelPlaceholder={"Tipo de Subtarea"}
                            color={savedTemplateTitle ? "success" : "error"}
                            onChange={({ target: { value } }) => {
                              tasksArray[currentArrayPosition].subtasks[
                                index.key
                              ].type = value;
                            }}
                            disabled={!savedTemplateTitle}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className={styles.addSubtaskButtonIconContainer}>
            <div className={styles.addSubtaskButtonIcon}>
              <AddCircleRoundedIcon
                onClick={() => {
                  savedTemplateTitle ? addSubTask(value.id) : undefined;
                }}
                htmlColor="#bbbbbb"
                fontSize="inherit"
              />
            </div>
          </div>
        </>
      ));
    });

    return y;
  };
  return (
    <main className={styles.RegisterAirlineContainer}>
      <div className={styles.backArrowIcon}>
        <BackArrow
          executableFunction={() => {
            setStep(0);
          }}
        />
      </div>
      <BackArrow
        executableFunction={() => {
          setStep(0);
        }}
      />
      <div className={styles.titleInputContainer}>
        <StandardInput
          setValue={setTemplateTitle}
          inputText="Título"
          inputDisabled={savedTemplateTitle}
        />
        <GreenButton
          executableFunction={() => {
            !savedTemplateTitle ? handleSavingTitle() : undefined;
          }}
          buttonText={!savedTemplateTitle ? "Guardar" : "Guardado!"}
          disabled={!savedTemplateTitle ? templateTitle === "" : true}
        />
        <div className={!savedTemplateTitle ? styles.hidden : undefined}>
          <CheckCircleOutlineIcon htmlColor="#00A75D" />
        </div>
      </div>

      <div className={styles.airlinesListContainer}>
        <span className={styles.titleText}>Tareas</span>

        {getTareasArray()}

        <div className={styles.addTaskContainer}>
          <div className={styles.addTaskButton}>
            <GreenButton
              executableFunction={() => {
                addTask();
              }}
              buttonText="Agregar Tarea"
              disabled={!savedTemplateTitle}
            />
          </div>
        </div>

        <span className={styles.titleText}>Maquinaria</span>
        <div className={styles.machineryInputsList}>
          {getMachineRegularItems()}
        </div>
        <div className={styles.addMachineryButton}>
          <div className={styles.addMachineryButtonIcon}>
            <AddCircleRoundedIcon
              onClick={() =>
                savedTemplateTitle ? handleAddOtherItem() : undefined
              }
              htmlColor="#bbbbbb"
              fontSize="inherit"
            />
          </div>
        </div>
      </div>
      <div className={styles.registerbuttoncontainer}>
        <GreenButton
          executableFunction={() => setStep(0)}
          buttonText="Registrar"
          disabled={savedTemplateTitle ? false : true}
        />
      </div>
      <div className={styles.hidden}>
        {handleMachineryQuantities}
        {handleSubTasksQuantities}
      </div>
    </main>
  );
};

export default RegisterTemplate;
let subtasksType = {
  id: 0,
  title: "",
  type: "",
};

let tasksArray = [
  {
    id: 0,
    title: "",
    subtasks: [
      {
        key: 0,
        title: "",
        type: "",
      },
    ],
  },
];

let machinesArray = [
  {
    id: 0,
    name: "Aguas servidas",
    quantity: 0,
    hasInput: false,
  },
  {
    id: 1,
    name: "Cinta transportadora",
    quantity: 0,
    hasInput: false,
  },
  {
    id: 2,
    name: "Aire acondicionado",
    quantity: 0,
    hasInput: false,
  },
  {
    id: 3,
    name: "Tractor de arrastre",
    quantity: 0,
    hasInput: false,
  },
  {
    id: 4,
    name: "Loader",
    quantity: 0,
    hasInput: false,
  },
  {
    id: 5,
    name: "Planta neumática",
    quantity: 0,
    hasInput: false,
  },
  {
    id: 6,
    name: "Escalera",
    quantity: 0,
    hasInput: false,
  },
  {
    id: 7,
    name: "Tractor de empuje",
    quantity: 0,
    hasInput: false,
  },
  {
    id: 8,
    name: "Otro",
    quantity: 0,
    hasInput: true,
  },
];
