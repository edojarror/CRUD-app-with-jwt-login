import { useState } from 'react'
import { Link } from 'react-router'


export default function CreateUser () {
    const [inputValue, setInputValue] = useState({username: "", password: ""})
    const divMargin = {
        margin: "8px"
    }
    const labelMargin = {
        margin: "auto 8px"
    }

    const confirmHandler = async (inputvalue) => {
        try {
            let {username, password} = inputvalue;
            await fetch('http://localhost:4000/create', {
                method: "POST",
                body: JSON.stringify({username, password}),
                headers: {
                    "Content-Type": "application/json"
                }
            })

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div style={{display: "flex", height: "100vh", width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div style={{border: "1px solid black", width: "360px", height: "160px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <div>
                    CREATE USER PAGE
                </div>
                
                <div style={divMargin}>
                    <label style={labelMargin}>username</label>
                    <input onChange={(e => setInputValue({...inputValue, username: e.target.value}))}></input>
                </div>
                <div style={divMargin}>
                    <label style={labelMargin}>password</label>
                    <input onChange={(e => setInputValue({...inputValue, password: e.target.value}))}></input>
                </div>
                <div>
                    <Link to="/">
                        <button onClick={() => confirmHandler(inputValue)}>Create</button>
                    </Link>
                </div>
                
            </div>
            
        </div>
    )
}