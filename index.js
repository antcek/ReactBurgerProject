const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

let users = [];
const secret = "secret_key";

// Load the users from the JSON file
if (fs.existsSync("users.json")) {
  const data = fs.readFileSync("users.json");
  users = JSON.parse(data);
}

// Route for registering a new user
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(403).send({
      "success": false,
      "message": "User already exists"
    });
  }

  // Add the new user to the array
  users.push({ email, password });

  // Save the array to a JSON file
  fs.writeFileSync("users.json", JSON.stringify(users));

  // Generate a JWT access token
  const accessToken = jwt.sign({ email }, secret, { expiresIn: "1h" });

  // Generate a JWT refresh token
  const refreshToken = jwt.sign({ email }, secret, { expiresIn: "24h" });

  return res.send({
    success: true,
    user: {
      email, name, password
    },
    accessToken,
    refreshToken
  });
});

// Route for logging in
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const existingUser = users.find((user) => user.email === email);
  if (!existingUser || existingUser.password !== password) {
    return res.status(401).send({
      "success": false,
      "message": "email or password are incorrect"
    });
  }

  // Generate a JWT access token
  const accessToken = jwt.sign({ email }, secret, { expiresIn: "1h" });

  // Generate a JWT refresh token
  const refreshToken = jwt.sign({ email }, secret, { expiresIn: "24h" });

  return res.send({
    success: true,
    accessToken,
    refreshToken,
    user: existingUser
  });

});

// Route for logging out
app.post("/logout", (req, res) => {
  return res.send({
    "success": true,
    "message": "Successful logout"
  });
});

// Route for refreshing the access token
app.post("/refresh", (req, res) => {
  const { token } = req.body;

  try {
    // Verify the JWT refresh token
    const decoded = jwt.verify(token, secret);

    // Generate a new JWT access token
    const accessToken = jwt.sign({ email: decoded.email }, secret, {
      expiresIn: "1h",
    });

    return res.send({ success: true, accessToken, refreshToken: token });
  } catch (err) {
    return res.status(400).send("Invalid token");
  }
});

// Route for getting the user information (protected)
app.get("/user", (req, res) => {
  const accessToken = req.header("Authorization").replace("Bearer ", "");

  try {
    // Verify the JWT access token
    const decoded = jwt.verify(accessToken, secret);

    const user = users.find((user) => user.email === decoded.email);

    return res.send({ user });
  } catch (err) {
    return res.status(401).send({
      "success": false,
      "message": "Token is invalid"
    });
  }
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));