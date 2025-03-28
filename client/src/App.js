import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { currentUserData, store } from './store';
import './App.css';

import { readHandler, deleteHandler } from './ButtonHandler'


function App() {
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  const buttonStyles = {
    fontSize: "20px",
    marginRight: "18px",
    padding: "6px",
    borderRadius: "8px",
    backgroundColor: "black",
    color: "white" 
  }

  store.subscribe(() => console.log("redux store : ",store.getState()));

  useEffect(() => {

     // check localstorage when running
     console.log("dont have token ? ", !localStorage.getItem("token") || localStorage.getItem("token") === null)

     // condition a)

     if(!localStorage.getItem("token") || localStorage.getItem("token") === null) {
         console.log("authorize condition a : dont have token");
         navigate('/login_page')
     } else if (localStorage.getItem) {
         console.log("authorize condition c : have token, token accepted")
         fetch('http://localhost:4000/verify', {
             method: "POST",
             body: JSON.stringify({token: localStorage.getItem("token")}),
             headers: {
                 "Content-Type": "application/json"
             }
         })
         .then(res => {
             console.log(res);
             if(res.status === 401) {
                 console.log("access denied");
                 navigate('/login_page')
             } else if (res.ok) {
                 console.log("access to main menu page granted");
                 readHandler(setData)  
             }

         })
         .catch(err => {
             console.log(err);
         })
     }

    // console.log("use effect running, data")
    //   readHandler(setData)  
    // console.log("after effect ...")
  }, [])

  return (
    <div className="App">
      <div style={{height: "500px", width: "100%", border: "2px solid blue"}}>
        display text here : 
        <ul>
        {
            data.map(item => { 
              return (
              <div key={item.user_id}>
                <span>id: {item.user_id}  </span>
                <span>username : {item.username}</span>
                <span> password: {item.password}</span>
                <Link to={`/edit/${item.user_id}`}>
                  <button 
                    onClick={(() => {
                      console.log(item.user_id);
                      store.dispatch(currentUserData(item))
                      
                      })}>
                      edit
                  </button>
                </Link>
                
                <button
                  onClick={((e) => {
                    console.log(item.user_id);
                    e.preventDefault()
                    deleteHandler(item.user_id, setData)
                    })}>
                    delete
                </button>
              </div>
            )
            })
        }   
        </ul>
          
      </div>
      <div style={{boxSizing: "border-box",display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8px"}}>
        <Link to={"/create_user"}>
          <button style={buttonStyles} onClick={() => console.log("redirecting to create-user page")}>create</button>
        </Link>
        
      </div>
      
    </div>
  );
}

export default App;
