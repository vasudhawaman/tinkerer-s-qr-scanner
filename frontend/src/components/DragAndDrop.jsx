import React, { useCallback, useState,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  // Handle file drops
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  // Initialize the dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*,application/pdf', // Customize accepted file types as needed
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
       margin:'5px',
      padding: '40px',
      borderWidth: '2px',
      borderRadius: '10px',
      borderColor: 'white',
      borderStyle: 'dashed',
      backgroundColor: '#2c5282',
      color: 'white',
      cursor: 'pointer',
    },
    preview: {
      marginTop: '20px',
      textAlign: 'left',
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
    </div>

    
  );
};


export default FileUpload;
