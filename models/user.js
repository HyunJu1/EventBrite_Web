const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  isAdmin: {type: Boolean},
  email: {type: String, required: true, index: true, unique: true, trim: true},
  password: {type: String},
  facebook: {id: String, token: String, photo: String},
  kakao: {id: String, accessToken: String, photo: String},
  favorite: [{type: Schema.Types.ObjectId, ref: 'Question'}],
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.methods.generateHash = function(password) {
  return bcrypt.hash(password, 10); // return Promise
};

schema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password); // return Promise
};

var User = mongoose.model('User', schema);

module.exports = User;
