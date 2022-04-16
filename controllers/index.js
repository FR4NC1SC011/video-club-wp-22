const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = require('config');

function home(req, res, next) {
  res.render('index', {title: 'Express'});
}

function login(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({_email: email}).select('_password _salt').then((user) => {
    if(user) {
      bcrypt.hash(password, user.salt, (err, hash) => {
        if (err) {
          // Login No Ok
          res.status(403).json({
            message:"Credenciales no Validas 1"
          });
        }
        if(hash === user.password) {
          const jwtKey = secret.get("secret.key");
          //Login Ok
          res.status(200).json({
            message: "Login Correcto",
            obj: jwt.sign({exp: Math.floor(Date.now()/1000) + 86400, data: user.id}, jwtKey),
          });
        } else {
          res.status(403).json({
            message:"Credenciales no Validas 2"
          });
        }
      });
    } else {
      res.status(403).json({
        message:"Credenciales no Validas 3"
      });
    }
  }).catch((err) => {
    // Login No Ok
    res.status(403).json({
      message:"Credenciales no Validas 4"
    });

  });
}


module.exports = {
  home, login
}
