import { MyProfile } from "../models/myprofile.js"

function index(req, res) {
  MyProfile.find({owner: req.user.profile._id})
  .then(myprofiles => {
    res.render('myprofiles/index', {
      myprofiles,
      title: "My Profile"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  console.log(req.body)
  MyProfile.create(req.body)
  .then(profile => {
    res.redirect('/myprofiles')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/myprofiles')
  })
}

function newProfile(req,res) {
  res.render('myprofiles/new', {
    title: "Create Your Profile"
  })
}

function show(req, res) {
  MyProfile.findById(req.params.id)
  .populate("owner")
  .then(myprofile => {
    res.render('myprofiles/show', {
      myprofile,
      title: "Goals"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/myprofiles')
  })
}

function edit(req, res) {
  MyProfile.findById(req.params.id)
  .then(profile => {
    res.render("myprofiles/edit", {
      profile,
      title: "Edit Profile"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/myprofiles")
  })
}

function update(req, res) {
  MyProfile.findById(req.params.id)
  .then(myprofile => {
    if (myprofile.owner.equals(req.user.profile._id)) {
      myprofile.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/myprofiles/${req.params.id}`)
      })
    } else {
      throw new Error("NOT AUTHORIZED")
    }
  })
  .catch(err => {
    console.log("the error:", err)
    res.redirect("/myprofiles")
  })
}

function createGoal(req, res) {
  MyProfile.findById(req.params.id, function(err, myprofile) {
    myprofile.goal.push(req.body)
    myprofile.save(function(err) {
      res.redirect(`/myprofiles/${myprofile._id}`)
    })
  })
}

export {
  index,
  newProfile as new,
  show,
  create,
  edit,
  update,
  createGoal
}