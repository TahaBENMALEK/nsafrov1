var http = require('http');
var dt = require('../bond');

// first module:
exports.myDateTime = function() {
    return Date();
};



// Create the server and save the instance to a variable
const server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("The date and time are currently: " + dt.myDateTime());
    res.end();
});

// Handle errors
server.on('error', (err) => {
    console.error('Server encountered an error:', err);
});

// Start the server
server.listen(8080, () => {
    console.log('Server is running on port 8080');
});


//demo_http_url.js:
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(req.url);
    res.end();
}).listen(8080);

//demo_querystring in demo.js
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt =  q.month+" " + q.year ;
  res.end(txt);
}).listen(8000);

//Node.js file that reads the HTML file
var http = require('http')
var fs = require('fs')

http.createServer(function(req,res){
    fs.readFile('form.html',function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);

//create/update a file in your desktop with node.js:
var fs = require('fs')
fs.appendFile('007.html', '<h1>salam cocouuu</h1>', function(err){
    if (err) throw err
    console.log('updated!');
}); //you can replace appendFile with writeFile or open (don't forget .fs)

fs.unlink('mynewfile2.txt', function (err) { //to delete something
    if (err) throw err;
    console.log('File deleted!');
  });

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) { //to rename a file.
    if (err) throw err;
    console.log('File Renamed!');
  });

//Create a Node.js file that opens the requested file and returns the content to the client. If anything goes wrong, throw a 404 error:

var http = require('http');
var url=require('url');
var fs=require('fs');
http.createServer(function(req, res){
    var q= url.parse(req.url, true)
    var filename= "." + q.pathname
    fs.readFile(filename, function(err, data){
        if (err) {
            res.writeHead(404, {'Conteent-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);

//a module application example (lower to upper case letters):
//don't forget to download the npm module before you use it!
var http=require('http');
var uc=require('upper-case')
http.createServer(function(requ, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(uc,uppercase("Hello Taha!"));
    res.end();
}).listen(8080);

//events executin example:
//In the example below we have created a function that will be executed when a "scream" event is fired. To fire an event, use the emit() method.
var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}

//Assign the event handler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');

//with formidable module the user can upload files to your computer:
//let's create a Node.js file that writes an HTML form, with an upload field:

var http=require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/data-form">');
    res.write('<input type="file" name="fileupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
}).listen(8080);



//When the file is uploaded and parsed, it gets placed on a temporary folder on your computer.
var http=require('http');
var formidable=require('formidable');
http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        res.write('File uploaded');
        res.end();
      });
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write('</form>');
      return res.end();
    }
  }).listen(8080);

//To move the file to the folder of your choice, use the File System module, and rename the file:

var http =require('http');
var formidable=require('formidable');
var fs=require('fs');

http.createServer(function(req,res){
    if (req.url=='/fileupload'){
        var form=new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            var oldpath=files.filetoupload.filepath;
            const path = require('path');
            var newpath = path.join('C:', 'Users', 'info', '3D Objects', 'nsafrov1', files.filetoupload.originalFilename);
            fs.rename(oldpath, newpath, function(err){
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
            res.write('<input type="file" name="filetoupload"><br>');
            res.write('<input type="submit">');
            res.write('</form>');
            return res.end();
        }
}).listen(8080);

//Send an Email using node.Js
var nodemailer=require('nodemailer');
var transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'callisthenicsparadise@gmail.com',
        pass: 'paradisecallisthenics123?!'
    }
});

var mailOptions={
    from: 'callisthenicsparadise@gmail.com',
    to: 'benmalektaha@gmail.com',
    //Send email to more than one address:
    //to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
    subject: 'test by Node.js',
    text: 'Champ!'
    //Send email containing HTML:
    //html: '<h1>Welcome</h1><p>That was easy!</p>' (comme in the end of the line before this)
};
transporter.sendMail(mailOptions, function(error,info){
    if (error){
        console.log(error)
    } else {
        console.log('Email sent: ' +info.response)
    }
});

//creating a connection to the database.
var mysql= require('mysql');

var con=mysql.createConnection({
    host:"localhost",
    user: "Taha",
    password:"taha123TAHA?!"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
});

//Query a database: Use SQL statements to read from (or write to) a MySQL database. This is also called "to query" the database.

//in this example we will see how: The query method takes an sql statements as a parameter and returns the result.
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });


//let's create database called mydb with node.js:
var mysql=require('mysql')

var con=mysql.createConnection({
    host:"",
    user:"",
    password:""
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected :)");
    con.query("CREATE DATABASE mydb", function(err, result){
        if (err) throw err;
        console.log("Database created");
    });
});

//Create a table named "customers":
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "myusername",
  password: "mypassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

//create table with a Primary Key on database:
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

//Create primary key on an existing table:

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table altered");
  });
});