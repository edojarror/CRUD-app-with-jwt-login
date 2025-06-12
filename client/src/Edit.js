import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { store } from './store';



export default function Edit () {
    const [defaultValue, setDefaultValue] = useState({user_id: 0, username: "username", password: "password"});
    const [editedValue, seteditedValue] = useState("");
    let { id } = useParams();

    const getUserData = async () => {
        try{
            await fetch(`http://localhost:4000/${id}`).then(res => res.json()).then(userdata => setDefaultValue(userdata[0]))
        } catch (err) {
            console.log(err)
        }
    }

    const editButtonHandler = async (userdata) => {
        try {
            console.log("edit button handler running ... ,data was :  ", userdata)
            fetch('http://localhost:4000/edit', {
                method: "PUT",
                body: JSON.stringify({
                    user_id: userdata.user_id,
                    username: userdata.username,
                    password: userdata.password,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("use effect running ... , params = ",id)
       
        getUserData()
    }, [])
    return (
        <div>
            edit page
            <Link to="/">
                <button>back to main menu</button>
            </Link>
            
            
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
               <div>
                <label>username : </label>
                <input value={defaultValue.username || ""} onChange={(e) => setDefaultValue({...defaultValue, username : e.target.value })} />
               </div>
               <div>
                <label>password : </label>
                <input value={defaultValue.password || ""} onChange={(e) => setDefaultValue({...defaultValue, password : e.target.value })} />
                </div> 
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", width: "16%"}}>
                    <button onClick={() => {getUserData()}}>reset changes</button>
                    <Link to={"/"}>
                        <button onClick={() => editButtonHandler(defaultValue)}>confirm</button>
                    </Link>
                    
                </div>
                   
            </div>
           
        </div>
    )
}