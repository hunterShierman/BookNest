// Requiring module
const express = require('express');
require('dotenv').config();

const path = require('path');
const fs = require("fs");
var mysql = require('mysql2');
const helmet = require('helmet');


// connect the database server to the backend server
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true,
    }
    });


// Creating express object
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// set up ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middle ware to proccess json
app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// enable CORS configuration
const cors = require('cors');
app.use(cors());

// middleware for saftey
app.use(helmet());



// Handling GET request
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, "public", "index.html"));
}) 

// Handling GET request
app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, "public", "index.html"));
}) 

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "contact.html"));
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

// end point to handle azure health check requests - idk why they send these so often lol
app.get('/admin/host/ping', (req, res) => {
    // Logic to check the health status
    const healthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString()
    };
    res.json(healthStatus);
});

// end point to check status 
app.get('/admin/host/status', (req, res) => {
    const healthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString()
    };
    res.json(healthStatus);
});

// get request - dynamically created book page
app.get("/bookpage", (req, res) => {

    const title = req.query.title;
    const genre = req.query.genre;
    const author = req.query.author;
    const date = req.query.date;
    const isbn = req.query.isbn;
    const path = req.query.path;
    const desc = req.query.desc;

    console.log(title, genre, author, date, path, desc);
    
    res.render("bookpage", { title, genre, author, date, isbn, path, desc});


})

// get info from database
app.get("/buttons", (req, res) => {

    con.query("SELECT * FROM Inventory", function (err, result, fields) {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
    
        console.log(result);
        res.json(result);

    });

})

// search by title
app.get("/buttons/search/title", (req, res) => {

    let title = req.query.name;
    console.log("the title is", title);

    let sql = "SELECT * FROM Inventory WHERE Title = ?";
    con.query(sql, [title], function(err, result, fields) {

        if (err) throw err;
        console.log("searching all book that match title");
        res.json(result);

    })
    
})

// search by genre
app.get("/buttons/search/genre", (req, res) => {

    let genre = req.query.name;
    console.log(genre);

    let sql = "SELECT * FROM Inventory WHERE Genre = ?";
    con.query(sql, [genre], function(err, result, fields) {

        if (err) throw err;
        console.log("searching all books with matching genre");
        res.json(result);

    })

})

// search by date
app.get("/buttons/search/date", (req, res) => {

    let date = req.query.name;
    console.log(date);

    let sql = `SELECT * FROM Inventory WHERE Date = ?`;
    con.query(sql, [date], function(err, result, fields) {

        if (err) throw err;
        console.log("searching all books with matching date");
        res.json(result);

    })

})

// search by author
app.get("/buttons/search/author", (req, res) => {

    let author = req.query.name;
    let sql = `SELECT * FROM INVENTORY WHERE Author =?`;

    con.query(sql, [author], function(err, result, fields) {
        if (err) throw err;
        console.log("searching for all matching authors");
        res.json(result);

    })

})

// search by isbn
app.get("/buttons/search/isbn", (req, res) => {

    let isbn = req.query.name;
    let sql = `SELECT * FROM Inventory WHERE ISBN = ?`;
    con.query(sql, [isbn], function(err, result, fields) {
        
        if (err) throw err;
        console.log("searching for all matching ISBN's");
        res.json(result);

    })

})

// insert into database
app.post("/buttons", (req, res) => {

    console.log(req.body);
    let entryId = req.body["EntryId"];
    let title = req.body["Title"];
    let genre = req.body["Genre"];
    let date = req.body["Date"];
    let isbn = req.body["ISBN"];

    console.log(date);

    let sql = "INSERT INTO Inventory (Title, Genre, Date, ISBN) VALUES (?, ?, ?, ?)";
    con.query(sql, [title, genre, date, isbn], function (err, result, fields) {
        if (err) throw err;
        console.log("1 record inserted");

    })
    
})

// replace info in the database
app.put("/buttons", (req, res) => {

    console.log(req.body);
    let title = req.body["Title"];
    let genre = req.body["Genre"];
    let date = req.body["Date"];
    let isbn = req.body["ISBN"];
    let entryId = req.body["EntryId"]

    console.log(isbn);

    if (err) throw err;
    console.log("shitter");

    let sql = "UPDATE Inventory SET Title = ?, Genre = ?, Date = ?, ISBN = ? WHERE EntryId = ?";
    con.query(sql, [title, genre, date, isbn, entryId], function (err, result, fields) {
        if (err) throw err;
        console.log("1 record edited");

    })
    
})

// delete info in the database
app.delete("/buttons", (req, res) => {

    console.log("back end got the request");

    let id = req.body["id"];

    if (!id) {
        return res.status(400).send("ID is required to delete the record.");
    }

    console.log("shitter");

    let sql = "DELETE FROM Inventory WHERE EntryId = ?";
    con.query(sql, [id], function (err, result, fields) {
        if (err) throw err;
        console.log("1 record removed");

    })

})


// Port Number
const PORT = process.env.PORT ||5001;

// Server Setup
app.listen(PORT,console.log(`Server started on port ${PORT}`));