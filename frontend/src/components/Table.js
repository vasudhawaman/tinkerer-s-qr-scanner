import React ,{useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
export default function Table() {
    const [rows,setRows] =useState([]);
    useEffect(() => {
      // Fetch data from the backend API
      const fetchDevices = async () => {
        try {
          const response = await fetch('http://localhost:8000/device/all');  // Make sure to update this URL based on your API route
          const data = await response.json();
  
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
            name: "Device Image URL",
            selector: (row) => row.deviceImageURL,
            sortable: true,
        },
        {
            name: "In Use",
            selector: (row) => row.inUse,
            sortable: true,
        },
        {
            name: "Last Used",
            selector: (row) => row.lastUsed,
            sortable: true,
        },
    ];
    

    
    const [search, setSearch] = useState(rows);
    
const conditionalRowStyles = [
  {
    when: row => row.inUse === 'true',
    style: {
      backgroundColor: 'green',  // Red when inUse is 'yes' and even row
      color: '#ffffff',
    },
  },
  {
    when: row => row.inUse !== 'true',
    style: {
      backgroundColor: 'red',  // Green when inUse is not 'yes' and even row
      color: '#ffffff',
    },
  },

];

    return (
        <div className="container mt-1 min-w-screen overflow-x-auto">
            <input
                type="search"
                className="w-full border border-grey-400 rounded-xl p-2 hover:border-blue-700 focus:border-grey-100 appearance-none cursor-pointer max-h-16"
                placeholder="Search"
            />
            <DataTable
                columns={columns}
                data={rows}
                pagination
                selectableRows
                fixedHeader
                title="Previous Records"
                conditionalRowStyles={conditionalRowStyles}
                
            />
        </div>
    )
}
