const express = require('express');
const { Movie } = require('../db');
const { Actor } = require('../db');

function list(req, res, next) {
  Movie.findAll({include: ['director', 'actors']})
       .then(objects => res.json(objects))
       .catch(err => res.send(err));
}

function index(req, res, next){
  const id = req.params.id;
  Movie.findByPk(id)
       .then(object => res.json(object))
       .catch(err => res.send(err));
}

function create(req, res, next){
  const title = req.body.name;
  const directorId = req.body.directorId;
  const genreId = req.body.genreId;

  let movie = new Object({
    title: title,
    directorId: directorId,
    genreId: genreId,
  });

  Movie.create(movie).then(obj => res.json(obj)).catch(err => res.send(err));
}

function addActor(req, res, next) {
  const idMovie = req.body.idMovie;
  const idActor = req.body.idActor;

  Movie.findByPk(idMovie).then((movie) => {
    Actor.findByPk(idActor).then((actor) => {
      movie.addActor(actor);
      res.json(movie);
    }).catch(err => res.send(err));
  }).catch(err => res.send(err));
}

function replace(req, res, next){
 const id = req.params.id;
  Director.findByPk(id)
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
    Movie.destroy({where:{id:id}})
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
}

module.exports = {
  list, index, create, replace, edit, destroy
};
