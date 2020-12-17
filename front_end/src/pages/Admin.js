import React from 'react';
import './Admin.css';
import { getWebS } from '../App';
const websocket = getWebS();

function Admin() {
  const [postId, setPostId] = React.useState('');
  const [objType, setObjType] = React.useState('');
  const [objPrice, setObjPrice] = React.useState('');
  const [objTitle, setObjTitle] = React.useState('');
  const [objImg, setObjImg] = React.useState(''); 

  function posting() {
    if (isNaN(objPrice) === true) {
      alert("Price has to be a number!");
    } else if (postId !== "") {
      alert("The postId should be empty when adding a listing.");
    } else if ((objType === "") || (objPrice === "") || (objTitle === "")){
      alert("To add a listing, please enter the type, price and title.");
    } else {
      let message = ["post", objType, objPrice, objTitle];
      window.location.reload();
      websocket.send(message);
    }
  }
  function editing() {
    if (postId === "") {
      alert("postId is required to edit a listing. " +
      "Please refer to the Feed to copy the postId of the listing you would like to edit.");
    } else if (isNaN(objPrice) === true) {
      alert("Price has to be a number!");
    } else if ((objType === "") || (objPrice === "") || (objTitle === "")) {
      alert("Please enter the type, price and title.");
    } else {
      let message = ["edit", postId, objType, objPrice, objTitle];
      window.location.reload();
      websocket.send(message);
    }
  }
  function deleting() {
    if ((objType !== "") || (objPrice !== "") || (objTitle !== "")) {
      alert("Type, Price and Title field should be empty. postId is required to delete a listing. " +
      "Please refer to the Feed to copy the postId of the listing you would like to delete.");
    } else if (postId === ""){
      alert("postId is required to delete a listing. " +
      "Please refer to the Feed to copy the postId of the listing you would like to delete.");
    } else {
    let message = ["delete", postId, objType, objPrice, objTitle];
    window.location.reload();
    websocket.send(message);
    }
  }

  return (
    <div class="box">
      <div class="posting">
        <p>Note: To edit or delete a listing, the postId field is required. 
          Please refer to the Feed and copy the id of the listing you want to edit or delete.
        </p>
        <h3>postId<input value={postId} onChange={e => setPostId(e.target.value)} class="shadow" /></h3>
        <h3>Type<input value={objType} onChange={e => setObjType(e.target.value)} class="shadow" /></h3>
        <h3>Price<input value={objPrice} onChange={e => setObjPrice(e.target.value)} class="shadow" /></h3>
        <h3>Title<input value={objTitle} onChange={e => setObjTitle(e.target.value)} class="shadow" /></h3>
        <h3>Upload Image<input type="file" input value={objImg} onChange={e => setObjImg(e.target.value)}></input></h3>
      </div>
      <div class="sub-button">
        <button onClick={posting} type="submit">Post</button>
        <button onClick={editing} type="submit">Edit</button>
        <button onClick={deleting} type="submit">Delete</button>
      </div>
    </div>
  );
}
export default Admin;
