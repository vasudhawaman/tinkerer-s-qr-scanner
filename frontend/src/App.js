import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import QrScannerLayout from "./pages/qr_scanner/layout";
import QrPage from "./pages/qr_scanner/qrpage";
import QrScanner from "./pages/qr_scanner/qrscanner";
import DevicesUsageInfo from "./pages/admin/devices";
import AdminLayout from "./pages/admin/layout";

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
          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="devices_usage" element={<DevicesUsageInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
