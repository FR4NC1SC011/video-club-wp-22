const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _title:String,
  _genre: {
    type: mongoose.Schema.ObjectId,
    ref: 'Genre'
  }
});

class Movie {

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
