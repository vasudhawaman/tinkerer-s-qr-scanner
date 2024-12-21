import React ,{useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
export default function Table() {
   // const [rows,setRows] =useState([]);
      const rows =[
        {   "id":"1",
          "respRate":"800",
            "appointmentDate" :"19/10/2024",
            "appointmentTime":"7:00 pm",
        },
        {  "id":"2",
          "respRate":"800",
          "appointmentDate" :"19/10/2024",
          "appointmentTime":"7:00 pm",
      },
      {   "id":"3",
        "respRate":"800",
        "appointmentDate" :"19/10/2024",
        "appointmentTime":"7:00 pm",
    }
      ]
    const columns = [
        {
            name: "Date",
            selector: (row) => row.appointmentDate,
            sortable: true,
        },
       
        {
            name: "Time",
            selector: (row) => row.appointmentTime,
            sortable: true,
        },
        {
            name: "Respiration",
            selector: (row) => row.respRate,
            sortable: true,
        },
    ];

    
    const [search, setSearch] = useState(rows);
    const conditionalRowStyles = [
        {
          when: row => row.id %2 === 0,
          style: {
            
            backgroundColor: '#2c5282',
            color: '#ffffff',
            
          },
         
        },
        // You can also pass a callback to style for additional customization
        {
            when: row => row.id %2 === 1,
            style: {
              
              backgroundColor: '#ebf8ff',
              color: '#000000',
              
            },
            
        }
      ];
     
    return (
        <div className="container mt-1 min-w-screen">
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
