const express = require("express");
const mongoose = require("mongoose");
const db = require("./models")
const logger = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exerciseDB", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// HTML routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
})

// API routes
app.get("/api/workouts", (req, res) => {
    db.Exercise.find({})
        .then(data => {
            res.json(data)
        })
})

app.get("/api/workouts/range", (req, res) => {
    db.Exercise.find({})
        .then(data => {
            res.json(data)
        })
})
let totalDur = 0;
app.post("/api/workouts", (req, res) => {
    // console.log(req)
    // let infoComingIn = req.body;
    // console.log(infoComingIn);
    totalDur = 0;
    db.Exercise.create({})
     .then(newWorkout => {
         res.json(newWorkout)
     })
})

app.put("/api/workouts/:id", (req, res) => {
    let id = req.params.id
    let data = req.body
    totalDur += data.duration;
    db.Exercise.update({_id: id}, {
        $push: {exercises: data},
        totalDuration: totalDur
    }).then(updated => {
        res.send(updated)
    })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

