import Card, { CardHeader, CardBody } from "../../components/Card";
import { Outlet } from "react-router-dom";

export default function QrScannerLayout() {
  return (
    <div className="absolute w-screen h-screen grid place-items-center">
      <Card>
        <CardHeader>
          <h1>Scan and Use a Device</h1>
        </CardHeader>
        <CardBody>
          <Outlet />
        </CardBody>
      </Card>
    </div>
  );
}
