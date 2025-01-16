import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Devices = () => {
  const device = {
    name: 'Laptop XYZ',
    photo: 'https://via.placeholder.com/150',
    usage: [
      { person: 'John Doe', lastUsed: '2025-01-10' },
      { person: 'Jane Smith', lastUsed: '2025-01-12' },
      { person: 'Michael Johnson', lastUsed: '2025-01-14' }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto p-4">
        <div className="text-center mb-6">
          <img src='https://tse4.mm.bing.net/th?id=OIP.6f5ZEeT1bM05vEOyFk2a7AHaHa&pid=Api&P=0&h=180' alt={device.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4 mt-20" />
          <h2 className="text-2xl font-semibold">{device.name}</h2>
        </div>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Person</th>
              <th className="py-2 px-4 border-b text-left">Last Used</th>
            </tr>
          </thead>
          <tbody>
            {device.usage.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{entry.person}</td>
                <td className="py-2 px-4 border-b">{entry.lastUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Devices;
