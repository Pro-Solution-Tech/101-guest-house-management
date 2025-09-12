import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Room name is required'],
    trim: true,
    maxlength: [100, 'Room name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  regularPrice: {
    type: Number,
    required: [true, 'Regular price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountedPrice: {
    type: Number,
    validate: {
      validator: function(value) {
        // Discounted price should be less than regular price
        return value < this.regularPrice;
      },
      message: 'Discounted price must be less than regular price'
    },
    default: null
  },
  bedType: {
    type: String,
    required: [true, 'Bed type is required'],
    enum: {
      values: ['Single Size', 'Double Size', 'Queen Size', 'King Size', 'Half Size'],
      message: 'Please select a valid bed type'
    }
  },
    waterHeater: { type: Boolean, default: false },
    Tv: { type: Boolean, default: false },
    DSTV: { type: Boolean, default: false },
    AC: { type: Boolean, default: false },
    fridge: { type: Boolean, default: false },
    sofa: { type: Boolean, default: false },
  offer: {
    type: Boolean,
    default: false
  },
  imageURLs: {
    type: [String], // Array of image URLs
    validate: {
      validator: function(images) {
        return images.length <= 6; // Maximum 6 images per room
      },
      message: 'Cannot upload more than 6 images'
    }
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
}, {timestamps: true} );


const Room = mongoose.model("room", roomSchema);
export default Room;