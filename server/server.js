const express = require("express");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
require('dotenv').config();
require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
const AllMyPromptRoutes = require("./routes/prompt.routes");
AllMyPromptRoutes(app);
app.listen(8000, () => console.log("The server is all fired up on port 8000"));