import { useEffect, useRef, useState } from "react";
import "./QrStyles.css";
import QrScanner from "qr-scanner";
import axios from 'axios';
import Swal from 'sweetalert2';

const QrReader = () => {

    const scanner = useRef(null);
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(false);
    const [scannedResult, setScannedResult] = useState("");
     const [ mode,setMode] = useState(true);

    const onScanSuccess = async (result) => {
        console.log(result);
        setScannedResult(result?.data);
        const deviceId = result?.data;
        try {
            // Make the GET request to check if the device is in use
            const response = await axios.get(`http://localhost:8000/device/${deviceId}/in-use`);
            
            if (response.status === 200 &&response.data.inUse) {
                Swal.fire({
                    title: "Device is in Use!",
                    text: `You scanned ${deviceId}`,
                    icon: "failure"
                  });
            } else if (response.status == 200) {
                const response = await axios.post(`http://localhost:8000/device/${deviceId}/change-status`);
            }
          } catch (error) {
            console.error("Error checking device in-use status:", error);
          }
    };


    const onScanFail = (err) => {
        console.log(err);
    };

    useEffect(() => {
        if (qrOn && videoEl?.current && !scanner.current) {
            // Instantiate the QR Scanner
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: mode ? "environment" : "user",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl?.current || undefined,
            });

            scanner.current.start().catch((err) => {
                console.log("Error starting scanner:", err);
                setQrOn(false); // Stop if there's an error
            });
        } else if (!qrOn && scanner.current) {
            // Stop and reset scanner
            scanner.current.stop();
            scanner.current = null;
        }

        // Clean up on unmount
        return () => {
            if (scanner.current) {
                scanner.current.stop();
                scanner.current = null;
            }
        };
    }, [qrOn,mode]); // Toggle scanner based on qrOn

    // Notify if camera access is blocked
    useEffect(() => {
        if (qrOn && !videoEl.current) {
            alert("Camera is blocked or not accessible. Please allow camera in your browser settings and reload.");
        }
    }, [qrOn]);

    // Toggle scanner visibility
    const handleToggleScanner = () => {
        setQrOn((prevQrOn) => !prevQrOn);
    };
    const handleModeScanner = () => {
        setMode((prevQrOn) => !prevQrOn);
    };

    return (
        <div className="h-full md:h-3/5 w-full">
            <div className=" w-full flex items-center justify-center gap-4 p-3">
            <button onClick={handleToggleScanner} className="bg-blue-800 hover:bg-blue-400 p-2 rounded-md text-white hover:text-blue-950  w-1/2 md:w-1/6">
                {qrOn ? "Close QR Scanner" : "Open QR Scanner"}
            </button>
            

            </div>
           
            {/* Conditionally render QR scanner */}
            {qrOn && (
                <div className="mt-1 md:mt-7 lg:mt-10 p-5 bg-white shadow-lg rounded-md h-full w-full relative overflow-hidden">
                    <button
    onClick={handleToggleScanner} // Add your close handler function here
    className="absolute top-3 right-5 text-gray-500 hover:text-gray-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>

                    <video className="mt-4 w-full h-4/5 object-cover" ref={videoEl}></video>
                    <button onClick={handleModeScanner} className="bg-blue-800 hover:bg-blue-400 p-2 rounded-md text-white hover:text-blue-950 w-1/2 md:w-1/6">
                {mode ? "Back Camera" : "Front Camera"}
            </button>
                </div>
            )}

            {/* Show scanned data if available */}
            {scannedResult && (
                <p>
                    Scanned Result: {scannedResult}
                </p>
            )}
        </div>
    );
};

export default QrReader;
