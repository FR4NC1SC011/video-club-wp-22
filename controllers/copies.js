const express = require('express');
const Copy = require('../models/copy');
const Genre = require('../models/genre');

// TODO: Hacer que los mensajes se obtengan del archivo que esta dentro de 'locales/'
function list(req, res, next) {
  Copy.find().populate("_genre").then(objs => res.status(200).json({
    message: "Lista de copias registradas.",
    obj: objs
  })).catch(e => res.status(500).json({
    message: "No se pudo consultar la lista de copias",
    obj: e
  }));
}

function index(req, res, next){
  const id = req.params.id;
  Copy.findOne({"_id":id}).then(obj => res.status(200).json({
    message: `Pelicula con el id ${id}.`,
    obj: obj
  })).catch(e => res.status(500).json({
    message: `No se pudo recuperar la pelicula con el id ${id}.`,
    obj: e
  }));
}

// FIXME: actualmente funciona como si quisiera crear una pelicula
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

// FIXME: actualmente funciona como si quisiera reemplazar una pelicula
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

// FIXME: actualmente funciona como si quisiera editar una pelicula
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
  Copy.remove({"_id":id}).then(obj => res.status(200).json({
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
