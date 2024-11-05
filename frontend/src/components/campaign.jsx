import React, { useState, useEffect, useCallback } from 'react';
import '../styles/campaign.css';

const Campaign = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(Array(5).fill(null));
  const bucketName = 'githubbies-public-bucket';

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const uploadFile = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64File = reader.result.split(',')[1];
      const key = file.name;

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bucketName, fileContent: base64File, key }),
      });

      response.ok ? alert('File uploaded successfully.') && fetchFiles() : alert('Error uploading file.');
    };
    reader.readAsDataURL(file);
  };

  const deleteFile = async (key) => {
    const response = await fetch('http://localhost:5000/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bucketName, key }),
    });

    response.ok ? alert('File deleted successfully.') && fetchFiles() : alert('Error deleting file.');
  };

  const getFileUrl = async (key) => {
    const response = await fetch(`http://localhost:5000/file-url/${key}?bucketName=${bucketName}`);
    const data = await response.json();
    return data.url;
  };

  const fetchFiles = useCallback(async () => {
    const response = await fetch(`http://localhost:5000/list-files?bucketName=${bucketName}`);
    if (response.ok) {
      const data = await response.json();
      const fileUrls = await Promise.all(
        data.files.map(async (file) => ({ key: file, url: await getFileUrl(file) }))
      );
      setFiles(fileUrls);
    } else {
      alert('Error fetching files.');
    }
  }, [bucketName]);

  const selectFileForContainer = async (file, containerIndex) => {
    const url = await getFileUrl(file.key);
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[containerIndex] = url;
    setSelectedFiles(newSelectedFiles);
  };

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className="campaign-container">
      <h1>Campaigns</h1>
      <section>
        <h2>Upload Advertisement</h2>
        <input type="file" onChange={handleFileChange} />
        <button className="upload-button" onClick={uploadFile}>Upload</button>
      </section>
      <section>
        <h2>Uploaded Files</h2>
        <ul>
          {files.map((file) => (
            <li key={file.key} className="file-item">
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.key}
              </a>
              <div>
                <button className="delete-button" onClick={() => deleteFile(file.key)}>Delete</button>
                {Array.from({ length: 5 }, (_, index) => (
                  <button key={index} className="select-button" onClick={() => selectFileForContainer(file, index)}>
                    Select for Container {index + 1}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <h2>Image Containers</h2>
      <section className="image-container">
        {selectedFiles.map((url, index) => (
          <section key={index} className="image-box">
            {url ? (
              <img src={url} alt={`Selected file ${index + 1}`} />
            ) : (
              <p>No image selected</p>
            )}
          </section>
        ))}
      </section>
    </div>
  );  
};

export default Campaign;
