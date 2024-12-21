import React from "react";
import QrReader from "../components/QrReader";
import DropBox from "./DropBox";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <>
      <div className="w-full h-screen flex flex-col bg-blue-200 items-center justify-center">
        <Navbar />
        <div className="w-full">
          <DropBox />
        </div>
        <div className="w-full">
          <QrReader />
        </div>
      </div>
      <Footer />
    </>
  );
}
