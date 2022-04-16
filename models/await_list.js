const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _member: {
    type: mongoose.Schema.ObjectId,
    ref: 'Member'
  },
  _movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie'
  }
});

class AwaitList {

  // TODO:
  constructor(title) {
    //this._member = description;
  }

  get member() {
    return this._member;
  }

  set member(v) {
    this._member = v;
  }

  get movie() {
    return this._movie;
  }

  set movie(v) {
    this._movie = v;
  }

}

schema.loadClass(AwaitList);

module.exports = mongoose.model('AwaitList', schema);
