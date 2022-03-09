import { Goal } from "../models/profile.js"

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

function edit(req, res) {
  Goal.findById(req.params.id)
  .then(goal => {
    res.render("goals/edit", {
      goal,
      title: "Edit Info"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/goals")
  })
}

function update(req, res) {
  Goal.findById(req.params.id)
  .then(goal => {
    if (goal.owner.equals(req.user.profile._id)) {
      goal.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/goals/${req.params.id}`)
      })
    } else {
      throw new Error("NOT AUTHORIZED")
    }
  })
  .catch(err => {
    console.log("the error:", err)
    res.redirect("/goals")
  })
}

export {
  index,
  create,
  edit,
  update
}