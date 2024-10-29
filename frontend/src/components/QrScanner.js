import { useEffect, useRef } from "react";
import QrScannerLib from "qr-scanner";

export default function QrScanner({ facingMode = "user", onScan, onError }) {
  const videoRef = useRef(null);
  const scanner = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode,
        },
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        scanner.current = new QrScannerLib(videoRef.current, onScan);
        scanner.current.start();
      })
      .catch((err) => onError(err.toString()));

    return () => {
      if (!videoRef.current) return;
      console.log("DEstruction");
      videoRef.current.pause();
    };
  }, [videoRef, facingMode]);

  return <video ref={videoRef}></video>;
}
