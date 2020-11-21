import React from 'react';
//import App from '../App';
import './Feed.css';
import {getWebS} from '../App';
const websocket = getWebS();
function Feed() {
  const [messages, setMessages] = React.useState(['']);

  const handleWebSocketMessage=(messageEvent)=>{
    const newMessages = JSON.parse(messageEvent.data);
    console.log(newMessages);
    setMessages(newMessages);
  };
  React.useEffect(()=>{
    console.log("Inside the useeffect");
    websocket.addEventListener('message', handleWebSocketMessage);
  }, []);
  function createList(){

  }

  return (
    <div class ="box">
      <div class ="filter">
        <label for="fil"> Type<select name = "type">
          <option value = "food">Food</option>
          <option value = "wands">Wands</option>
          <option value = "potions">Potions</option>
          </select></label>
      </div>
      <div id="container">
          {messages.map(item=><div class = "Listing"><h3>postId: {item._id}</h3><br /><h3>Type: {item.Type}</h3><br />
          <h3>Price: {item.Price}</h3><br /><h3>Title: {item.Title}</h3></div>)}
        </div>

    </div>

  );
}

export default Feed;