import React from 'react';
import './artist.css';

function Artist({ name, popularity, image }) {

  return (
    <div class="artist">

        <h1 class="artist-name">{name}</h1>

        <img src={image} alt={name} />
    
    </div>


  );
}

export default Artist;
