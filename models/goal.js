import mongoose from 'mongoose'

const Schema = mongoose.Schema

const goalSchema = newSchema ({
  age: {
    type: Number,
    min:1,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    min: 1,
    required: true
  },
  goal: {
    type: String,
    enum: ['Gain Weight', 'Lose Weight', 'Maintain Weight'],
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"
  },
})

const Goal = mongoose.model('Goal', goalSchema)

export {
  goal
}