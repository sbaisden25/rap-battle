import React from 'react';
import './high.css';

function highScore({ highScore }) {
  return (

    <div class="container">

        <h3 class="high">High Score: {highScore}</h3>

    </div>

  );
}

export default highScore;
