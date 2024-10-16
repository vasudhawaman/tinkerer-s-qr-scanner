import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import QrScannerLayout from "./pages/qr_scanner/layout";
import QrPage from "./pages/qr_scanner/qrpage";
import QrScanner from "./pages/qr_scanner/qrscanner";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/qrscan/" element={<QrScannerLayout />}>
            <Route path="" element={<QrPage />} />
            <Route path="camera" element={<QrScanner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
