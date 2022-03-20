const express = require('express');
const { Booking } = require('../db');

function list(req, res, next) {
  Booking.findAll({})
       .then(objects => res.json(objects))
       .catch(err => res.send(err));
}

function index(req, res, next){
  const id = req.params.id;
  Booking.findByPk(id)
       .then(object => res.json(object))
       .catch(err => res.send(err));
}

function create(req, res, next){
  const date = req.body.date;
  const memberId = req.body.memeberId;
  const copyId = req.body.copyId;

  let booking = new Object({
    date: date,
    memberId: memberId,
    copyId: copyId,
  });

  Booking.create(booking).then(obj => res.json(obj)).catch(err => res.send(err));
}

function replace(req, res, next){
  const id = req.params.id;
  Booking.findByPk(id)
          .then((object) => {
            const date = req.body.date ? req.body.date : "";
          })
          .catch();
}

function edit(req, res, next){
    const id = req.params.id;
    res.send(`/directors => edit = Muestra el director con el id nuemro ${id}`);
}

function destroy(req, res, next){
    const id = req.params.id;
    Booking.destroy({where:{id:id}})
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
}

module.exports = {
  list, index, create, replace, edit, destroy
};
