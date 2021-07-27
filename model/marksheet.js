const mongoose = require('mongoose');
const MarksheetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    roll_no:{
        type: String,
        required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    sub1: {
      type: Number,
      required: true,
    },
    sub2: {
        type: Number,
        required: true,
    },
    sub3: {
        type: Number,
        required: true,
    },
  },
);
module.exports = mongoose.model('marksheet', MarksheetSchema);
