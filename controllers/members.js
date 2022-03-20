const express = require('express');
const { Member } = require('../db');

function list(req, res, next) {
    Member.findAll({})
            .then(objects => res.json(objects))
            .catch(err => res.send(err));
}

function index(req, res, next){
    const id = req.params.id;
    Member.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(err));
}

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const phone = req.body.phone;

    let member = new Object({
      name: name,
      lastName: lastName,
      address: address,
      phone: phone,
    });

    Member.create(member).then(obj => res.json(obj)).catch(err => res.send(err));
}

function replace(req, res, next){
    const id = req.params.id;
    Member.findByPk(id)
            .then((object) => {
                const name = req.body.name ? req.body.name : "";
            })
            .catch();
}

function edit(req, res, next){
    const id = req.params.id;
    res.send(`/directors => edit = Muestra el director con el id nuemro ${id}`);
}

function destroy(req, res, next){
    const id = req.params.id;
    Member.destroy({where:{id:id}})
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
}

module.exports = {
  list, index, create, replace, edit, destroy
};
