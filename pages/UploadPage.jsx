import React, { useEffect } from 'react';
import useFileOperations from '../api/useFileOperations';

export const FileUploader = () => {
    const { uploadFile, getFiles, downloadFile, deleteFile, files } = useFileOperations();

    useEffect(() => {
        getFiles();
    }, [getFiles]);

    const styles = {
        uploadButton: {
            margin: '10px',
            padding: '10px',
            border: '2px solid #007bff', // Borde más notorio para el botón de subida
            backgroundColor: '#ccc', // Fondo blanco
            cursor: 'pointer', // Cambiar el cursor para indicar que es un botón
            ':hover': { // Estilo para el hover
                backgroundColor: '#007bff', // Cambio de color en hover
                color: '#fff',
            }
        },
        actionButton: {
            margin: '5px',
            padding: '5px',
            border: '1px solid #000', // Bordes para los botones de acción
            ':hover': { // Estilo para el hover
                backgroundColor: '#ddd',
            }
        },
        fileItem: {
            marginBottom: '0.5cm',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #ccc',
            padding: '10px',
        },
        fileList: {
            maxHeight: 'calc(15 * 2.5cm)',
            overflowY: 'scroll',
        },
        fileName: {
            marginRight: '20px', // Espacio adicional alrededor del nombre del archivo
            flex: 1, // Ocupar el espacio disponible
        }
    };

    return (
        <div>
            <input type="file" id="fileInput" />
            <button style={styles.uploadButton} onClick={uploadFile}>Subir Archivo</button>
            <div id="fileList" style={styles.fileList}>
                {files.map((file, index) => (
                    <div key={index} style={styles.fileItem}>
                        <span style={styles.fileName}>{file}</span>
                        <div>
                            <button style={styles.actionButton} onClick={() => downloadFile(file)}>Descargar</button>
                            <button style={styles.actionButton} onClick={() => deleteFile(file)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

//export default FileUploader;
