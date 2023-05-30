const mysql=require("mysql");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const PORT = process.env.PORT || 3030;

const connection=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"varshith"
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

// app.listen(3050,function(req,res){
  // console.log("listening on port 3050");
// });

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var user_id=req.body.email;
  var user_password=req.body.password;

   if(user_id && user_password)
   {
    var query=`SELECT * FROM login where user_name="${user_id}"`;
     connection.query(query,function(error,result){
     if(result.length>0)
     {
       if(result[0].user_pass==user_password)
       {
          console.log(result);
          res.redirect("/welcome");
       }
       else
       {
         //console.log(user_password);
         //console.log(result[0].user_pass);
         res.send("Incorrect password");
       }
    }
    else
    {
      res.send("Incorrect Email address");
    }
    res.end();
  });
  }
  else
  {
      res.send("please enter email address and password");
      res.end();
  }
});

app.get("/welcome",function(req,res)
{
  res.sendFile(__dirname+"/welcome.html");
});

app.get("/logout",function(req,res) {
   res.redirect("/");
});
//EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ
//sn
