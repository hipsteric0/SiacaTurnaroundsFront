import styles from "./Combobox.style.module.css";
import { useMediaQuery } from "@mui/material";
import { Input } from "@nextui-org/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useState } from "react";
interface PageProps {
  onClickFilteringFunction: (inputValue: string) => void; //la funcion qu efiltra el array pasasndole el string con la opcion de filtrado
  setIsFiltered: (inputValue: boolean) => void; //un boolean que en define si esta filtrado o no el array
  filterValues: any[]; //un array de strings con las opciones que salen al desplegar el combobox
}

const Combobox: React.FC<PageProps> = ({
  onClickFilteringFunction,
  setIsFiltered,
  filterValues,
}) => {
  const isMobile = useMediaQuery("(max-width: 1270px)");
  const [isopen, setIsopen] = useState(false);
  const [hover, setHover] = useState(false);
  const [hoverOptionValue, setHoverOptionValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleClear = () => {
    setIsopen(false);
    setSelectedValue("");
    setIsFiltered(false);
  };
  const getFilterValues = () => {
    let i = 0;
    let y: any = [];
    filterValues.map((value: any) => {
      y[i] = (
        <p
          className={
            hover && value === hoverOptionValue
              ? styles.optionsTextHover
              : styles.optionsText
          }
          onClick={() => {
            onClickFilteringFunction(value);
            setIsFiltered(true);
            setSelectedValue(value);
            setIsopen(false);
          }}
          onMouseEnter={() => {
            setHoverOptionValue(value);
            setHover(true);
          }}
          onMouseLeave={() => {
            setHoverOptionValue("");
            setHover(false);
          }}
        >
          {value}
        </p>
      );
      i++;
    });
    return y;
  };
  return (
    <>
      <p
        className={styles.clearText}
        onClick={() => {
          handleClear();
        }}
      >
        limpiar
      </p>

      <div
        className={
          isMobile ? styles.comboboxContainerMobile : styles.comboboxContainer
        }
      >
        <div className={styles.filterTextAndIconContainer}>
          <p>{selectedValue === "" ? "Filtrar por..." : selectedValue}</p>
          <div className={styles.filterTextAndIconContainerArrow}>
            <KeyboardArrowDownRoundedIcon
              onClick={() => {
                setIsopen(!isopen);
              }}
            />
          </div>
        </div>

        {isopen && (
          <div className={styles.filteredValuesContainer}>
            {getFilterValues()}
          </div>
        )}
      </div>
    </>
  );
};

export default Combobox;
