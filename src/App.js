import React, { useState, useEffect } from 'react';
import './App.css';
import Artist from './components/artist/Artist';
import Rappers from './rappers.json';
import axios from 'axios';
import { Credentials } from './Credentials';
import Header from './components/header/Header';
import Score from './components/score/Score';
import High from './components/score/High';
import Footer from './components/footer/Footer';
import Popularity from './components/popularity/Popularity';

function App() {

  const spotify = Credentials();  
  const [token, setToken] = useState(''); 
  const [matchup, setMatchup] = useState(''); 
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  //get the query for api call for both artists info
  function getQuery() {
    var rapper1 = getRandomRapperId();
    var rapper2 = getRandomRapperId();

    //run until the 2 rappers are unique
    while (rapper1 === rapper2) {
      rapper2 = getRandomRapperId();
    }
    return rapper1 + ',' + rapper2;
  }

  //get a random rapper id from the json file
  function getRandomRapperId() {
    const rand = Math.floor(Math.random() * Rappers.length);
    return Rappers[rand].id;
  }


  // Get token so matchup works on first load
  useEffect(() => {
  axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);
      handleReset()
    })
  }, []);

  // Spotify API authorization
  useEffect(() => {
  axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);

      handleReset() // reset the page with a new matchup but keeps user score

    })
  }, [spotify.ClientId, spotify.ClientSecret]);     

  
  //calcMorePopular() will calulate which rapper is more popular
  function calcMorePopular(matchup) {
    if (matchup[1] > matchup[4]) {
      return matchup[1];
    } 
    if (matchup[1] === matchup[4]) {
      return "Tie";
    }
    else {
      return matchup[4];
    }
  }

  // function that handles clicking the artist on the left
  function handleClickLeft() {
    const morePopular = calcMorePopular(matchup);
    if (morePopular === matchup[1]) {
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
    }
    else if (morePopular === matchup[4]) {

      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
    }
    else {
      setScore(score);
    }
    handleReset();
  }

  // handles user picking the left artist
  function handleClickRight() {
    const morePopular = calcMorePopular(matchup);
    if (morePopular === matchup[4]) {
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
    }
    
    else if (morePopular === matchup[1]) {

      if (score > highScore) {
        setHighScore(score);
      }

      setScore(0);
    }
    else {
      setScore(score);
    }
    handleReset();
  }

  // reset the page with a new matchup but keep the score
  function handleReset() {
    const query = getQuery();
    axios(`https://api.spotify.com/v1/artists?ids=${query}`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(res => {
      setMatchup([res.data.artists[0].name,
        res.data.artists[0].popularity,
        res.data.artists[0].images[0].url,
        res.data.artists[1].name,
        res.data.artists[1].popularity,
        res.data.artists[1].images[0].url
      ]);
    })
  }

  


  return (

      <div class="container">

      <Header />

      <Popularity />


        <div class="artists">

          <div class="clickable" onClick={handleClickLeft}>

          <Artist name={matchup[0]} popularity={matchup[1]} image={matchup[2]} />

          </div>

          <div class="clickable" onClick={handleClickRight}>

          <Artist name={matchup[3]} popularity={matchup[4]} image={matchup[5]} />

          </div>

          </div>

          <div class="score">

            <Score score = {score}/>

          </div>

          <div class="high">

            <High highScore = {highScore}/>

          </div>


          <Footer />

      </div>


    
  );
}

export default App;
