import React from 'react';
//import App from '../App';
import './Feed.css';
import { getWebS } from '../App';
const websocket = getWebS();
function Feed() {

  const [messages, setMessages] = React.useState(['']);

  const handleWebSocketMessage = (messageEvent) => {
    const newMessages = JSON.parse(messageEvent.data);
    console.log(newMessages);
    setMessages(newMessages);
  };
  React.useEffect(() => {
    console.log("Inside the useeffect");
    websocket.addEventListener('message', handleWebSocketMessage);
  }, []);

  function listMessages(objval) {
    objval.forEach((item) => {
      let objlist = document.createElement("div");
      objlist.classList.add("Listing");
      let objId = document.createElement("h3");
      objId.innerHTML = "postId: " + item._id;
      objlist.appendChild(objId)
      let objType = document.createElement("h3");
      objType.innerHTML = "Tpye: " + item.Type;
      objlist.appendChild(objType)
      let objP = document.createElement("h3");
      objP.innerHTML = "Price: " + item.Price;
      objlist.appendChild(objP)
      let objTitle = document.createElement("h3");
      objTitle.innerHTML = "Title: " + item.Title;
      objlist.appendChild(objTitle);

    //  let objImg = document.createElement("img");//new
    //  objImg.innerHTML.img = document.getElementById("imgID");//messing around 
    //  objlist.appendChild(objImg);

      document.getElementById("container").appendChild(objlist);
    });
  }

  //creates the filtered list
  function createFilteredListing() {
    //empties the container, the "listing area"
    document.getElementById("container").innerHTML = " ";
    //getting the value of the option that was selected
    let type = document.getElementById("typef").value;
    console.log(typeof type);

    var pricef = document.getElementById("pricef");
    var price = pricef.options[pricef.selectedIndex].value;
    console.log(typeof price);

    if (type === "(None)" && price === "(None)") {
      listMessages(messages);
    } else if (type !== "(None)" && price === "(None)") {
      function cleanit(objval) {
        console.log(typeof objval.Type);
        return objval.Type === type;
      }
      let newL = messages.filter(cleanit);
      console.log(newL);
      listMessages(newL);
    } else if ((type === "(None)" || type === '') && price !== "(None)") {
      function filterPriceOnly(objval) {
        console.log(typeof objval.Price);
        return parseInt(objval.Price) <= parseInt(price);
      }
      let newL = messages.filter(filterPriceOnly);
      console.log(newL);
      listMessages(newL);
    } else {
      function typeFilter(objval) {
        console.log(typeof objval.Type);
        return objval.Type === type;
      }
      function priceFilter(objval) {
        console.log(typeof objval.Price);
        return parseInt(objval.Price) <= parseInt(price);
      }
      let typeL = messages.filter(typeFilter);
      let priceL = typeL.filter(priceFilter);
      console.log(priceL);
      listMessages(priceL);
    }
  }

  //filters the drop down menu list
  function filterDfilter() {
    document.getElementById("typef").innerHTML = " ";
    console.log("Inside the filterDfilter function");
    let newLt = [];
    //going through messages and adding the value of key "Type" to array newLt
    for (let i = 0; i < messages.length; i++) {
      newLt.push(messages[i].Type);
    }
    let newtwo = [];
    newtwo.push("(None)");
    let finding = false;
    //going through newLt since there may be duplicates of a type. Puts the types in newtwo.
    for (let a = 0; a < newLt.length; a++) {
      for (let b = a + 1; b < newLt.length; b++) {
        if (!finding) {
          if (newLt[a] === newLt[b]) {
            finding = true;
          }
        }
      } if (!finding) {
        console.log("inside the adding");
        newtwo.push(newLt[a]);
      } else {
        finding = false;
      }
    }
    console.log(newLt);
    console.log(newtwo);
    //going through newtwo to create the options and appending it to the select
    for (let j = 0; j < newtwo.length; j++) {
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
    <div class="box" >
      <div class="filter">
        <label for="fil" onMouseOver={filterDfilter}> Type<select id="typef" >
        </select></label>
        <label for="pfil"> Price<select id="pricef">
          <option value="(None)">(None)</option>
          <option value="5">Under $5</option>
          <option value="20">Under $20</option>
          <option value="50">Under $50</option>
          <option value="100">Under $100</option>
        </select></label>
        <button onClick={createFilteredListing}>Filter</button>
      </div>
      <div id="container" >
        {
          messages.map(item => <div class="Listing" ><h3>postId: {item._id}</h3><br /><h3>Type: {item.Type}</h3><br />
            <h3>Price: {item.Price}</h3><br /><h3>Title: {item.Title}</h3></div>)
        }
      </div>

    </div>

  );
}

export default Feed;