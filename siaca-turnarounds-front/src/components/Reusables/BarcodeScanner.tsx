import React, { useState, useEffect, useRef } from "react";
import {
  BrowserQRCodeReader,
  NotFoundException,
  ChecksumException,
  FormatException,
} from "@zxing/library";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import styles from "./BarcodeScanner.style.module.css";

const BarcodeScanner = ({ onQR }) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [code, setCode] = useState("");
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const codeReader = useRef(new BrowserQRCodeReader());
  const videoRef = useRef(null);

  useEffect(() => {
    codeReader.current
      .getVideoInputDevices()
      .then((videoInputDevices) => {
        setupDevices(videoInputDevices);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const setupDevices = (videoInputDevices) => {
    const sourceSelect = document.getElementById("sourceSelect");

    // selects first device
    setSelectedDeviceId(videoInputDevices[0].deviceId);

    // setup devices dropdown
    if (videoInputDevices.length >= 1) {
      setVideoInputDevices(videoInputDevices);
    }
  };

  const resetClick = () => {
    codeReader.current.reset();
    setCode("");
    onQR("");
    setIsCameraActive(false);
  };

  const startCamera = () => {
    setIsCameraActive(true);
  };

  const stopCamera = () => {
    codeReader.current.reset();
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (selectedDeviceId && isCameraActive) {
      const decodeFromInputDevice = async () => {
        try {
          const result = await codeReader.current.decodeFromInputVideoDevice(
            selectedDeviceId,
            videoRef.current
          );
          setCode(result.text);
          onQR(result.text);
        } catch (err) {
          if (
            err instanceof NotFoundException ||
            err instanceof ChecksumException ||
            err instanceof FormatException
          ) {
          } else {
            console.error(err);
          }
        }
      };

      decodeFromInputDevice();
    }
  }, [selectedDeviceId, isCameraActive]);

  return (
    <div id="sourceSelectPanel">
      <p className={styles.scanQRtitleText}>Registrar por código QR</p>
      <center>
        <div>
          <video ref={videoRef} id="video" width="300" height="200" />
        </div>
      </center>

      <label className={styles.scannedIDText}>Cédula escaneada:</label>
      <pre>
        <code id="result" className={styles.scannedIDTextValue}>
          {code}
        </code>
      </pre>

      <div>
        <center>
          <div className={styles.icono}>
            {code != "" && (
              <RestartAltIcon
                fontSize="large"
                id="resetButton"
                onClick={resetClick}
              />
            )}
          </div>
          <div className={styles.icono}>
            {!isCameraActive && (
              <QrCodeScannerIcon
                fontSize="large"
                id="startCameraButton"
                onClick={startCamera}
              />
            )}
          </div>

          {/*
        <div className={styles.icono}>
        {isCameraActive && (
          <NoPhotographyIcon fontSize ="large" id="stopCameraButton" onClick={stopCamera} />
        )}
        </div>
        */}
        </center>
      </div>
    </div>
  );
};

export default BarcodeScanner;
