import { useState } from "react";
import { useNavigate } from "react-router";

export function LoginPage () {
    const [inputValue, setInputValue] = useState({username: "", password: ""});

    let navigate = useNavigate()
    const loginHandler = (inputvalue) => {
        let {username, password} = inputvalue
        console.log(inputvalue);
        fetch('http://localhost:4000/login', {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => res.text())
        .then(token => {
            console.log(token)
            localStorage.setItem("token",token)
            })
        .then(token => navigate('/'))
        .catch(error => console.log(error))
    }

    return (
        <div>
           <div>Login Page</div>
            <div>
                <label>Username</label>
                <input value={inputValue.username} onChange={(e) => setInputValue({...inputValue, username: e.target.value})}></input>
            </div>
            <div>
                <label>Password</label>
                <input value={inputValue.password} onChange={(e) => setInputValue({...inputValue, password: e.target.value})}></input>
            </div>
            <div>
                <button onClick={() => loginHandler(inputValue)}>Login</button>
            </div>
            <div>
                <button>Signup</button>
            </div>
        </div>
    )
}