
import React, { useState } from 'react';

let api = "http://localhost:3000";


const UploadForm = () => {
    const [file, setFile] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!file) return;

        let formData = new FormData();
        formData.append('music', file);

        fetch(api +'/upload/music', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Archivo subido con éxito');
            } else {
                alert('Error al subir el archivo');
            }
        })
        .catch(error => {
            console.error('Error al subir el archivo:', error);
        });
    };

    return (
        <div className="upload-form">
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button  style={{border: "solid"}}type="submit">Subir Canción</button>
            </form>
        </div>
    );
};

export default UploadForm;
