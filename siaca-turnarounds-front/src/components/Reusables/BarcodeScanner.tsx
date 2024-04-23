import React, { useState, useEffect, useRef } from "react";
import styles from "./BarcodeScanner.style.module.css";
import jsQR from "jsqr";

const BarcodeScanner = ({ onQR }) => {
  const videoRef = useRef(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    const constraints = { video: { facingMode: "environment" } };

    const handleSuccess = (stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    };

    const handleError = (error) => {
      console.error("Error accessing camera:", error);
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);

    const scanQRCode = () => {
      if (!videoRef.current || !videoRef.current.videoWidth || !videoRef.current.videoHeight) {
        // Si las dimensiones del video aún no están disponibles, esperamos y volvemos a intentarlo
        requestAnimationFrame(scanQRCode);
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
      if (qrCode) {
        setCode(qrCode.data);
        onQR(qrCode.data);
      }
      requestAnimationFrame(scanQRCode); // Llamada recursiva para escanear continuamente
    };

    videoRef.current.addEventListener("loadedmetadata", scanQRCode);

    return () => {
      videoRef.current.removeEventListener("loadedmetadata", scanQRCode);
    };
  }, [onQR]);

  const resetCode = () => {
    setCode("");
    onQR(""); // También reiniciamos el valor en el componente padre
  };

  return (
    <div id="sourceSelectPanel">
      <p className={styles.scanQRtitleText}>Registrar por código QR</p>
      <center>
        <div>
          <video ref={videoRef} id="video" width="300" height="200" playsInline />
        </div>
      </center>

      <label className={styles.scannedIDText}>Cédula escaneada:</label>
      <pre>
        <code id="result" className={styles.scannedIDTextValue}>
          {code}
        </code>
      </pre>

      <center>
        <button onClick={resetCode}>Reset</button>
      </center>
    </div>
  );
};

export default BarcodeScanner;