
// get all data from database 
export const readHandler = (setstate) => {
    fetch("http://localhost:4000/").then(res => res.json()).then(data => setstate(data)).then(text => console.log("from button handler method")).catch(err => console.log(err))
}

// delete targeted data from database
export const deleteHandler = async (user_id, setdata) => {
  await fetch("http://localhost:4000/delete", 
  {
    method: "DELETE",
    body: JSON.stringify({user_id: user_id}), 
    headers: {
      "Content-Type": "application/json", }
  })
  .then(res => res.json())
  .then(data => setdata(data))
  .catch(err => console.log(err))}

  // do login attempt into server to gain access to home page
 export const loginHandler = (inputvalue, navigate) => {
    let {username, password} = inputvalue
    console.log(inputvalue);
    fetch('http://localhost:4000/login', {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => {
        if(res.status === 401) return Promise.reject('invalid username or password');
        return res.text()
    })
    .then(token => {
        console.log("token = ",token)
        localStorage.setItem("token",token)
        })
    .then(token => navigate('/'))
    .catch(error => console.log(error, "login gagal"))
}

// create user

// signup user

export const SignupHandler = async (userdata, navigate ) => {
    console.log("signup handler invoked ... ", "userdata = ", userdata )
    try {
        await fetch('http://localhost:4000/signup', {
            method: "POST",
            body: JSON.stringify(userdata),
            headers: {
                "Content-Type": "application/json"
            } 
        })
        .then(res => {
            

            if(res.status === 401) {
                alert("failed to signup, username already exist");
            } else if (res.status === 201) {
                console.log("signup success");
                alert("signup success, now redirecting to login page...")
                navigate("/login_page")
            }
            
            return res.text()
        })
        .then(res => {
            console.log(res)
        })
    } catch (err) {
        console.log(err)
    }
}

export const RedirectingToPage =  (path, navigate) =>  {
    navigate(path)
}