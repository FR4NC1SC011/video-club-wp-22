const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _number: Number,
  _format: ['VHS', 'DVD', 'BLU_RAY']
  _movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie'
  },
  _status: ['AVAILABLE', 'RENTED']
});

class Copy {

  constructor(name, lastName, phone, status){
    this._name = name;
    this._lastName = lastName;
    this._movie = phone;
    this._status = status;
  }

  get name() {
    return this._name;
  }

  set name(v) {
    this._name = v;
  }

  get lastName(){
      return this._lastName;
  }

  set lastName(v){
      this._lastName = v;
  }

  get movie(){
      return this._movie;
  }

  set movie(v){
      this._movie = v;
  }

  get status(){
      return this._status;
  }

  set status(v){
      this._status = v;
  }
}

schema.loadClass(Copy);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Copy', schema);
