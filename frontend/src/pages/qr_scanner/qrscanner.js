import { useState } from "react";
import QrScannerFromCamera from "../../components/QrScanner";
import { MdCameraswitch } from "react-icons/md";
import { motion } from "framer-motion";

export default function QrScanner() {
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [facingMode, setFacingMode] = useState("user");

  const handleScan = (res) => {
    if (!res) return;
    setCode(res);
  };

  const toggleFacingMode = () =>
    setFacingMode((m) => (m === "user" ? "environment" : "user"));

  return (
    <div className="flex gap-2 h-full flex-col-reverse md:flex-row">
      <div className="flex-1">
        <h3 className="text-center text-xl font-semibold">Device Info</h3>
        <div className="h-full w-full grid place-items-center">
          {!code && <p>Invalid Device Id</p>}
          {code}
        </div>
      </div>
      <div className="border border-gray-400 md:min-h-full md:w-[1px]"></div>
      <div className="flex-1 flex flex-col items-center gap-5">
        <p className="text-red-600 text-center">{error}</p>
        <QrScannerFromCamera
          onError={(err) => setError(err.toString())}
          onScan={handleScan}
          facingMode={facingMode}
        />
        <motion.div
          onClick={toggleFacingMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MdCameraswitch className="mb-9 text-3xl" />
        </motion.div>
      </div>
    </div>
  );
}
