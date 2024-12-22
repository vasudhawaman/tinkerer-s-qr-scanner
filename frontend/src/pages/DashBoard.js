import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Table from "../components/Table";
function DashBoard() {
  return (
    <>
     <div className="w-full h-screen flex flex-col bg-white-200 items-center justify-center">
        <Navbar />
        
          <Table />

      </div>
      <Footer />
    </>
  );
}

export default DashBoard;
