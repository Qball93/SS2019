var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/hola',function (req, res, next){
  res.json({"mensajes":"hola"});
})

router.get('/adios',function (req, res, next){
  res.json({"mensajes":"hola"});
})




module.exports = router;
