const express = require('express');
const config=require('config');
const Director = require('../models/director');


function list(req, res, next) {
  Director.find().then(objs => res.status(200).json({
    message:res.__('oklist.director'),
    obj: objs
  })).catch(e => res.status(500).json({
    message: res.__('oklist.director'),
    obj: e
  }));
}

function index(req, res, next) {
  const id = req.params.id;
  Director.findOne({"_id":id}).then(obj => res.status(200).json({
    message:res.__('ok.director'),
    obj: obj
  })).catch(e => res.status(500).json({
    message:res.__('bad.director'),
    obj: e
  }));
}

function create(req, res, next) {
  const name = req.body.name;
  const lastName = req.body.lastName;

  let director = new Director({
    name:name,
    lastName:lastName
  });

  director.save().then(obj => res.status(200).json({
    message:res.__('cr.director'),
    obj: obj
  })).catch(ex => res.status(500).json({
    message:res.__('ncr.director'),
    obj: ex
  }));
}



function replace(req, res, next) {
  const id = req.params.id;
  let name = req.body.name ? req.body.name: "";
  let lastName = req.body.lastName ? req.body.lastName: "";

  let director = new Object({
    _name: name,
    _lastName: lastName
  });

  Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
    message:res.__('rp.director'),
    obj: obj
  })).catch(e => res.status(500).json({
    message: res.__('nrp.director'),
    obj: e
  }));
}

function edit(req, res, next) {
  const id = req.params.id;
  let name = req.body.name;
  let lastName = req.body.lastName;

  let director = new Object();

  if (name) {
    director._name = name;
  }

  if (lastName) {
    director._lastName = lastName;
  }

  Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
    message: res.__('up.director'),
    obj: obj
  })).catch(e => res.status(500).json({
    message:res.__('nup.directorr'),
    obj: e
  }));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Director.remove({"_id":id}).then(obj => res.status(200).json({
    message:res.__('dl.director'),
    obj: obj
  })).catch(e => res.status(500).json({
    message: res.__('ndl.director'),
    obj: e
  }));
}

module.exports = {
  list, index, create, replace, edit, destroy
};
