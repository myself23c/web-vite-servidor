import React, { useState } from 'react';

let api = "http://localhost:3000";

function YouTubeUploader() {
    const [url, setUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('url', url);

        fetch(api + '/upload-from-youtube/music', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Archivo subido con éxito');
                setUrl(''); // Resetea el campo del formulario
            } else {
                alert('Error al subir el archivo');
            }
        })
        .catch(error => {
            console.error('Error al subir el archivo:', error);
        });
    };

    return (
        <div id="upload-section2" style={{ margin: '10px' }}>
            <h2 style={{ marginBottom: '10px' }}>Subir Archivo MP3 mediante pasar un link de YouTube</h2>
            <form id="upload-form-from-youtube" onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', color:"black"}}>
                <input 
                    type="text" 
                    id="url-input" 
                    name="url" 
                    placeholder="Ponga URL YouTube" 
                    required 
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    style={{ marginRight: '5px' }}
                />
                <button type="submit">Subir Archivo</button>
            </form>
        </div>
    );
}

export default YouTubeUploader;
