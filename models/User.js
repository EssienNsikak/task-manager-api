const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 30,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      max: 50
    },

    password: {
      type: String,
      required: true,
      min: 6
    },

    profilePicture: {
      type: String,
      default: ''
    },
  },

  {timestamps: true}

)

module.exports = mongoose.model('User', UserSchema);