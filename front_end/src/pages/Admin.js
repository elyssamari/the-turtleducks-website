import React from 'react';
import'./Admin.css';
import {getWebS} from '../App';
const websocket = getWebS();

function Admin() {
//most of the stuff from here from lectures. i just added more stuff to handle the more buttons and functions
  const[postId, setPostId] = React.useState('');
  const[objType, setObjType] = React.useState('');
  const[objPrice, setObjPrice] = React.useState('');
  const[objTitle, setObjTitle] = React.useState('');

  function posting(){
    let message = ["post", objType, objPrice, objTitle];
    window.location.reload();
    websocket.send(message);
  }
  function editing(){
    let message = ["edit",postId,objType, objPrice,objTitle];
    window.location.reload();
    websocket.send(message);
  }
  function deleting(){
    let message = ["delete",postId,objType, objPrice,objTitle];
    window.location.reload();
    websocket.send(message);
  }
  return (
    <div class ="box">		  
		  <div class="posting">
        	<h3>postId<input value={postId} onChange={e=>setPostId(e.target.value)}/></h3>
		      <h3>Type<input value={objType} onChange={e=>setObjType(e.target.value)}/></h3>
          <h3>Price<input value={objPrice} onChange={e=>setObjPrice(e.target.value)}/></h3>
          <h3>Title<input value={objTitle} onChange={e=>setObjTitle(e.target.value)}/></h3>         
      </div>
		  <div class="sub-button">
	            <button onClick={posting}  type="submit">Post</button>
	            <button onClick={editing}  type="submit">Edit</button>
	            <button onClick={deleting} type="submit">Delete</button>
	    </div>
	</div>
  );
}
export default Admin;
