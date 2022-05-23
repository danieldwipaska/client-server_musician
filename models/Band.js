const mongoose = require('mongoose');

const BandSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: '',
    },
    managerName: {
      type: String,
      required: true,
      max: 50,
    },
    phone: {
      type: String,
      required: true,
    },
    memberName: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      default: [],
    },
    city: {
      type: String,
      required: true,
    },
    tools: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Band', BandSchema);
