const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });
  
// simple route
app.get("/", (req, res) => {
  // Define the table content as an array of objects
  const endpoints = [
    {
      Method: "POST",
      Urls: "/api/auth/signup",
      Actions: "Signup new account"
    },
    {
      Method: "POST",
      Urls: "/api/auth/signin",
      Actions: "Login an account"
    },
    {
      Method: "GET",
      Urls: "/api/test/all",
      Actions: "Retrieve public content"
    },
    {
      Method: "GET",
      Urls: "/api/test/user",
      Actions: "Access User's content"
    },
    {
      Method: "GET",
      Urls: "/api/test/mod",
      Actions: "Access Moderator's content"
    },
    {
      Method: "GET",
      Urls: "/api/test/admin",
      Actions: "Access Admin’s content"
    }
  ];

  // Generate the HTML table
  let tableHtml = "<table>";
  tableHtml += "<tr><th>Method</th><th>URLs</th><th>Actions</th></tr>";

  for (const endpoint of endpoints) {
    tableHtml += `<tr><td>${endpoint.Method}</td><td>${endpoint.Urls}</td><td>${endpoint.Actions}</td></tr>`;
  }

  tableHtml += "</table>";

  res.send(tableHtml);
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests       
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port there are the end points ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
    
    
  });

  Role.create({
    id: 4,
    name: "superuerss"
    
    
  });
}