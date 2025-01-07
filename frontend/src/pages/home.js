import React, { useEffect } from "react";
import QrReader from "../components/QrReader";
import DropBox from "./DropBox";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from 'react-router-dom';


export default function Home() {
  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if(token){
       localStorage.setItem("token",token);
    }
  
  

  return (
    <>
      <div className="w-full h-screen flex flex-col bg-blue-100 items-center justify-center">
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
