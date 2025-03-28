import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LandingPage from "./LandingPage";
import App from "../App";

export default function MainMenuPage () {
    const [isAuthorized, setAuthorized] = useState(null);
    let navigate = useNavigate()
    useEffect(() => {
        // check localstorage when running
        console.log("dont have token ? ", !localStorage.getItem("token") || localStorage.getItem("token") === null)

        // condition a)

        if(!localStorage.getItem("token") || localStorage.getItem("token") === null) {
            setAuthorized(false);
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
                    alert("access denied");
                    navigate('/login_page')
                } else if (res.ok) {
                    alert("access to main menu page granted")
                }

            })
            .catch(err => {
                console.log(err);
                setAuthorized(false)
            })
            // .then(data => setAuthorized(true))
        }
        
        // fetch('http//:4000/main_menu', {
        //     method: "POST",
        //     body: {token: localStorage.getItem}
        // })
    }, [])
    return (
        <div>
            {
                isAuthorized ? (<App />) : (<LandingPage />)
            }
        </div>
    )
}