import styles from "./DropdownMenu.style.module.css";
import { Dialog, useMediaQuery } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
interface PageProps {
  executableOptionClickFunction: (optionValue: number) => void; //function to be executed when an option is clicked. Logic is handled in each component
  buttonText: string; //text to be displayed
  optionsArray: []; //options array to be displayed, follows format {key:"", value":}
  setStringValue: (value: string) => void; //fuction that sets the string value of the chosen option
}

const DropdownMenu: React.FC<PageProps> = ({
  executableOptionClickFunction,
  buttonText,
  optionsArray,
  setStringValue, //Options array should have this structure [{key=1,name="name1"},{key=2,name="name2"}]
}) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const getOptions = () => {
    let y: any = [];
    optionsArray.map((value: any) => {
      return (y[value.key] = (
        <>
          <p
            className={styles.optionsText}
            onClick={() => {
              setSelectedOption(value.name);
              setShowOptions(false);
              executableOptionClickFunction(value.key);
              setStringValue(value.name);
            }}
          >
            {value.name}
          </p>
        </>
      ));
    });
    return y;
  };
  return (
    <>
      <div className={styles.mainDropdownContainer}>
        <div
          className={styles.dropdownContainerButton}
          onClick={() => setShowOptions(!showOptions)}
        >
          <p className={styles.dropdownTextUnselected}>
            {selectedOption === "" ? buttonText : selectedOption}
          </p>
          <KeyboardArrowDownIcon />
        </div>

        {showOptions && (
          <div className={styles.optionsMenuContainer}>{getOptions()}</div>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
