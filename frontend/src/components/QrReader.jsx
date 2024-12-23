import { useEffect, useRef, useState } from "react";
import "./QrStyles.css";
import QrScanner from "qr-scanner";

const QrReader = () => {
    // QR States
    const scanner = useRef(null);
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(false); // Controls QR scanner state
    const [scannedResult, setScannedResult] = useState("");
     const [ mode,setMode] = useState(true);
    // Success
    const onScanSuccess = (result) => {
        console.log(result);
        setScannedResult(result?.data);
    };

    // Fail
    const onScanFail = (err) => {
        console.log(err);
    };

    // Start/stop QR scanner based on qrOn state
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
            <button onClick={handleToggleScanner} className="bg-indigo-950 p-2 rounded-md text-white  w-1/2 md:w-1/6">
                {qrOn ? "Close QR Scanner" : "Open QR Scanner"}
            </button>
            <button onClick={handleModeScanner} className="bg-indigo-950 p-2 rounded-md text-white w-1/2 md:w-1/6">
                {mode ? "Back Camera" : "Front Camera"}
            </button>

            </div>
           
            {/* Conditionally render QR scanner */}
            {qrOn && (
                <div className="p-5 bg-white shadow-lg rounded-md h-full w-full relative overflow-hidden">
                    <video className="w-full h-full object-cover" ref={videoEl}></video>
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
