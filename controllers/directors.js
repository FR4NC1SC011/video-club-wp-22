const express = require('express');

function list(req, res, next) {
  res.send("/directors => list");

}

function index(req, res, next){
    const id = req.params.id;
    res.send(`/directors => index = Muestra el director con el id nuemro ${id}`);
}

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    res.send(`/directors => create = se crea un director con nombre ${name} y apellido ${lastName}`);
}

function replace(req, res, next){
    const id = req.params.id;
    res.send(`/directors => replace = Muestra el director con el id nuemro ${id}`);
}

function edit(req, res, next){
    const id = req.params.id;
    res.send(`/directors => edit = Muestra el director con el id nuemro ${id}`);
}

function destroy(req, res, next){
    const id = req.params.id;
    res.send(`/directors => destroy = Muestra el director con el id nuemro ${id}`);
}

module.exports = {
  list, index, create, replace, edit, destroy
};
