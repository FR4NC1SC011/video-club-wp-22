const express = require('express');
const Copy = require('../models/copy');
const Genre = require('../models/genre');

// TODO: change movie to copy
function list(req, res, next) {
  Movie.find().populate("_genre").then(objs => res.status(200).json({
    message: "Lista de Peliculas registradas.",
    obj: objs
  })).catch(e => res.status(500).json({
    message: "No se pudo consultar la lista de peliculas",
    obj: e
  }));
}

function index(req, res, next){
  const id = req.params.id;
  Movie.findOne({"_id":id}).then(obj => res.status(200).json({
    message: `Pelicula con el id ${id}.`,
    obj: obj
  })).catch(e => res.status(500).json({
    message: `No se pudo recuperar la pelicula con el id ${id}.`,
    obj: e
  }));
}

function create(req, res, next){
  const title = req.body.title;
  const genreId = req.body.genreId;

  Genre.findOne({"_id":genreId}).then((genre) => {

  let movie = new Movie({
    title: title,
    genre: genre,
  });

  movie.save().then(obj => res.status(200).json({
    message: 'Pelicula creada correctamente',
    obj: obj
  })).catch(e => res.status(500).json({
    message: 'Error: No se creo la pelicula',
    obj: e
  }));

  }).catch(e => res.status(500).json({
    message: "No se encontro el genero de la pelicula a almacenar",
    obj: e
  }));

}

function replace(req, res, next){
  const id = req.params.id;
  let title = req.body.title ? req.body.title : "";

  let movie = new Object({
    _title: title,
  });

  Movie.findOneAndUpdate({"_id":id}, movie).then(obj => res.status(200).json({
    message: "Pelicula reemplazada correctamente",
    obj: obj
  })).catch(e => res.status(500).json({
    message: "No se pudo actualizar la pelicula",
    obj: e
  }))
}

function edit(req, res, next){
  const id = req.params.id;
  const title = req.body.title;

  let movie = new Object();

  if (title) {
    movie._title = title;
  }

  Movie.findOneAndUpdate({"_id":id}, movie).then(obj => res.status(200).json({
    message: "Pelicula actualizada correctamente",
    obj: obj
  })).catch( e => res.status(500).json({
    message: "No se pudo actualizar la pelicula",
    obj: e
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  Movie.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Pelicula Eliminada Correctamente",
    obj: obj
  })).catch(e => res.status(500).json({
    message: "No se Pudo eliminar la pelicula",
    obj: e
  }));
}

module.exports = {
  list, index, create, replace, edit, destroy
};
