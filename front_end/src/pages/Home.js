import React from 'react';
import './Home.css';

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <h3>Welcome to The Turtle Ducks Website!</h3>

      <div id ="home-info">
        Home: <br/>
        Click Home to come back to this page!
      </div>

      <div id ="admin-info">
      Admin: <br/>
      Enter your listings~
      <li>type</li>
      <li>price</li>
      <li>title</li>
      </div>

      <div id ="feed-info">
      Feed:<br/>
      Here, you will see all the available listings!
      </div>

    </div>

    
  );
}

export default Home;
