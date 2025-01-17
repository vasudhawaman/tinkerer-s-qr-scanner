import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const Devices = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deviceId = queryParams.get('device');
  const [device, setDevice] = useState(null);
  const [usage, setUsage] = useState(null);
  useEffect(() => {
    // Fetch data from the backend API

    const fetchDevices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/usage/${deviceId}/all`, {
          headers: {
            Authorization: token, // Include the token in the header
          },
        });  // Make sure to update this URL based on your API route
        const data = response.data;

        if (data.success) {
          setUsage(data.data); // Set the devices data in state
          console.log(data.data);
        } else {
          console.error("Failed to fetch devices:", data.message);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };


    const fetchInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/device/${deviceId}/info`, {
          headers: {
            Authorization: token, // Include the token in the header
          },
        });  // Make sure to update this URL based on your API route
        const data = response.data;
        if (data.success) {
          setDevice(data.device); // Set the devices data in state
          console.log("device", data);
        } else {
          console.error("Failed to fetch devices:", data.message);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchInfo();
    fetchDevices();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto p-4">
        {device ?
          <div className="text-center mb-6">
            <img src={device.deviceImageURL} alt={device.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4 mt-20" />
            <h2 className="text-2xl font-semibold">{device.name}</h2>
          </div> : null

        }
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Person</th>
              <th className="py-2 px-4 border-b text-left">Last Used</th>
            </tr>
          </thead>
          <tbody>
            {usage ? <>
              {usage.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{entry.name}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(entry.lastUsed).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    at{' '}
                    {new Date(entry.lastUsed).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}

            </> : null


            }
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Devices;
