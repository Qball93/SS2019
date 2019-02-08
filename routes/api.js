var express = require('express');
var router = express.Router();

var stuffApi = require('./api/stuff');

router.use('/stuff',stuffApi);


module.exports = router;

/*

    REST API
    HTTP
    GET => CONSULTAS  route.get
    POST = Ingreso de Datos router.post
    PUT = actualizacion de datos router.put
    DELETE = Eliminacion de datos router.delete



*/
/*
var albums = [];
var albumTMo = {
    id:'',
    name:'',
    author:'',
    rate:0
}

albums.push(
    {
        id: 1,
        name: 'Korn',
        author: 'Korn',
        rate: 4.5
    }
);


albums.push(
    {
        id: 2,
        name: 'Black',
        author: 'Metallica',
        rate: 5
    }
);

// albums
router.get('/albums',function(req,res,next){
    res.json(albums);
})

router.pist('albums/new',function(req,res,next) {
    
})

module.exports = router;*/