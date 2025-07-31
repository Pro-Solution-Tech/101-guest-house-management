


const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['home', 'room', 'bar', 'environment','] 
  }
});

module.exports = mongoose.model('Image', ImageSchema);
