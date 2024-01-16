// Componente para cargar index.html
import React from 'react';

function IndexHtmlLoader() {
  return (
    <iframe 
      src="/index.html" 
      title="Index Page"
      width="100%"
      height="1080px"
      style={{ border: 'none' }}
    ></iframe>
  );
}

// Componente para cargar videos.html
function VideosHtmlLoader() {
  return (
    <iframe 
      src="/videos.html" 
      title="Videos Page"
      width="100%"
      height="1080px"
      style={{ border: 'none' }}
    ></iframe>
  );
}

export { IndexHtmlLoader, VideosHtmlLoader };
