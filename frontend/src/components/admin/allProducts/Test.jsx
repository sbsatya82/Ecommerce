import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const Test = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    files.forEach((file)=>{
      formData.append('images', file);
    })
    


    try {
      const response = await axios.post('/api/v1/test', formData)

      if (response) {
        console.log('Files uploaded successfully');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{margin:40}}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Use the 'multiple' attribute to allow selecting multiple files */}
        <input type="file" onChange={handleFileChange} multiple />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Test
