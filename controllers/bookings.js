const express = require('express');
const config=require('config');
const Booking = require('../models/booking');

// Restfull => GET POST PUT PATCH DELETE
function list(req, res, next) {
    Booking.find().then(objs => res.status(200).json ({
        message:res.__('oklist.booking'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('badlist.booking'),
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Booking.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.booking'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.booking'),
        obj: ex
    }));
}

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;

    let booking = new Booking({
        name: name,
        lastName: lastName
    });

    booking.save().then(obj => res.status(200).json({
        message: res.__('cr.booking'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('ncr.booking'),
        obj: ex
    }));

}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name: "";
    let lastName = req.body.lastName ? req.body.lastName: "";

    let booking = new Object({
        _name: name,
        _lastname: lastName
    });

    Booking.findOneAndUpdate({"_id":id}, booking).then(obj => res.status(200).json({
        message: res.__('rp.booking'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nrp.booking')
        obj: ex
    }));


}

function edit(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let booking = new Object();

    if(name){
        booking._name = name;
    }
    if(lastName){
        booking._lastName = lastName;
    }

    Booking.findOneAndUpdate({"_id":id}, booking).then(obj => res.status(200).json({
        message: res.__('up.booking'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nup.booking'),
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Booking.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('dl.booking'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('"ndl.booking'),
        obj: ex
    }));
}


module.exports = {
    list, index, create, edit, replace, destroy
}
