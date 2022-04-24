const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

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
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Movie', schema);
