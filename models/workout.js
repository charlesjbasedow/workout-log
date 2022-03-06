import mongoose from 'mongoose'

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    min: 1,
    max: 1440
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"
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
  calsburned: {
    type: Number,
  },
})

const Workout = mongoose.model('Workout', workoutSchema)

export {
  Workout
}