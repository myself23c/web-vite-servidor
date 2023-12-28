import { useState, useCallback } from 'react';
const API = import.meta.env.VITE_BACKEND_API

const useFileOperations = () => {
    const [files, setFiles] = useState([]);

    const getFiles = useCallback(() => {
        fetch(API+'/crawlerDB')
            .then(response => response.json())
            .then(data => setFiles(data));
    }, []);

    /*
    const uploadFile = () => {
        const file = document.querySelector('#fileInput').files[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData
        }).then(getFiles);
    };
*/
    const downloadFile = (fileName) => {
        fetch(API+'/crawlerDB' + fileName)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.click();
            });
    };

    const deleteFile = (fileName) => {
        fetch(API+'/crawlerDB' + fileName, {
            method: 'DELETE'
        }).then(getFiles);
    };

    return { getFiles, downloadFile, deleteFile, files };
};

export default useFileOperations;
