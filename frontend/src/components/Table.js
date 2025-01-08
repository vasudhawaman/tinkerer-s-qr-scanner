import React ,{useEffect, useState,useContext} from "react";
import DataTable from 'react-data-table-component';
import {UserContext} from "../context/userContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export default function Table() {
    const [rows,setRows] =useState([]);
    const userInfo =JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      // Fetch data from the backend API
  
      const fetchDevices = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get('http://localhost:8000/device/all',{
                      headers: {
                        Authorization: token, // Include the token in the header
                      },
                    });  // Make sure to update this URL based on your API route
          const data =  response.data;
             
          if (data.success) {
            setRows(data.data); // Set the devices data in state
          } else {
            console.error("Failed to fetch devices:", data.message);
          }
        } catch (error) {
          console.error("Error fetching devices:", error);
        }
      };
  
      fetchDevices();
    }, []);
   async function notInUse(deviceId){
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/device/${deviceId}/out-of-use`,{
                      headers: {
                        Authorization: token, // Include the token in the header
                      },
                    });  // Make sure to update this URL based on your API route
      const data = await response.json();

      if (data.success) {
        setRows(data.data); // Set the devices data in state
      } else {
        console.error("Failed to fetch devices:", data.message);
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
    }finally{
       window.location.reload();
    }
    }
      const columns = [
        {
            name: "Device ID",
            selector: (row) => row.deviceId,
            sortable: true,
        },
        {
            name: "Device Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
          name: "Device Image",
          selector: (row) => row.deviceImageURL,
          sortable: true,
          cell: (row) => (
            <img
              src={row.deviceImageURL}
              alt="Device"
              style={{
                width: '50px',      // Set the width you want for the image
                height: '50px',     // Set the height to match the width for a square image
                objectFit: 'cover', // Ensures the image fills the space without distorting
                borderRadius: '5px', // Optional: Adds a rounded corner for better aesthetics
              }}
            />
          ),
        }
        ,
        {
            name: "In Use",
            selector: (row) => row.inUse,
            sortable: true,
            cell: (row) => (
              <div>
                {row.inUse === 'false' ? <>No</> : null } 
                {row.inUse === 'true' && row.lastUsed === userInfo?._id && (
                  <button
                    onClick={() => notInUse(row.deviceId)} // Define your action for the button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
                  >
                    Done
                  </button>
                )}
              </div>
            ),
      
        },
        {
            name: "User Name",
            selector: (row) => row.userName,
            sortable: true,
        },
    ];
    

    
    
    
const conditionalRowStyles = [
  {
    when: row => row.inUse === 'true',
    style: {
      backgroundColor: '#79eb79',  // Red when inUse is 'yes' and even row
      color: '#000000',
    },
  },
  {
    when: row => row.inUse == 'false',
    style: {
      backgroundColor: '#d94141',  // Green when inUse is not 'yes' and even row
      color: '#ffffff',
    },
  },

];

    return (
        <div className="container mt-1 min-w-screen overflow-x-auto">

            <DataTable
                columns={columns}
                data={rows}
                pagination
                selectableRows
                fixedHeader
                title="All Devices in use"
                conditionalRowStyles={conditionalRowStyles}
                
            />
        </div>
    )
}
