const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config(); // load env vars from .env file

// data schema & model
const PalindromeSchema = new mongoose.Schema({
    palindrome: {
        type: String,
    }
});
const Palindrome = mongoose.model("Palindrome", PalindromeSchema);


const app = express();

// middleware to parse incoming JSON data in request body
app.use(express.json());

// cors middleware
app.use(cors());

// an example of middleware for logging requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request: ${req.url}`);
    next();
});

// connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI) // set as env var in vercel project settings
    .then(() => console.log("Db connect OK"));

// api routes  
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/json", (req, res) => {
    res.json({ msg: "copy that" });
});

// create
app.post("/palindrome", async (req, res) => {
    try {
        const newPal = new Palindrome({
            palindrome: req.body["word"],
            dateAdded: new Date(),
        });
        const pal = await Palindrome.create(newPal);
        res.status(200).json(pal);
    } catch (error) {
        res.status(500).json({ error: "Error creating pal record" });
    }
});

// read all 
app.get("/palindrome", async (req, res) => {
    try {
        const allPals = await Palindrome.find();
        res.status(200).json(allPals);
    } catch (error) {
        res.status(500).json({ error: "Error fetching pals" });
    }
});

// delete all
app.delete("/palindrome", async (req, res) => {
    try {
        const allPals = await Palindrome.deleteMany();
        res.status(200).json(allPals);
    } catch (error) {
        res.status(500).json({ error: "Error deleting pals" });
    }
});    


// start up server
app.listen(8000, () => {
    console.log(`Express server is up and listening on port 8000`);
});
