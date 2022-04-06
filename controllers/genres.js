const express = require('express');
const Genre = require('../models/genre');

function list(req, res, next) {
  Genre.find().then(objs => res.status(200).json({
    message: "Lista de Generos registradas.",
    obj: objs
  })).catch(e => res.status(500).json({
    message: "No se pudo consultar la lista de Generos",
    obj: e
  }));
}

function index(req, res, next){
  const id = req.params.id;
  Genre.findOne({"_id":id}).then(obj => res.status(200).json({
    message: `Genero con el id ${id}.`,
    obj: obj
  })).catch(e => res.status(500).json({
    message: `No se pudo recuperar el genero con el id ${id}.`,
    obj: e
  }));
}

function create(req, res, next){
    const description = req.body.description;

    let genre = new Genre({
        description: description,
    });

    genre.save().then(obj => res.status(200).json({
        message: 'Genero creado correctamente',
        obj: obj
    }))
         .catch(e => res.status(500).json({
             message: 'Error: No se creo el genero',
             obj: e
         }));
}

function replace(req, res, next){
  const id = req.params.id;
  let description = req.body.description ? req.body.description : "";

  let genre = new Object({
    _description: description,
  });

  Genre.findOneAndUpdate({"_id":id}, genre).then(obj => res.status(200).json({
    message: "Genero reemplazado correctamente",
    obj: obj
  })).catch(e => res.status(500).json({
    message: "No se pudo actualizar el genero",
    obj: e
  }))
}

function edit(req, res, next){
  const id = req.params.id;
  const description = req.body.description;

  let genre = new Object();

  if (description) {
    genre._description = description;
  }

  Genre.findOneAndUpdate({"_id":id}, genre).then(obj => res.status(200).json({
    message: "Genero actualizado correctamente",
    obj: obj
  })).catch( e => res.status(500).json({
    message: "No se pudo actualizar el genero",
    obj: e
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  Genre.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Genero Eliminado Correctamente",
    obj: obj
  })).catch(e => res.status(500).json({
    message: "No se Pudo eliminar el genero",
    obj: e
  }));
}

module.exports = {
  list, index, create, replace, edit, destroy
};
