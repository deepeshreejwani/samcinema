const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const {
    ContactsOutlined
} = require('@material-ui/icons');
app.set('secretKey', 'nodeMovieApp');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movieapp"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
    con.query("CREATE TABLE users(id int not null auto_increment,firstName varchar(255) not null,lastName varchar(255) not null,email varchar(255) not null,password varchar(255) not null,bookedTickets int(11) default 0,PRIMARY KEY (id))", function(err, result) {
        console.log("User Table created");
    });
    con.query("CREATE TABLE tickets(id int not null auto_increment,userId int(11) not null,moviename varchar(255) not null,theatreId int(11) not null,slotId int(11) not null,seatNo varchar(255) not null,PRIMARY KEY (id),FOREIGN KEY (userId) REFERENCES users(id))", function(err, result) {
        console.log("User Table created");
    });
});
app.listen(3001, (err) => {
    if (err) console.log(err);
    console.log("Listening to Server 3001")
});
app.post("/register", (req, res) => {
            let user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, saltRounds)
            };
            console.log(user);
            con.connect(function(err) {
                con.query("SELECT * FROM users WHERE email=?", [user.email], function(err, result) {
                    if (err)
                        res.send({
                            status: 400,
                            message: "Error"
                        });
                    else if (result.length > 0 && bcrypt.compareSync(req.body.password, result[0].password)) {
                        res.send({
                            status: 202,
                            message: "Already Registered"
                        });
                    } else {
                        con.query("INSERT INTO users(firstName,lastName,email,password) VALUES(?,?,?,?)", [user.firstName, user.lastName, user.email, user.password], function(err, result) {
                            if (err)
                                res.send({
                                    status: 400,
                                    message: "Error"
                                });
                            if (result) {
                                res.send({
                                    status: 200,
                                    message: "SuccesFully Signed Up"
                                });
                            } else {
                                res.send({
                                    status: 201,
                                    message: "Error"
                                });
                            }
                        });
                    }
                });
            });
        });
            app.post("/login", (req, res) => {
                let user = {
                    email: req.body.email,
                    password: req.body.password
                };
                con.connect(function(err) {
                    con.query("SELECT * FROM users WHERE email=?", [user.email], function(err, result) {
                        if (err)
                            res.send({
                                status: 400,
                                message: "Error"
                            });
                        if (result.length > 0 && bcrypt.compareSync(user.password, result[0].password)) {
                            const token = jwt.sign({
                                id: result[0].id
                            }, req.app.get('secretKey'), {
                                expiresIn: '1h'
                            });
                            res.send({
                                status: 200,
                                message: "Welcome To The Portal",
                                data: {
                                    userId: result[0].id,
                                    token: token
                                }
                            });
                        } else {
                            res.send({
                                status: 201,
                                message: "Wrong Combination of Email & Password"
                            });
                        }

                    });
                });
            });

            app.post("/gethall", (req, res) => {
                let info = {
                    movie: req.body.movie,
                    theatre: req.body.theatre,
                    slot: req.body.slot
                };
                console.log(info);
                con.connect(function(err) {
                    con.query("SELECT seatNo FROM tickets WHERE moviename=? AND theatreId=? AND slotId=?", [info.movie, info.theatre, info.slot], function(err, result) {
                        console.log(result);
                        res.send(result);
                    });
                });
            });

            app.post("/mybookings", (req, res) => {
                let info = {
                    userId: req.body.userId
                };
                con.connect(function(err) {
                    con.query("SELECT * FROM tickets WHERE userId=?", [info.userId], function(err, result) {
                        res.send(result);
                    });
                });
            });

            app.post("/dobookings", (req, res) => {
                let info = {
                    userId: req.body.userId,
                    moviename: req.body.movie,
                    theatreId: req.body.theatre,
                    slotId: req.body.slot,
                    seatNo: req.body.seatNo
                };
                con.connect(function(err) {
                    con.query("INSERT INTO tickets (userId,moviename,theatreId,slotId,seatNo) VALUES(?,?,?,?,?)", [info.userId, info.moviename, info.theatreId, info.slotId, info.seatNo], function(err, result) {
                        con.query("UPDATE users SET bookedTickets=bookedTickets+1 WHERE id=?" [info.userId], function(err, result) {});
                        res.send(result);
                    });
                });
            });

            app.post("/cancelbooking", (req, res) => {
                let info = {
                    userId: req.body.userId,
                    moviename: req.body.movie,
                    theatreId: req.body.theatre,
                    slotId: req.body.slot
                };
                console.log(info);
                con.connect(function(err) {
                    con.query("DELETE from tickets WHERE userId=? AND moviename=? AND theatreId=? AND slotId=?", [info.userId, info.moviename, info.theatreId, info.slotId], function(err, result) {
                        con.query("UPDATE users SET bookedTickets=bookedTickets-1 WHERE id=?" [info.userId], function(err, result) {});
                        res.send(result);
                    });
                });
            });