import React from 'react';
import './Home.css';

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <h4>Welcome to The Turtle Ducks Website!</h4>

      <div class="grid">

        <div class="home-div" id ="home-box">
          Home: <br />
          Click Home to come back to this page!
      </div>

        <div class="home-div" id ="admin-box">
          Admin: <br />
          Enter your listings~
          <li>type</li>
          <li>price</li>
          <li>title</li>
        </div>

        <div class="home-div" id ="feed-box">
          Feed:<br />
          Here, you will see all the available listings!
      </div>
      </div>
    </div>

  );
}

export default Home;
