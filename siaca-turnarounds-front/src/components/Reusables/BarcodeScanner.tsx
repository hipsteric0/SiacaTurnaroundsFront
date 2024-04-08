import React, { Component } from "react";
import { BrowserQRCodeReader, NotFoundException, ChecksumException, FormatException } from "@zxing/library";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

class BarcodeScanner extends Component {
  state = {
    selectedDeviceId: "",
    code: "",
    videoInputDevices: [],
    isCameraActive: false,
  };

  codeReader = new BrowserQRCodeReader();

  componentDidMount() {
    this.codeReader
      .getVideoInputDevices()
      .then((videoInputDevices) => {
        this.setupDevices(videoInputDevices);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setupDevices = (videoInputDevices) => {
    const sourceSelect = document.getElementById("sourceSelect");

    // selects first device
    this.setState({
      selectedDeviceId: videoInputDevices[0].deviceId,
    });

    // setup devices dropdown
    if (videoInputDevices.length >= 1) {
      this.setState({
        videoInputDevices: videoInputDevices,
      });
    }
  };

  resetClick = () => {
    this.codeReader.reset();
    this.setState({
      code: "",
      isCameraActive: false,
    });
    console.log("Reset.");
  };

  startCamera = () => {
    this.setState({
      isCameraActive: true,
    });
  };

  stopCamera = () => {
    this.codeReader.reset();
    this.setState({
      isCameraActive: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedDeviceId === this.state.selectedDeviceId &&
      this.state.isCameraActive
    ) {
      const decodeFromInputDevice = async () => {
        try {
          const result = await this.codeReader.decodeFromInputVideoDevice(
            this.state.selectedDeviceId,
            "video"
          );
          this.setState({
            code: result.text,
          });
          console.log("Found QR code!", result);
          console.log("Cedula", result?.text)
        } catch (err) {
          if (
            err instanceof NotFoundException ||
            err instanceof ChecksumException ||
            err instanceof FormatException
          ) {
            console.log("No QR code found.");
          } else {
            console.error(err);
          }
        }
      };

      decodeFromInputDevice();

      console.log(
        `Started decode from camera with id ${this.state.selectedDeviceId}`
      );
    }
  }

  render() {
    return (
      <main className="wrapper">
        <section className="container" id="demo-content">
          <div id="sourceSelectPanel">
          </div>

          <div>
            <video id="video" width="300" height="200" />
          </div>

          <label>Result:</label>
          <pre>
            <code id="result">{this.state.code}</code>
          </pre>

          <button id="resetButton" onClick={this.resetClick}>Reset
          </button>
          {!this.state.isCameraActive && (
            <button id="startCameraButton" onClick={this.startCamera}>
              Start Camera
            </button>
          )}
          {this.state.isCameraActive && (
            <button id="stopCameraButton" onClick={this.stopCamera}>
              Stop Camera
            </button>
          )}
        </section>
      </main>
    );
  }
}

export default BarcodeScanner;