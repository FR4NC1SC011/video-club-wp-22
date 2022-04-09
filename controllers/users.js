const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const User = require('../models/user');

function list(req, res, next) {
  User.paginate({}, {page: 1}).then(objs => res.status(200).json({
    message: "Lista de usuarios registrados.",
    obj: objs
  })).catch(e => res.status(500).json({
    message: "No se pudo consultar la lista de usuarios",
    obj: e
  }));
}

function index(req, res, next){
  const id = req.params.id;
  User.findOne({"_id":id}).then(obj => res.status(200).json({
    message: `Usuario con el id ${id}.`,
    obj: obj
  })).catch(e => res.status(500).json({
    message: `No se pudo recuperar el usuario con el id ${id}.`,
    obj: e
  }));
}

function create(req, res, next){
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  async.parallel({
    salt: (callback) => {
      bcrypt.genSalt(10, callback);
    }
  }, (err, result) => {
    bcrypt.hash(password, result.salt, (err, hash) => {
      let user = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: hash,
        salt: result.salt
      });

      user.save().then(obj => res.status(200).json({
        message: 'Usuario creado correctamente',
        obj: obj
      })).catch(e => res.status(500).json({
        message: 'No se creo el usuario',
        obj: e
      }));
    });
  });
}

function replace(req, res, next){
  const id = req.params.id;
  let name = req.body.name ? req.body.name : "";
  let lastName = req.body.lastName ? req.body.lastName : "";

  let user = new Object({
    _name: name,
    _lastName: lastName
  });

  User.findOneAndUpdate({"_id":id}, user).then(obj => res.status(200).json({
    message: "usuario reemplazado correctamente",
    obj: obj
  })).catch(e => res.status(500).json({
    message: "No se pudo actualizar el usuario",
    obj: e
  }))
}

function edit(req, res, next){
  const id = req.params.id;
  const name = req.body.name;
  const lastName = req.body.lastName;

  let user = new Object();

  if (name) {
    user._name = name;
  }

  if (lastName) {
    user._lastName = lastName;
  }

  User.findOneAndUpdate({"_id":id}, user).then(obj => res.status(200).json({
    message: "Usuario actualizado correctamente",
    obj: obj
  })).catch( e => res.status(500).json({
    message: "No se pudo actualizar el usuario",
    obj: e
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  User.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Usuario Eliminado Correctamente",
    obj: obj
  })).catch(e => res.status(500).json({
    message: "No se Pudo eliminar el usuario",
    obj: e
  }));
}

module.exports = {
  list, index, create, destroy
};
