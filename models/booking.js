const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const schema = mongoose.Schema({
  _date:Date,
  _member: {
    type: mongoose.Schema.ObjectId,
    ref: 'Member'
  },
  _copy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Copy'
  }
});

class Booking {

  constructor(name, lastName, phone, status) {
    this._name = name;
    this._lastName = lastName;
    this._phone = phone;
    this._status = status;
  }

  get date() {
    return this._date;
  }

  set date(v) {
    this._date = v;
  }

  get member() {
    return this._member;
  }

  set member(v) {
    this._member = v;
  }

  get copy() {
    return this._copy;
  }

  set copy(v) {
    this._copy = v;
  }

}

schema.loadClass(Booking);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Booking', schema);
