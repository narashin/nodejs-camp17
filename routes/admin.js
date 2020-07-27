const express = require('express');
const router = express.Router();

const models = require('../models');

// /admin/라우터
router.get('/', function(req, res){
    res.send('쥔장등장');
});

router.get( '/products' , function( _ ,res){
    models.Products.findAll({

    }).then( (products) => {
        // DB에서 받은 products를 products변수명으로 내보냄
        res.render( 'admin/products.html' ,{ products : products });
    });
});

router.get('/products/write', function(req, res){
    // res.send('쥔장 상품');
    res.render('admin/form.html');
});

router.post('/products/write', (req,res) => {
    models.Products.create({
        name : req.body.name,
        price : req.body.price ,
        description : req.body.description
    }).then( () => {
        res.redirect('/admin/products');
    });
});

module.exports = router;
