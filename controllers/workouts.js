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

function edit(req, res) {
  Workout.findById(req.params.id)
  .then(workout => {
    res.render("workouts/edit", {
      workout,
      title: "edit workout"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/workouts")
  })
}

function update(req, res) {
  Workout.findById(req.params.id)
  .then(workout => {
    if (workout.owner.equals(req.user.profile._id)) {
      workout.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/workouts/${req.params.id}`)
      })
    } else {
      throw new Error("NOT AUTHORIZED")
    }
  })
  .catch(err => {
    console.log("the error:", err)
    res.redirect("/workouts")
  })
}

function deleteWorkout(req, res) {
  Workout.findById(req.params.id)
  .then(workout => {
    if (workout.owner.equals(req.user.profile._id)) {
      workout.delete()
      .then(() => {
        res.redirect("/workouts")
      })
    } else {
      throw new Error ("NOT AUTHORIZED")
    }
  })
  .catch(err => {
    console.log("the error:", err)
    res.redirect("/workouts")
  })
}

export {
  index,
  newWorkout as new,
  create,
  show,
  edit,
  update,
  deleteWorkout as delete
}