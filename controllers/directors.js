const express = require('express');
const Director = require('../models/director');

function list(req, res, next) {
  Director.find().then(objs => res.status(200).json({
    message: "Lista de Directores registrados.",
    obj: objs
  })).catch(e => res.status(500).json({
    message: "No se pudo consultar la lista de directores",
    obj: e
  }));
}

function index(req, res, next){
  const id = req.params.id;
  Director.findOne({"_id":id}).then(obj => res.status(200).json({
    message: `Director con el id ${id}.`,
    obj: obj
  })).catch(e => res.status(500).json({
    message: `No se pudo recuperar el director con el id ${id}.`,
    obj: e
  }));
}

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;

    let director = new Director({
        name: name,
        lastName: lastName
    });

    director.save().then(obj => res.status(200).json({
        message: 'Director creado correctamente',
        obj: obj
    }))
         .catch(e => res.status(500).json({
             message: 'No se creo el director',
             obj: e
         }));
}

function replace(req, res, next){
  const id = req.params.id;
  let name = req.body.name ? req.body.name : "";
  let lastName = req.body.lastName ? req.body.lastName : "";

  let director = new Object({
    _name: name,
    _lastName: lastName
  });

  Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
    message: "Director reemplazado correctamente",
    obj: obj
  })).catch(e => res.status(500).json({
    message: "No se pudo actualizar el director",
    obj: e
  }))
}

function edit(req, res, next){
  const id = req.params.id;
  const name = req.body.name;
  const lastName = req.body.lastName;

  let director = new Object();

  if (name) {
    director._name = name;
  }

  if (lastName) {
    director._lastName = lastName;
  }

  Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
    message: "Director actualizado correctamente",
    obj: obj
  })).catch( e => res.status(500).json({
    message: "No se pudo actualizar el director",
    obj: e
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  Director.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Director Eliminado Correctamente",
    obj: obj
  })).catch(e => res.status(500).json({
    message: "No se Pudo eliminar el Director",
    obj: e
  }));
}

module.exports = {
  list, index, create, replace, edit, destroy
};
