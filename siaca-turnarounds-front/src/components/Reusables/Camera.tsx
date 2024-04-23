import React, { useRef, useState, useEffect } from "react";
import CameraIcon from '@mui/icons-material/Camera';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./Camera.style.module.css";

const Camera = ({ onPhoto }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    if (isCameraStarted) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isCameraStarted]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const toggleCamera = () => {
    setIsCameraStarted(!isCameraStarted);
    setPhotoData(null); // Limpiar la vista previa al cambiar el estado de la cámara
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (videoRef.current) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      // Convertir el canvas a un Blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Llamar a la función onPhoto con el Blob
          const file = new File([blob], "photo.jpg", { type: blob.type });
          onPhoto(file);
          // Crear una URL de objeto para el Blob
          const url = URL.createObjectURL(blob);
          // Mostrar la vista previa de la foto
          setPhotoData(url);
        }
      }, "image/jpeg");
    }
  };

  const retakePhoto = () => {
    setPhotoData(null);
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {isCameraStarted && (
          <video ref={videoRef} style={{ width: "100%", maxWidth: "400px", marginBottom: "10px" }}></video>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        {photoData ? (
          <div>
            <img src={photoData} alt="Captured" style={{ width: "100%", maxWidth: "400px", marginTop: "10px" }} />
            <div className={styles.botones}>
              <CloseIcon onClick={toggleCamera} />
              <CameraIcon onClick={retakePhoto} />
            </div>
          </div>
        ) : (
          !isCameraStarted && (
            <CameraIcon onClick={toggleCamera} />
          )
        )}
        {isCameraStarted && !photoData && (
          <div className={styles.botones}>
            <CloseIcon onClick={toggleCamera} />
            <CameraIcon onClick={takePhoto} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;