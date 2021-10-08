
//Robertha Alvarez
//Lab 05
//101236645

//npm init
//npm install express
//npm install nodemon

const express = require('express')
const app = express()

const router = express.Router()
const fs = require("fs")
const path = require("path")

let jsoninfo= fs.readFileSync(path.resolve(__dirname, "user.json"))
//above we use fs.readFile() method so we can can read a file in a asynchronous way
let userData= JSON.parse(jsoninfo) //the data becomes a JavaScript object.



/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

router.get("/home", (req, res) => {
  res.sendFile("home.html", { root: __dirname });
});




/*
- Return all details from user.json file to client as JSON format
*/

router.get('/profile', (req,res) =>
{
  res.json(userData);
});





/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If password is invalid then send response as below
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) =>
{
  //reading pass and user
  let user = req.query.username;
  let pass= req.query.password;

  let jsondata = fs.readFileSync(path.resolve(__dirname, "user.json"))
  let parseddata= JSON.parse(jsondata)
  //above is read data from user json above and parse to obj js.

  let storeduser = parseddata.username;
  let storedpass = parseddata.password; //reading the storeduser and pass in json

  // Check if username and password match the one sent by client
  if (storeduser === user && storedpass === pass)
  {
    res.json({status: true, message: "User Is valid",});
  }

  else if (storeduser !== user)
  {
    res.json({status: false, message: "User Name is Invalid",});
  }

  else if (storedpass !== pass)
  {res.json({status: false, message: "Password is Invalid",
  });
  }

});






/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/

router.get("/logout/:username", (req, res) =>
{
  res.setHeader("Content-type", "text/html");
  res.send(`<b>${req.params.username} has successfully logged out!.<b>`);//showing that the prson has succesfuly logged out
});


app.use("/", router);
app.listen(process.env.port || 8089);


//running on port
console.log("The NodeJS server is running on port " + (process.env.port || 8089));
