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
 //creates the filtered list
  function createFilteredListing(){
    //empties the container, the "listing area"
    document.getElementById("container").innerHTML=" ";
    //getting the value of the option that was selected
    let tempt = document.getElementById("typef");
    let type = tempt.value;
    console.log(typeof type);
    //something I saw on StackOF. It filters messages so that the newL conatins objects with the same type of the selected type 
    function cleanit(objval){
      console.log(typeof objval.Type);
      return objval.Type === type;
    }
    let newL = messages.filter(cleanit);
    console.log(newL);
    //going through each item of newL and creating a listing for it and shows by appending to conatiner, the "listing area"
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
      
      let objImg = document.createElement("img");//new
      objImg.innerHTML.img = document.getElementById("imgID");//messing around 
      objlist.appendChild(objImg);

      document.getElementById("container").appendChild(objlist);
    });
  }
   //filters the drop down menu list
   function filterDfilter(){
    document.getElementById("typef").innerHTML=" ";
    console.log("Inside the filterDfilter function");
    let newLt = [];
    //going through messages and adding the value of key "Type" to array newLt
    for(let i = 0; i<messages.length; i++){
      newLt.push(messages[i].Type);
    }
    let newtwo = [];
    let finding = false;
    //going through newLt since there may be duplicates of a type. Puts the types in newtwo.
    for(let a = 0; a<newLt.length; a++){
      for(let b = a+1; b<newLt.length; b++){
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
    //going through newtwo to create the options and appending it to the select
    for(let j = 0; j<newtwo.length; j++){
      let tempO = document.createElement("option");
      tempO.text = newtwo[j];
      tempO.value = newtwo[j];
      document.getElementById("typef").appendChild(tempO);
      console.log("appended");
    }
}
  //don't think i can comment down there so it's here. for label for the Type next to the box i choose onMouseOver to activate the 
  //filterDfilter function, i tried window.onload on the function and <select> and onClick on <select> but it was giving me issues
  //the rest can be found on lecture i think classwork 9?
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
          <h3>Price: {item.Price}</h3><br /><h3>Title: {item.Title}</h3><br/><h3>Image: {item.img}</h3></div>)
        }
          
        </div>

    </div>

  );
}

export default Feed;