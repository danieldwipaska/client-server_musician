const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bandId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['1', '2', '3', '4'],
      default: '1',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
