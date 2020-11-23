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
 
  function createFilteredListing(){
    document.getElementById("container").innerHTML=" ";
    let tempt = document.getElementById("typef");
    let type = tempt.value;
    console.log(typeof type);
    function cleanit(objval){
      console.log(typeof objval.Type);
      return objval.Type === type;
    }
    let newL = messages.filter(cleanit);
    console.log(newL);
    
    newL.forEach((item)=>{
      let objlist = document.createElement("div");
      objlist.classList.add("Listing");
      let objId = document.createElement("h3");
      objId.innerHTML = item._id;
      objlist.appendChild(objId)
      let objType = document.createElement("h3");
      objType.innerHTML = item.Type;
      objlist.appendChild(objType)
      let objP = document.createElement("h3");
      objP.innerHTML = item.Price; 
      objlist.appendChild(objP)
      let objTitle = document.createElement("h3");
      objTitle.innerHTML = item.Title;
      objlist.appendChild(objTitle);
     
      document.getElementById("container").appendChild(objlist);
    });
  }

   function filterDfilter(){
     document.getElementById("typef").innerHTML=" ";
    console.log("Inside the filterDfilter function");
    let newLt = [];
    for(let i = 0; i<messages.length; i++){
      newLt.push(messages[i].Type);
    }
    let newtwo = [];
    let finding = false;
    for(let a = 0; a<newLt.length; a++){
      for(let b = a+1; b<newLt.length-1; b++){
        if(!finding){
          if(newLt[a]===newLt[b]){
            finding = true;
          }
        }
      }if(!finding){
        console.log("inside the adding");
        newtwo.push(newLt[a]);
      }else{
        finding = false;
      }
    }
    console.log(newLt);
    console.log(newtwo);
    for(let j = 0; j<newtwo.length; j++){
      let tempO = document.createElement("option");
      tempO.text = newtwo[j];
      tempO.value = newtwo[j];
      document.getElementById("typef").appendChild(tempO);
      console.log("appended");
    }
}
  
  return (
    <div class ="box" >
      <div class ="filter">
        <label for="fil"onMouseOver={filterDfilter}> Type<select id ="typef" >
            
          </select></label>
          <button onClick={createFilteredListing}>Filter</button>
      </div>
      <div id="container" >
        
          {
          messages.map(item=><div class = "Listing" ><h3>postId: {item._id}</h3><br /><h3>Type: {item.Type}</h3><br />
          <h3>Price: {item.Price}</h3><br /><h3>Title: {item.Title}</h3></div>)
        }
          
        </div>

    </div>

  );
}

export default Feed;