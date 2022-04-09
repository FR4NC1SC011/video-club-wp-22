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

  constructor(title) {
    this._title = description;
  }

  get title() {
    return this._title;
  }

  set title(v) {
    this._title = v;
  }

  get genre() {
    return this._genre;
  }

  set genre(v) {
    this._genre = v;
  }

}

schema.loadClass(Movie);

module.exports = mongoose.model('Movie', schema);
