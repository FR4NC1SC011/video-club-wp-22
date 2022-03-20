// copies
const express = require('express');
const { Copy } = require('../db');

function list(req, res, next) {
    Copy.findAll({})
            .then(objects => res.json(objects))
            .catch(err => res.send(err));
}

function index(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(err));
}

function create(req, res, next){
    const number = req.body.number;
    const movie_id = req.body.movie_id;

    let copie = new Object({
      number: number,
      movie_id: movie_id,
    });

    Copy.create(member).then(obj => res.json(obj)).catch(err => res.send(err));
}

function replace(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
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
    Copy.destroy({where:{id:id}})
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
}

module.exports = {
  list, index, create, replace, edit, destroy
};
