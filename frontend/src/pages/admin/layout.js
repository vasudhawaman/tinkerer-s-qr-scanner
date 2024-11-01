import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="container w-4/5 mx-auto">
      <Outlet />
    </div>
  );
}
