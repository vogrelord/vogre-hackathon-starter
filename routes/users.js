var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../db/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('users/register', {email: '', password: '', confirmPassword: '', error: null});
  
});


router.post('/register', async (req, res, next) => {
  const {
    password,
    email,
    confirmPassword
  } = req.body;
  console.log(password);
  try{
    const passwordHash = bcrypt.hashSync(password, 8, null);
    const existing = await knex('users').where({email}).first('id');
    if(existing) {
      return res.render('users/register', {email, password, confirmPassword, error: 'User with this email already exists'});
    }
    const [id] = await knex('users')
                      .insert({password: passwordHash, email})
                      .returning('id');
    const newUser = await knex('users').where({id}).first('*');
    res.send(newUser);
  } catch(e){
    console.error(e);
    res.render('users/register', {email, password, confirmPassword, error: 'User with this email already exists'});
  }
});


module.exports = router;
