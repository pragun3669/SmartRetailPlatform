const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String], // Store a single image URL or file path
    required: false, // Not required; some products may not have an image
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], // Array of tags for the product
    required: false,
  },
});

module.exports = mongoose.model('Product', productSchema);




