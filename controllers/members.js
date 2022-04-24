const express = require('express');
const config=require('config');
const Member = require('../models/member');

function list(req, res, next) {
  Member.find().then(objs=>res.status(200).json({
    message:res.__('oklist.members'),
    obj:objs
  })).catch(e => res.status(500).json({
    message:res.__('badlist.members'),
    obj:e
  }));
}

function index(req,res,next) {
  const id=req.params.id;
  Member.findOne({"_id":id}).then(obj=>res.status(200).json({
    message: res.__('ok.member'),
    obj:obj
  })).catch(e => res.status(500).json({
    message:res.__('bad.member'),
    obj: e
  }));
}

function create(req,res,next) {
  const name=req.body.name;
  const lastName=req.body.lastName;
  const phone=req.body.phone;
  const adress=new Object();
  adress.street=req.body.street;
  adress.number=req.body.number;
  adress.zip=req.body.zip;
  adress.state=req.body.state;

  let actor=new Member({
    name:name,
    lastName:lastName,
    phone:phone,
    adress:adress
  });

  member.save().then(obj=>res.status(200).json({
    message:res.__('cr.member'),
    obj:obj
  }))
    .catch(e => res.status(500).json({
      message:res.__('ncr.member'),
      obj:e
    }))
}

function replace(req,res,next) {
  const id=req.params.id;
  let name=req.body.name ? req.body.name : "";
  let lastName=req.body.lastName ? req.body.lastName : "";
  let phone=req.body.phone ? req.body.phone : "";

  let actor= new Object({
    _name:name,
    _lastName:lastName,
    _phone:phone
  });

  Member.findOneAndUpdate({"_id":id},actor).then(obj=>res.status(200).json({
    message:res.__('rp.member'),
    obj: obj
  })).catch(e => res.status(500).json({
    message:res.__('nrp.member'),
    obj: e
  }));
}

function edit(req,res,next) {
  const id=req.params.id;
  const name=req.body.name;
  const lastName=req.body.lastName;
  const phone=req.body.phone;

  let actor=new Object();

  if(name){
    member._name=name;
  }
  if(lastName){
    member._lastName=lastName;
  }
  if(phone){
    member._phone=phone;
  }

  Member.findOneAndUpdate({"_id":id},actor).then(obj=>res.status(200).json({
    message:res.__('up.member'),
    obj:obj
  })).catch(e => res.status(500).json({
    message:res.__('nup.member'),
    obj:e
  }));
}

function destroy(req,res,next) {
  const id=req.params.id;
  Member.remove({"_id":id}).then(obj => res.status(200).json({
    message:res.__('dl.member'),
    obj:obj
  })).catch(e => res.status(500).json({
    message:res.__('ndl.member'),
    obj:e
  }));
}

module.exports = {
  list, index, create, replace, edit, destroy
};
