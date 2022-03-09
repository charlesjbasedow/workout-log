import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profile/index', {
      profiles,
      title: "Profile"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/profile")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  console.log(req.body)
  Profile.create(req.body)
  .then(profile => {
    res.redirect('/profile')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate("owner")
  .then(profile => {
    res.render('profile/show', {
      profile,
      title: "Goals"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile')
  })
}

function edit(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render("profile/edit", {
      profile,
      title: "Edit Profile"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/profile")
  })
}

function update(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    if (profile.owner.equals(req.user.profile._id)) {
      profile.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/profile/${req.params.id}`)
      })
    } else {
      throw new Error("NOT AUTHORIZED")
    }
  })
  .catch(err => {
    console.log("the error:", err)
    res.redirect("/profile")
  })
}

function createGoal(req, res) {
  Profile.findById(req.params.id, function(err, profile) {
    profile.goals.push(req.body)
    profile.save(function(err) {
      res.redirect(`/profile/${profile._id}`)
    })
  })
}

export {
  index,
  show,
  create,
  edit,
  update,
  createGoal
}