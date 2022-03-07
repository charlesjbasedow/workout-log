import { Workout } from '../models/workout.js'

function index(req, res) {
  Workout.find({})
  .then(workouts => {
    res.render('workouts/index', {
      workouts,
      title: "All Workouts"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/workouts")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  console.log(req.body)
  Workout.create(req.body)
  .then(workout => {
    res.redirect('/workouts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/workouts/new')
  })
}
function newWorkout(req,res) {
  res.render('workouts/new', {
    title: "Add Workout"
  })
}

function show(req, res) {
  Workout.findById(req.params.id)
  .populate("owner")
  .then(workout => {
    res.render('workouts/show', {
      workout,
      title: "Workouts"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/workouts')
  })
}

export {
  index,
  newWorkout as new,
  create,
  show
}