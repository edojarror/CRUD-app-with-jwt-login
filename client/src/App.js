import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { currentUserData, store } from './store';
import Navbar  from './components/Navbar';
import './App.css';

import { readHandler, deleteHandler } from './ButtonHandler'


function App() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const buttonStyles = {
    fontSize: "20px",
    marginRight: "18px",
    padding: "6px",
    borderRadius: "8px",
    backgroundColor: "black",
    color: "white" 
  }

  const browseButtonStyles = {
    fontSize: "18px", 
    width: "80%", 
    padding: "12px", 
    borderRadius: "16px", 
    border: "none", 
    backgroundColor: "black", 
    color: "white"

  }

  store.subscribe(() => console.log("redux store : ",store.getState()));

  useEffect(() => {

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
            //  condition b
             if(res.status === 401) {
                 console.log("access denied");
                 navigate('/login_page')

              //  condition c
             } else if (res.ok) {
                 console.log("access to main menu page granted");
                 readHandler(setData)  
             }

         })
         .catch(err => {
             console.log(err);
         })
     }
  },[])

  return (
    <div className="App">
      <Navbar></Navbar>
      <div style={{height: "500px", width: "100%", border: "2px solid blue"}}>
        <div className='title' style={{marginTop: "70px", padding: "0 30px"}}>
          <p style={{fontSize: "32px"}}>Create, collaborate, and scale your blogs and docs.</p>
        </div>
        <div className='subtitle'  style={{padding: "0 12px", marginBottom: "40px"}}>
          <p>Effortlessly build blogs, API docs, and product guides with Hashnode, with the flexibility of a headless CMS and more.</p>
        </div>
        <div className='browse-button'>
          <button style={browseButtonStyles}>Browse</button>
        </div>
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
          
          <a >
          <i class="fa fa-bars"></i>
          </a>
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
