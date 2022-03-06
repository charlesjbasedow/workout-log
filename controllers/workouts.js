import { Workout } from '../models/workout.js'

function index(req, res) {
  Workout.find({})
  .then(workouts => {
    res.render('workouts/index', {
      workouts,
      title: "Workout Log"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/workouts")
  })
}

export {
  index
}