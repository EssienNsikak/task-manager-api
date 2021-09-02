const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },

    description: {
      type: String,
      required: true
    },

    userId: {
      type: String,
      required: true
    },
    
  },
  {
    timestamps: true,
  }
);

TaskSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Task', TaskSchema);
