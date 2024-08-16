const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser= require('body-parser');
const bcrypt = require('bcrypt');
const { format } = require('date-fns');

const app = express();
app.use(cors());

app.options('*', cors());


const port = 8083 || process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createPool({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USERNAME,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_DBNAME,
//     waitForConnections:true,
//     connectionLimit:10,
//     queueLimit:0
// })

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sidi-abdelrahman',
});



app.get('/',(re,res)=> {
    return res.json("From BAckend Side");
});

// login employee
app.post("/loginemp", (req, res) => {
  const sql = "SELECT * FROM employees WHERE `username` = ? and password = ?";
  const values = [req.body.name, req.body.password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error during database query:', err);
      return res.json({ Message: "Error inside server" });
    }

    if (result.length > 0) {
      if (result[0].password === req.body.password) {
        return res.json({ Message: "Logged in successfully" });
      } else {
        return res.json({ Message: "Wrong password" });
      }
    } else {
      return res.json({ Message: "User not found" });
    }
  });
});
 





// signup
app.post('/signup', (req, res) => {
    const checkIfExistsQuery = "SELECT * FROM login WHERE username = ?";
    
    db.query(checkIfExistsQuery, [req.body.username], (err, result) => {
      if (err) {
        return res.json({ Message: "Error in Node" });
      }
  
      if (result.length > 0) {
        return res.json({ Message: "User already exists" });
      } else {
        const password = req.body.password;
        bcrypt.hash(password.toString(), 10, (hashErr, hash) => {
          if (hashErr) {
            return res.json({ Message: "Error hashing password" });
          }
  
          const sql = "INSERT INTO login (`username`,`password`) VALUES (?, ?)";
          const values = [
            req.body.username,
            hash,
          ];
  
          db.query(sql, values, (insertErr, result) => {
            if (insertErr) {
              return res.json({ Message: "Error in Node" });
            }
            return res.json(result);
          });
        });
      }
    });
  });







// login
app.post("/loginDoctor", (req, res) => {
  const username =req.body.username;
  const password = req.body.password;

  const sql = "SELECT * FROM login WHERE `username` = ?";
  db.query(sql, [username], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (err) {
          return res.json({ Message: "Error comparing passwords" });
        }
        if (response) {
          return res.json({ Message: "Logged in successfully" });
        } else {
          return res.json({ Message: "Wrong password" });
        }
      });
    } else {
      return res.json({ Message: "User not found" });
    }
  });
});
















app.post('/test', (req, res) => {
  const { name, price, report, date } = req.body;

  console.log('Received date:', date);  // Debugging line

  const dateObj = new Date(date);
  if (isNaN(dateObj)) {
    return res.status(400).json({ message: 'Invalid date provided.', receivedDate: date });
  }

  const formattedDate = format(dateObj, 'yyyy-MM-dd HH:mm:ss');

  const sql = "INSERT INTO `sidi-abdelrahman` (name, price, text, date) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, price, report, formattedDate], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting data', error: err.message });
    }
    res.json({ message: 'Data received and inserted successfully' });
  });
});



app.get('/services',(req,res)=>{
  const sql = "SELECT *  FROM `sidi-abdelrahman`";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})
app.delete("/removetest/:id",(req,res)=>{
  const id  = req.params.id;
  const sql = "DELETE FROM reporting WHERE id = ?"
 
  db.query(sql,[id],(err,data)=>{
      if(err) return res.json({Message :"error in Node"})
      return res.json(data );
  })
})

  

app.listen(port,()=>{
    console.log("Server is running on port 8083");
})
