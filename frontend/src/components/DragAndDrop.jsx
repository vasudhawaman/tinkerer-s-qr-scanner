import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import jsQR from 'jsqr'; // Use jsQR for QR code decoding
import axios from 'axios';
import Swal from 'sweetalert2';
const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [qrCode, setQrCode] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [scannedResult, setScannedResult] = useState(""); // To store scanned QR code result

  // Handle file drops
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  // Initialize the dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', // Only accept image files for QR scanning
  });

  const styles = {
    container: {
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center',
    },
    dropzone: {
      margin: '5px',
      padding: '40px',
      borderWidth: '2px',
      borderRadius: '10px',
      borderColor: 'white',
      borderStyle: 'dashed',
      backgroundColor: 'rgb(111, 165, 241)',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    dropzoneHover: {
      backgroundColor: 'rgb(81, 135, 211)', // Darker shade for hover effect
    },
    preview: {
      marginTop: '20px',
      textAlign: 'left',
    },
    qrCode: {
      marginTop: '20px',
      color: '#4CAF50',
    },
  };

  // Handle paste events
  const handlePaste = (event) => {
    const clipboardItems = event.clipboardData.items;
    const pastedFiles = [];

    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) pastedFiles.push(file);
      }
    }

    if (pastedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...pastedFiles]);
    }
  };

  // Attach paste event listener
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  // Function to scan the image for QR code using jsQR
  const scanQrCode = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, img.width, img.height);

        if (code) {
          setScannedResult(code.data); // Set the QR code data
          const onScanSuccess = async (code) => {
            //console.log(result);
            const deviceId = code.data;
            try {
              const token = localStorage.getItem("token"); 
                // Make the GET request to check if the device is in use
                const response = await axios.get(`http://localhost:8000/device/${deviceId}/in-use`,{
                  headers: {
                    Authorization: token, // Include the token in the header
                  },
                });
                console.log("devicein use",response);

                // Handle the response
                if (response.status === 200 &&response.data.inUse) {
                    Swal.fire({
                        title: "Device is in Use!",
                        text: `You scanned ${deviceId}`,
                        icon: "error"
                      });
                } else if (response.status == 200) {
                  const token = localStorage.getItem("token"); 
                    const response = await axios.get(`http://localhost:8000/device/${deviceId}/change-status`,{
                      headers: {
                        Authorization: token, // Include the token in the header
                      },
                    });
                }
              } catch (error) {
                console.error("Error checking device in-use status:", error);
              }
        };
         onScanSuccess(code);
    
        } else {
          setScannedResult("No QR code found");
        }
      };
    };

    reader.readAsDataURL(file);
  };

  // Trigger QR code scan for each uploaded image
  useEffect(() => {
    files.forEach((file) => {
      scanQrCode(file);
    });
  }, [files]);

  return (
    <div style={styles.container}>
      <div {...getRootProps({ style: styles.dropzone })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag and drop files here, or paste them with Ctrl+V</p>
        )}
      </div>
      <div style={styles.preview}>
        {files.length > 0 && <h3>Files:</h3>}
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              {file.name} - {Math.round(file.size / 1024)} KB
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Scanned Result:</h4>
        <p>{scannedResult}</p>
      </div>
    </div>
  );
};

export default FileUpload;
