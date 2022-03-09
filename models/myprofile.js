import mongoose from 'mongoose'

const Schema = mongoose.Schema

const goalSchema = new Schema ({
  currentWeight: {
    type: Number,
    min: 1,
    required: true
  },
  goalWeight: {
    type: Number,
    min:1,
    required: true
  },
  weeklyGoal: {
    type: String,
    enum: ['Lose 1lb per week', 'Lose 2lbs per week', 'Maintain Weight', 'Gain 1lb per week', 'Gain 2lbs per week'],
    required: true
  },
  activeLvl: {
    type: String,
    enum: ['Active', 'Very Active', 'Lightly Active', 'Not Active'],
    required: true
  }
})

const myProfileSchema = new Schema({  
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  age: {
    type: Number,
    min:1,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: "Profile"
  },
  goal: [goalSchema],
})

const MyProfile = mongoose.model('MyProfile', myProfileSchema)

export {
  MyProfile
}