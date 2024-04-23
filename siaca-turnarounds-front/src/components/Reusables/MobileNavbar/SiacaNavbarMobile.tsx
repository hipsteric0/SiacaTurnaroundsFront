import React, { useEffect, useState } from "react";
import styles from "./SiacaNavbarMobile.style.module.css";
import SiacaLogo from "../../../images/logos/siacaLogo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FlightLandRoundedIcon from "@mui/icons-material/FlightLandRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import PersistentDrawerLeft from "./Drawer";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LoadingScreen from "../../Reusables/LoadingScreen";

interface PageProps {
  activeFlightsValue?: boolean;
  activeTurnaroundsValue?: boolean;
}

const SiacaNavbar: React.FC<PageProps> = ({
  activeFlightsValue,
  activeTurnaroundsValue,
}) => {
  useEffect(() => {
    if (activeFlightsValue) setActiveFligths(activeFlightsValue);
    if (activeTurnaroundsValue) setActiveTurnarounds(activeTurnaroundsValue);
  }, []); // If nothing on dependencies, this will run only first render
  const router = useRouter();
  const [activeFlights, setActiveFligths] = useState(false);
  const [activeTurnarounds, setActiveTurnarounds] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const drawerWidth = "65%";

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  function PersistentDrawerLeft() {
    const theme = useTheme();

    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "rgba(0, 167, 93, 0.9)",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <div className={styles.closeIconContainer}>
            <CloseRoundedIcon htmlColor="#fff" onClick={() => setOpen(false)} />
          </div>

          <div className={styles.profileContainer}>
            <AccountCircleRoundedIcon htmlColor="#fff" fontSize="inherit" />
            <p className={styles.profileText}>
              {localStorage.getItem("userFullName")}
            </p>
          </div>

          <div className={styles.linksContainer}>
            <div
              className={styles.linkAndIcon}
              onClick={() => router.push("/Flights")}
            >
              <p>Vuelos</p>
              <FlightLandRoundedIcon htmlColor="#fff" />
            </div>
            <div
              className={styles.linkAndIcon}
              onClick={() => router.push("/Turnarounds")}
            >
              <p>Turnarounds</p>
              <HistoryRoundedIcon htmlColor="#fff" />
            </div>
          </div>
          <div
            className={styles.singOutContainer}
            onClick={() => {
              Logout();
            }}
          >
            <p>Cerrar sesión</p>
            {loading && <LoadingScreen />}
          </div>
        </Drawer>
      </Box>
    );
  }

  const GetTitle = () => {
    if (activeFlights) {
      return (
        <div className={styles.navbarCenterContainer}>
          <h1 className={styles.itemText}>Vuelos</h1>
          <FlightLandRoundedIcon htmlColor="#fff" />
        </div>
      );
    } else if (activeTurnarounds) {
      return (
        <>
          <div className={styles.navbarCenterContainer}>
            <h1 className={styles.itemText}>Turnarounds</h1>
            <HistoryRoundedIcon htmlColor="#fff" />
          </div>
        </>
      );
    }
  };

  const Logout = async () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url =
          "https://testing.siaca.aero/django/usuarios/logout/?token=" +
          localStorage.getItem("userToken");
        const requestOptions = {
          method: "GET",
          headers: {
            // Include the regular headers
            "Content-Type": "application/json", // Add body content-type
            // Any additional headers here only related to request body...
          },
        };
        const response = await fetch(url, requestOptions).then((res) =>
          res.json().then((result) => {
            router.push("/");
          })
        );
      } catch (error) {
        console.error("Error geting user", error);
        return;
      }
    };
    await fetchData().catch(console.error);
  };

  if (typeof window !== "undefined") {
    document
      .getElementById("outer-div")
      ?.addEventListener("click", function (e) {
        const divToMap = document.getElementById("outer-div");
        const clickedE = e.target;
        if (divToMap === clickedE) {
          setOpen(false);
        }
      });
  }

  return (
    <>
      <div id="outer-div">{PersistentDrawerLeft()}</div>
      <div className={styles.siacaNavbarContainer}>
        <MenuRoundedIcon htmlColor="#fff" onClick={() => setOpen(true)} />
        {GetTitle()}
        {/* <ReplayRoundedIcon
          htmlColor="#fff"
          onClick={() =>  location.reload()}
        /> */}
        <div></div>
      </div>
    </>
  );
};
export default SiacaNavbar;
