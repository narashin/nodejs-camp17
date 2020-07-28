const express = require('express');
const router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');

//리스트
router.get('/', function (req, res) {
    models.Contacts.findAll({}).then((contacts) => {
        res.render('contacts/list.html', {
            contacts: contacts
        });
    });
});

// 글작성
router.get('/write', function (req, res) {
    res.render('contacts/write.html');
});

router.post('/write', function (req, res) {
    models.Contacts.create({
        name: req.body.name,
        email: req.body.email,
        content: req.body.content
    }).then(() => {
        res.redirect('/contacts');
    });
});

// 상세글보기
router.get('/detail/:id', function (req, res) {
    models.Contacts.findAll({
        where: {
            id: req.params.id,
        }
    }).then((contacts) => {
        res.render('contacts/detail.html', {
            contacts: contacts
        });
    });
});

// 글 수정하기
router.get('/edit/:id', function (req, res) {
    models.Contacts.findAll({
        where: {
            id: req.params.id,
        }
    }).then((contacts) => {
        res.render('contacts/edit.html', {
            contacts: contacts
        });
    })
});


router.put('/edit/:id', function (req, res) {
    const contactId = req.params.id;
    models.Contacts.update({
            name: req.body.name,
            email: req.body.email,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect(`/contacts/detail/${contactId}`);
        }).catch(err => {
            console.log(err);
        })
});

router.delete('/delete/:id', function (req, res) {
    models.Contacts.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/contacts');
    })
});

module.exports = router;