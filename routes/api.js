var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/abonements', function(req, res, next) {
  res.render('admin', { title: 'Abonements' });
});

router.get('/abonement_types', async function(req, res, next) {
  const types = await db.table('abonement_types').select('*');
  res.send(types);
});

router.get('/groups', async function(req, res, next) {
  const types = await db.table('groups').select('*');
  res.send(types);
});

router.post('/groups', async function(req, res, next) {
  try{
    const [id] = await db.table('groups').insert({title: req.body.title}).returning('id');
    const newGroup = await db.table('groups').where({id}).first('*');
    res.send(newGroup);
  } catch(e){
    console.error(e);
    res.send(e, 500);
  }
});

router.delete('/groups/:id', async function(req, res, next) {
  db.table('groups').where({id: req.params.id})
    .del()
    .then(()=>res.send('ok'), e=>res.send(e, 500));
});

router.get('/groups/:id', async function(req, res, next) {
  const group = await db.table('groups').where({id: req.params.id}).first();
  res.send({ group });
});


module.exports = router;
