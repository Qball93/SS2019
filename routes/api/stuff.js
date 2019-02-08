var uuidv4 = require('uuid/v4');
var express = require('express')
var router = express.Router();


var fileModel = require('./jsonmodel');

var data;

var stuff = {
    '_id': null,
    'empresa' : '',
    'url' : '',
    'nombre' : '',
    'year' : '',
    'rating': '',
    'fechaIng': null
};

router.get('/', function( req, res, next) {
    if(!data){
      fileModel.read(function(err, filedata){
        if(err){
          console.log(err);
          data = [];
          return res.status(500).json({'error':'Error al Obtener Data'});
        }
        data = JSON.parse(filedata);
        return res.status(200).json(data);
      });
    } else {
      return res.status(200).json(data);
    }
  });// get /

  
  router.post('/new', function(req, res, next){
    var _stuffData = Object.assign({} , stuff, req.body);
    var dateT = new Date();
    var dateD = new Date();
    dateD.setDate(dateT.getDate()+ 3);
    _stuffData.fechaIng = dateT;
    _stuffData._id = uuidv4();
    
    if(!data){
      data = [];
    }


    data.push(_stuffData);
    fileModel.write(data, function(err){
      if(err){
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Obtener Data' });
      }
      return res.status(200).json(_stuffData);
    });
  });

  router.put('/done/:stuffId', function(req, res, next){
    var _stuffId = req.params.stuffId;
    var _stuffUpds = req.body;
    var _stuffUpdated = null;
    var newData = data.map(
      function(doc, i){
        if (doc._id == _stuffId){
          _stuffUpdated = Object.assign(
            {},
            doc,
            _stuffUpds,
            {"_id":_stuffId},
            {'fechaIng':new Date()}
            );
          return _stuffUpdated;
        }
        return doc;
      }
    );// end map
    data = newData;
    fileModel.write(data, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Guardar Data' });
      }
      return res.status(200).json(_stuffUpdated);
    });
  });// Set A stuff as Done


  router.delete('/delete/:stuffId', function(req, res, next){
    var _stuffId = req.params.stuffId;
    var newData = data.filter(
      function (doc, i) {
        if (doc._id == _stuffId) {
          return false;
        }
        return true;
      }
    );// end map
    data = newData;
    fileModel.write(data, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Guardar Data' });
      }
      return res.status(200).json({"delete": _stuffId});
    });
  }); // end delete
  
  fileModel.read(function(err , filedata){
    if(err){
      console.log(err);
    } else{
      data = JSON.parse(filedata);
    }
  });
  
  module.exports = router;