import mongoose from 'mongoose'

const Schema = mongoose.Schema

const caffSchema = new Schema({
  consumed: {
    type: String,
    enum: ['Yes'],
    required: true
  },
  caffType: {
    type: String,
    enum: ['Coffee', 'Energy Drink', 'PreWorkout', 'Other'],
    required: true
  },
  caffAmount: {
    type: Number,
    min: 1,
    max: 999,
    required: true
  }
})

const workoutSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    min: 1,
    max: 1440,
    required: true
  },
  method: {
    type: String,
    enum: ['Cycling', 'Running', 'Swimming', 'Walking', 'Weight-Lifting', 'Other'],
    required: true
  },
  avgHr: {
    type: Number,
    min: 1,
    max: 200,
    required: true
  },
  calsBurned: {
    type: Number,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"
  },
  caffeine: [caffSchema]
})

const Workout = mongoose.model('Workout', workoutSchema)

export {
  Workout
}