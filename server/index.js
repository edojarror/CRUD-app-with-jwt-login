import express, { urlencoded } from 'express';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

const port = process.env.PORT || 4000;

const secretkey = "232024207311721213330502132153053723351410208082611";
const {sign, verify} = jwt

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "896704",
    database: "userdata"
})

const getFunction = async () => {
    try {
        console.log("get funtion run ...")
        const [result, field]= await connection.query("SELECT * FROM userdata") 
            return result
    } catch (err) {
        console.log("errror : ", err)
    }
}

const postFunction = async (username, password) => {
    try {
        const [result, field] = await connection.query(`INSERT INTO userdata(username, password) VALUES('${username}','${password}')`)
        console.log("create user -> ", `username : '${username}', password : '${password}'`)
    } catch (err) {
        console.log("error : ",err)
    }
}

const deleteFunction = async (user_id) => {
    try {
        const [result, field] = await connection.query(`DELETE FROM userdata WHERE user_id= ${user_id}`);
        console.log("delete function")
    } catch (error) {
        console.log(error)
    }
}

const editFunction = async (userdata) => {
    const {user_id, username, password} = userdata;
    try {
        const [result, field] = await connection.query(`UPDATE userdata SET username='${username}', password='${password}' WHERE user_id=${user_id}`);
        console.log("edited function");
    } catch (error) {
        console.log("error : ",error)
    }
}



const targetedIdFunction = async (id) => {
    let userid = Number(id)
    try {
        const [result, field] = await connection.query('SELECT * FROM `userdata` WHERE user_id=' + connection.escape(userid))
        return result
    } catch (err) {
        console.log(err)
    }
}

const createToken = (userdata) => {
    const { username , password } = userdata;
    let timeLimit = 60;
    console.log("login handler token data = ", userdata);
    console.log("username : ", username, "password : ", password)
    // console.log("expire dates : ", Math.floor(Date.now()))
    let payload = {
        exp: Math.floor(Date.now()/1000 + timeLimit),
        username: username,
        password: password
    }
    return sign(payload, secretkey)
}

// verify user credential when login

const verifyUsernamePassword = async (username, password) => {
    console.log("crosscheck user data with data on database");
    try {
        const [result, field] = await connection.query(`SELECT * FROM userdata WHERE EXISTS (SELECT username, password WHERE username= "${username}" AND password= "${password}")`);
       return result[0] || result.length > 0 ? true : false
    } catch (error) {
        console.log(error)
    }
}

// check if username already exist on server
const isUsernameExisted = async (username) => {
    console.log("check if username already exist")
    try {
        const [result, field] = await connection.query(`SELECT * FROM userdata WHERE EXISTS (SELECT username WHERE username= "${username}")`);
        console.log("check username existance = ", result, "result length = ", result.length)
        // if array empty then return false (user not exist), while array not empty then user was existed
        return result[0] || result.length > 0 ? true : false
    } catch (error) {
        console.log("error : ", error)
    }
}

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// create new data

app.post('/create', async (req, res) => {
    console.log("create this user and pass : ", req.body)
    await postFunction(req.body.username, req.body.password)
    res.send(console.log("post completed !!"));
})

// delete targeted user data

app.delete('/delete', async (req, res) => {
    console.log("client id = ", req.body.user_id)
    await deleteFunction(req.body.user_id);
    console.log("delete")
    res.send(await getFunction());
    console.log("get method running ...")
})

// edit targeted user data

app.put('/edit',express.json(), async (req, res) => {
    await editFunction(req.body)
    console.log("edit method")
    res.send("edit complete")
})

// get all data

app.get('/',  async (req, res) => {
    console.log("GET method triggered")
    console.log( await getFunction())
    res.send(await getFunction()) 
})

// get specific user
app.get('/:id', async (req, res) => {
    console.log("get targeted user data ... ")
    res.send(await targetedIdFunction(req.params.id))

})

app.post('/login', async (req, res) => {
    console.log("login method value = ", req.body)
    await verifyUsernamePassword(req.body.username, req.body.password) ? res.status(201).send(createToken(req.body)): res.status(401).send("send error message")
})

// verify token

app.post('/verify', async (req, res) => {
    console.log("verify running ...")
    console.log("body value = ", req.body);
    let token = Object.values(req.body).toString()
    if (token !== undefined) {
       try { 
        // verify(token, secretkey)
        res.status(200).send(verify(token, secretkey))
        } catch (err) {
            console.log(err, "token expired")
            res.status(401).send(err)
        }
    }
    
})

// signup
app.post('/signup', async (req, res) => {
    // check if username already existed on database (using client user data)
    // if true then return error to client-side with string (username already existed)
    // if false then do html post at database, post client user data (username, password) into database  
    
    try {

        if(await isUsernameExisted(req.body.username)) {
            console.log("username already existed at database")
            res.status(401).send("username existed") 
        } else {
            await postFunction(req.body.username, req.body.password);
            console.log("username succesfully created")
            res.status(201).send("signup successful")
        }
        console.log(req.body);
        console.log("client try to signup a userdata");

    } catch (err) {
        console.log(err)
    }
    
})

app.listen(port, () => console.log("app running at port 4000", ))
