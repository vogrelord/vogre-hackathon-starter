var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin/abon_types', function(req, res, next) {
  res.render('admin/abon_types', { title: 'Admin' });
});

router.get('/admin/groups', function(req, res, next) {
  res.render('admin/groups', { title: 'Admin' });
});

router.get('/admin/group/:id', async function(req, res, next) {
  const group = await db.table('groups').where({id: req.param.id}).first();
  const students = await db.table('students')
                              .innerJoin('visits', 'visits.student_id', 'student.id')
                              .where({group_id: id})
                              .select('students.*');
  const lessons = await db.table('lessons')
                              .where({group_id: id})
                              .select('*');
  res.render('admin/group', { title: 'Group', group, students, lessons });
});


module.exports = router;
