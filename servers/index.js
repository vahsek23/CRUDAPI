const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    connectionLimit : 100,
    host:"localhost",
    user:"root",
    password:"qwerty1234",
    database:"crud_contact",
    debug : false
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req,res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet , (error,result)=>{
        res.send(result);
    })
});

app.post("/api/post", (req,res)=>{
    const {name,email,contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)";
    db.query(sqlInsert,[name,email,contact],(error,result)=>{
        if(error){
            console.log(error);
        }
        if (contact.value !== req.body.contact) {
            res.send('Phone Number Invalid');
          }
        else {
            result = "Data inserted"; //Check wp msges
            res.send(result);
        }
    })
})
app.delete("/api/remove/:id", (req,res)=>{
    const id  = req.params.id;
    db.query('DELETE FROM contact_db WHERE id = ?' ,id,(error,result) =>{
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req,res)=>{
    const id = req.params.id;
    const sqlGet = "SELECT * FROM contact_db WHERE id =?";
    db.query('SELECT * FROM contact_db WHERE id =?' , id , (error,result)=>{
        if (error){
            console.log("123456");
            console.log(req);
            console.log(error);
        }
        res.send(result);
    })
});

app.put("/api/update/:id", (req,res)=>{
    const id = req.params.id;
    const {name,email,contact}=req.body ;
    const sqlUpdate = "UPDATE contact_db SET name = ?,email = ?,contact=? WHERE id = ?";
    db.query(sqlUpdate ,[name,email,contact,id] , (error,result)=>{
        if (error ){
            console.log(error);
        }
        if(contact.length!=10){
            error = "Enter valid mob no.";
            res.send(error);
        }
        res.send(result);
    })
});





// db.query("SELECT * FROM contact_db",(err, data) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });
// db.query("INSERT INTO contact_db (name,email,contact) VALUES ('amit','amit@gmail.com',12345)",(err, data) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });

// app.get("/",(req,res) => {
//     const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES ('amit','amit@gmail.com',12345)";
//     db.query(sqlInsert , (error,result)=>{
//         console.log("error", error);
//         console.log("result",result);
//         req.send("Hello express");
//     })
// })

app.listen(5000 , ()=>{
  console.log("Server running on 5000");
})