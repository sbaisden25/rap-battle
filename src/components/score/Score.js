import React from 'react';
import './score.css';

function Score({ score }) {
  return (

    <div class="container">

        <h3 class ="score">Current Score: {score}</h3>

    </div>

  );
}

export default Score;
