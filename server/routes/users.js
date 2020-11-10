var express = require('express');
var router = express.Router();
var User = require('../models/User')
var cors = require('cors')

router.get('/', async (req, res) => {
  try {
    const result = await User.find({})

    return res.json(result)
  } catch (e) {
    console.log(e)
    res.status(400).send()
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) return res.status(404).send('not found')

    return res.json(user)
  } catch (e) {
    console.log(e)
    res.status(400).send()
  }
})

router.post('/', async (req, res) => {
  try {
    const u = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
    })

    if (await u.validate()) return res.status(400).send(error.errors)

    await u.save()

    return res.json(u)
  } catch (e) {
    console.log(e)
    res.status(400).json(e)
  }
})

router.put('/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
    }, { runValidators: true })

    return res.send(await User.findById(req.params.id))
  } catch (e) {
    console.log(e)
    res.status(400).json(e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    return res.send()
  } catch(e){
    console.log(e)
    return res.status(500).send()
  }
})

module.exports = router;
