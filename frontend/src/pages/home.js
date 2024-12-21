import React from "react";
import QrReader from "../components/QrReader";
import DropBox from "./DropBox";
export default function Home() {
  return <div className="w-full h-screen flex flex-col bg-blue-200 items-center justify-center">
    <div className="w-full">
    <DropBox/>
    </div>
      <div className="w-full">
      <QrReader />
      </div>
  </div>;
}
