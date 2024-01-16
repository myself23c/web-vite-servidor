// script.js
let api = "http://194.163.129.32:3000/api/music-db-streaming";

document.addEventListener('DOMContentLoaded', function() {
    const playlistElement = document.getElementById('playlist');
    fetch(api +'/files/music')
        .then(response => response.json())
        .then(files => {
            window.playlist = files.map(file => file.filename);
            window.playlist.forEach((filename, index) => {
                const fileContainer = document.createElement('div');
                const fileElement = document.createElement('span');
                fileElement.textContent = filename;
                fileElement.onclick = function() { playFile(index); };

                const buttonContainer = document.createElement('div'); // Contenedor para los botones

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.onclick = function(event) {
                    event.stopPropagation();
                    deleteSong(filename, index);
                };

                const downloadButton = document.createElement('button');
                downloadButton.textContent = 'Descargar';
                downloadButton.onclick = function() {
                    downloadSong(filename);
                };

                buttonContainer.appendChild(deleteButton);
                buttonContainer.appendChild(downloadButton);

                fileContainer.appendChild(fileElement);
                fileContainer.appendChild(buttonContainer); // Añadir el contenedor de botones al contenedor principal
                playlistElement.appendChild(fileContainer);
            });
        });
});


function downloadSong(filename) {
    window.location.href = api + `/download-direct/music/${filename}`;
}


function deleteSong(filename, index) {
    fetch( api + `/delete/music/${filename}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                document.getElementById('playlist').children[index].remove();
            } else {
                alert('Error al eliminar la canción');
            }
        })
        .catch(error => console.error('Error al eliminar la canción:', error));
}

function playFile(index) {
    window.currentSongIndex = index;
    const filename = window.playlist[index];
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = api + `/download/music/${filename}`;
    audioPlayer.play();
    updatePlaylist(filename);

    // Comprobación periódica para avanzar si está cerca del final
    let checkNearEndInterval = setInterval(() => {
        const timeLeft = audioPlayer.duration - audioPlayer.currentTime;
        if (timeLeft < 1 && timeLeft > 0) { // Menos de 4 segundos para terminar
            clearInterval(checkNearEndInterval);

            // Verificar si la opción de repetir canción está activada
            if (document.getElementById('repeatSong').checked) {
                playFile(window.currentSongIndex); // Repetir la misma canción
            } else {
                nextSong(); // Ir a la siguiente canción
            }
        }
    }, 500);

    // Configurar el evento onended del reproductor para la siguiente canción o repetir
    audioPlayer.onended = () => {
        if (document.getElementById('repeatSong').checked) {
            playFile(window.currentSongIndex); // Repetir la misma canción
        } else {
            nextSong(); // Ir a la siguiente canción
        }
    };
}


function nextSong() {
    let nextIndex;
    if (document.getElementById('shufflePlay').checked) {
        // Generar un índice aleatorio
        do {
            nextIndex = Math.floor(Math.random() * window.playlist.length);
        } while (nextIndex === window.currentSongIndex);
    } else {
        // Siguiente canción en la lista
        nextIndex = (window.currentSongIndex + 1) % window.playlist.length;
    }
    playFile(nextIndex);
}


function previousSong() {
    let prevIndex = (window.currentSongIndex - 1 + window.playlist.length) % window.playlist.length;
    playFile(prevIndex);
}

function restartSong() {
    playFile(window.currentSongIndex);
}

function updatePlaylist(currentFilename) {
    const playlistDivs = document.getElementById('playlist').children;
    for (let i = 0; i < playlistDivs.length; i++) {
        const songDiv = playlistDivs[i].querySelector('span');
        songDiv.classList.remove('playing');
        if (songDiv.textContent === currentFilename) {
            songDiv.classList.add('playing');
        }
    }
}

document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData();
    let fileInput = document.getElementById('file-input');
    let file = fileInput.files[0];
    formData.append('music', file); // Asegúrate de que la clave 'music' coincida con tu backend

    fetch(api + '/upload/music', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert('Archivo subido con éxito');
            fileInput.value = ''; // Resetea el campo del archivo
            // Considera recargar la lista de canciones aquí
        } else {
            alert('Error al subir el archivo');
        }
    }).catch(error => {
        console.error('Error al subir el archivo:', error);
    });
});


document.getElementById('upload-form-from-youtube').addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(this);

    fetch(api + '/upload-from-youtube/music', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert('Archivo subido con éxito');
            this.reset(); // Resetea todos los campos del formulario
        } else {
            alert('Error al subir el archivo');
        }
    }).catch(error => {
        console.error('Error al subir el archivo:', error);
    });
});




document.getElementById('songSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value;
    if (searchTerm.length >= 3) {
        searchSongs(searchTerm);
    } else {
        // Si hay menos de 3 caracteres, limpiar los resultados
        updateSearchResults([]);
    }
});

function searchSongs(searchTerm) {
    if (!window.playlist) return; // Asegurarse de que la lista de reproducción está cargada

    // Filtrar las canciones que incluyan el término de búsqueda
    const filteredSongs = window.playlist.filter(song => song.toLowerCase().includes(searchTerm.toLowerCase()));

    // Actualizar el DOM con los resultados
    updateSearchResults(filteredSongs);
}

function updateSearchResults(songs) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.textContent = song;
        songDiv.classList.add('search-result'); // Añadir la clase para estilos

        songDiv.onclick = () => {
            const songIndex = window.playlist.indexOf(song);
            if (songIndex !== -1) {
                playFile(songIndex);
            }
        };

        resultsDiv.appendChild(songDiv);
    });
}


