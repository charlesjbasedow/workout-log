import { Workout } from '../models/workout.js'

function index(req, res) {
  Workout.find({})
  .then(workouts => {
    res.render('workouts/index', {
      workouts,
      title: "Your Recent Workouts"
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
  let runDate = new Date(req.body.date)
  req.body.date = new Date( runDate.getTime() + Math.abs(runDate.getTimezoneOffset()*60000))
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
    title: "Add Workout Below"
  })
}

function show(req, res) {
  Workout.findById(req.params.id)
  .populate("owner")
  .then(workout => {
    res.render('workouts/show', {
      workout,
      title: "Workout Details"
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
      title: "Edit Workout"
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

function createCaff(req, res) {
  Workout.findById(req.params.id, function(err, workout) {
    workout.caffeine.push(req.body)
    workout.save(function(err) {
      res.redirect(`/workouts/${workout._id}`)
    })
  })
}

function deleteCaff(req, res) {
  Workout.findById(req.params.workoutId)
  .then(workout => {
    workout.caffeine.remove({_id: req.params.caffId})
    workout.save()
    .then(() => {
      res.redirect(`/workouts/${workout._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/workouts/${workout._id}`)
  })
}


export {
  index,
  newWorkout as new,
  create,
  show,
  edit,
  update,
  deleteWorkout as delete,
  createCaff,
  deleteCaff
}