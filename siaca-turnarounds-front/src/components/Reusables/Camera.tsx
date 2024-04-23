import React, { useRef, useState } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import styles from "./Camera.style.module.css";

const Camera = ({ onPhoto }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [photoData, setPhotoData] = useState(null);
  const [downloadedImage, setDownloadedImage] = useState(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const startCamera = async () => {
    try {
      const constraints = {
        video: { facingMode: "environment" } // This will prioritize the rear camera
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsCameraStarted(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setIsCameraStarted(false);
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
    // Convert the canvas to a Blob
    canvas.toBlob((blob) => {
      if (blob) {
        // Create an Object URL for the Blob
        const url = URL.createObjectURL(blob);
  
        // Create a new Image object and set its src attribute to the Object URL
        const image = new Image();
        image.src = url;
        const file = new File([blob], "photo.jpg", { type: blob.type });
        // Call the onPhoto function with the Image object
        onPhoto(file);
  
        // Update the photoData state with the Object URL
        setPhotoData(url);
      }
    }, "image/jpeg");
  };

  const savePhoto = () => {
    const a = document.createElement("a");
    a.href = photoData;
    a.download = "photo.jpg";
    a.click();
    setDownloadedImage(photoData);
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <video ref={videoRef} style={{ width: "100%", maxWidth: "400px", marginBottom: "10px" }}></video>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        {!isCameraStarted && (
          <AddAPhotoIcon onClick={startCamera} />
        )}
        {isCameraStarted && (
          <div className={styles.botones}>
            <div className={styles.cerrarCamara}>
            <NoPhotographyIcon onClick={stopCamera} />
            </div>
            <div className={styles.tomarFoto}>
            <RadioButtonUncheckedIcon onClick={takePhoto} />
            </div>
          </div>
        )}
        {photoData && (
          <div>
            <p>Foto capturada:</p>
            <img src={photoData} alt="Captured" style={{ width: "100%", maxWidth: "400px", marginTop: "10px" }} />
            <button onClick={savePhoto}>Guardar foto</button>
          </div>
        )}
        {downloadedImage && (
          <p>Foto guardada:</p>
        )}
      </div>
    </div>
  );
};

export default Camera;