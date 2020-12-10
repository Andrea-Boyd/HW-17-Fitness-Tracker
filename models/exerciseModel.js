const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  exerciseName: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  exerciseType: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer."]
  },

  weight: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },

  sets: {
    type: Date,
    default: Date.now
  },

  reps: {

  },

  duration: {

  },

  cardio:{
    
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;