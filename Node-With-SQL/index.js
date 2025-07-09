const { faker, id_ID } = require('@faker-js/faker');
const mysql = require('mysql2');
const express=require('express');
const app=express();
const path=require("path");
const methodOverride= require("method-override")

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'college',
  password: 'Mayur#4212'
});

// let getRandomUser= ()=> {
//   return [
//    faker.string.uuid(),
//    faker.internet.username(), // before version 9.1.0, use userName()
//    faker.internet.email(),
//    faker.internet.password()
//   ];
// }

// // INSTERT INTO TABLE
// let q="INSERT INTO student(id,username,email,passsword) VALUES ?";
// let data=[]; 

// for(i=0;i<100;i++){
//   // console.log(getRandomUser())
//   data.push(getRandomUser()) 
// }


// try{
//   connection.query(q,[data],(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//   });
// }catch{
//     console.log(err);
// }
// connection.end();


//Show Count

app.get('/',(req,res)=>{
  let q=`SELECT count(*) FROM student`;
  try{
      connection.query(q,(err,result)=>{
        if(err) throw err;
        let count= result[0]["count(*)"];
        res.render("home.ejs",{ count })
      });
    }catch(err){
        console.log(err)
        res.send('Error in code!!'+err);
    }
    // connection.end();
})


// Show users
app.get('/user',(req,res)=>{
  let q=`SELECT * FROM student`;
  try{
      connection.query(q,(err,users)=>{
        if(err) throw err;
        res.render("user.ejs",{users})
      });
    }catch(err){
        console.log(err)
        res.send('Error in code!!'+err);
    }
});

// EDIT Route
app.get("/user/:id/edit",(req,res)=>{
  let {id}= req.params;
  let q=`SELECT * FROM student WHERE id='${id}'`;
  try{
      connection.query(q,(err,result)=>{
        if(err) throw err;
        let user=result[0];
        res.render("edit.ejs",{user})
      });
    }catch(err){
        console.log(err)
        res.send('Error in code!!'+err);
    }
});

// UPDATE DATABASE ROUTE
app.patch("/user/:id", (req,res)=>{
  let {id}= req.params;
  let {password: Formpass, username: Formuser} = req.body;
  // res.send(Formpass)
  let q=`SELECT * FROM student WHERE id='${id}'`;
  try{
      connection.query(q,(err,result)=>{
        if(err) throw err;
        let user=result[0];
        if(Formpass!=user.passsword){
          res.send("Wrong Password!");
        }else{
          let q2=`UPDATE student SET username='${Formuser}' WHERE id='${id}'`
          connection.query(q2,(err,result)=>{
            if(err) throw err
            res.redirect("/user")
          });
        }});
    }catch(err){
        console.log(err)
        res.send('Error in code!!'+err);
    }
  });

// Delete page route
app.get("/user/:id/delete",(req,res)=>{
  let {id} = req.params;
  let q=`SELECT * FROM student WHERE id='${id}'`;
  try{
      connection.query(q,(err,result)=>{
        if(err) throw err;
        let user=result[0];
        res.render("delete.ejs",{user})
      });
    }catch(err){
        console.log(err)
        res.send('Error in code!!'+err);
    }
})

// Delete from DB
app.delete("/user/:id",(req,res)=>{
  let {id}=req.params;
  let q1=`SELECT * FROM student WHERE id='${id}'`
  let q=`DELETE FROM student WHERE id='${id}'`
  let { email : Femail,password: Fpass}=req.body;
  try{
    connection.query(q1,(err,result)=>{
      if(result[0].email!=Femail || result[0].passsword!=Fpass){
        res.send("Wrong Details!!")
      }else{
        connection.query(q,(err,result)=>{
        if(err) throw err
        res.redirect('/user')
       })
      }
    })
  }catch(err){
    res.send("Error :"+err)
  }
});


//ADD USER ROUTE
app.get("/user/new",(req,res)=>{
  res.render("new.ejs");
})



// ADD new USER to DATABASE
app.post("/user",(req,res)=>{
  let {id,username,email,password}=req.body;
  let q=`INSERT INTO student (id,username,email,passsword) values('${id}','${username}','${email}','${password}');`
  try{
      connection.query(q,(err,result)=>{
      if(err) throw err
      res.redirect("/");
    })
  }catch(err){
    res.send(err)
  }
})

app.listen('8080',()=>{
 console.log('Port is Listening...'); 
});