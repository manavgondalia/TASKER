const express = require("express");
const cors = require("cors");
const router = require("./routes/tasks-routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const password = "123";

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB.");
})

// middleware
app.use(cors());
app.use(express.json());
app.use("/tasks", router);


app.listen(port, () => {
    console.log(`Server up and running on ${port}`);
})