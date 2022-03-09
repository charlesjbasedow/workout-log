import { Goal } from "../models/goal.js"

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

export {
  index
}