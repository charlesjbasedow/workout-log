import { goal, Goal } from "../models/goal.js"

function index(req, res) {
  Goal.find({})
  .then(goals => {
    res.render('goals/index', {
      goals,
      title: "Enter Your Info"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/goals")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  console.log(req.body)
  Goal.create(req.body)
  .then(goal => {
    res.redirect('/goals')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/goals')
  })
}

export {
  index,
  create
}