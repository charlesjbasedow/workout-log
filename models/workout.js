import mongoose from 'mongoose'

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  date: {
    type: Date
  },
  duration: {
    type: Number,
    min: 1,
    max: 1440
  },
  method: {
    type: String,
    enum: ['Cycling', 'Running', 'Swimming', 'Walking', 'Weight-Lifting', 'Other'],
    required: true
  },
  avgHr: {
    type: Number,
    min: 1,
    max: 200
  },
  calsBurned: {
    type: Number
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"
  },
})

const Workout = mongoose.model('Workout', workoutSchema)

export {
  Workout
}