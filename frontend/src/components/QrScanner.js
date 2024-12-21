import { useEffect, useRef, useState } from "react";
import QrScannerLib from "qr-scanner";

export default function QrScanner({ facingMode = "user", onScan, onError }) {
  const videoRef = useRef(null);
  const scanner = useRef(null);
  const [startedPlaying, setStartedPlaying] = useState(false);

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
        setStartedPlaying(true);
        videoRef.current.play().then(() => setStartedPlaying(false));

        scanner.current = new QrScannerLib(videoRef.current, onScan);
        scanner.current.start();
      })
      .catch((err) => onError(err.toString()));

    return () => {
      if (!videoRef.current) return;
      if (startedPlaying) return;
      console.log("DEstruction");
      videoRef.current.pause();
    };
  }, [videoRef, facingMode]);

  return <video ref={videoRef}></video>;
}
