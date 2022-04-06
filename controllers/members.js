const express = require('express');
const Member = require('../models/member');

function list(req, res, next) {
  Member.find().then(objs => res.status(200).json({
    message: "Lista de miembros registrados.",
    obj: objs
  })).catch(e => res.status(500).json({
    message: "No se pudo consultar la lista de miembros",
    obj: e
  }));
}

function index(req, res, next){
  const id = req.params.id;
  Member.findOne({"_id":id}).then(obj => res.status(200).json({
    message: `Miembro con el id ${id}.`,
    obj: obj
  })).catch(e => res.status(500).json({
    message: `No se pudo recuperar el miembro con el id ${id}.`,
    obj: e
  }));
}

function create(req, res, next){
  const name = req.body.name;
  const lastName = req.body.lastName;
  const phone  = req.body.phone;
  const address = new Object();

  address.street = req.body.street;
  address.number = req.body.number;
  address.zip = req.body.zip;
  address.state = req.body.state;


    let member = new Member({
      name: name,
      lastName: lastName,
      phone: phone,
      address: address,
    });

    member.save().then(obj => res.status(200).json({
        message: 'Miembro creado correctamente',
        obj: obj
    }))
         .catch(e => res.status(500).json({
             message: 'No se creo el miembro',
             obj: e
         }));
}

function replace(req, res, next){
  const id = req.params.id;
  let name = req.body.name ? req.body.name : "";
  let lastName = req.body.lastName ? req.body.lastName : "";
  let phone = req.body.phone ? req.body.phone : "";

  let Member = new Object({
    _name: name,
    _lastName: lastName,
    _phone: phone
  });

  Member.findOneAndUpdate({"_id":id}, actor).then(obj => res.status(200).json({
    message: "Miembro reemplazado correctamente",
    obj: obj
  })).catch(e => res.status(500).json({
    message: "No se pudo actualizar el miembro",
    obj: e
  }))
}

function edit(req, res, next){
  const id = req.params.id;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const phone = req.body.phone;

  let member = new Object();

  if (name) {
    member._name = name;
  }

  if (lastName) {
    member._lastName = lastName;
  }

  if (phone) {
    member._phone = phone;
  }

  Member.findOneAndUpdate({"_id":id}, member).then(obj => res.status(200).json({
    message: "Miembro actualizado correctamente",
    obj: obj
  })).catch( e => res.status(500).json({
    message: "No se pudo actualizar el miembro",
    obj: e
  }));
}

function destroy(req, res, next){
  const id = req.params.id;
  Member.remove({"_id":id}).then(obj => res.status(200).json({
    message: "Miembro Eliminado Correctamente",
    obj: obj
  })).catch(e => res.status(500).json({
    message: "No se Pudo eliminar el miembro",
    obj: e
  }));
}

module.exports = {
  list, index, create, replace, edit, destroy
};
