var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cms/index', { title: 'Express' });
});


router.get('/pages', async function(req, res, next) {
  const pages = await db.table('pages').select();
  res.render('cms/pages/index', { title: 'Create page', pages });
});

router.get('/pages/create', async function(req, res, next) {
  //const group = await db.table('groups').where({id: req.param.id}).first();
  res.render('cms/pages/edit', { title: 'Create page', page: {} });
});


router.get('/pages/:id', async function(req, res, next) {
  const page = await db.table('groups').where({id: req.param.id}).first();
  res.render('cms/pages/edit', { title: 'Create page', page });
});

module.exports = router;
