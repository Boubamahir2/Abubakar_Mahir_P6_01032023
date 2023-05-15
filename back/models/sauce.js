import mongoose from 'mongoose';

const sauceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: {
    type: String,
    required: [true, 'Please enter sauce name.'],
    trim: true,
    text: true,
  },
  manufacturer: {
    type: String,
    required: [true, 'Please enter manufacturer name.'],
    trim: true,
    text: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter some description.'],
    trim: true,
    text: true,
  },
  mainPepper: {
    type: String,
    required: [true, 'Please enter some description.'],
    trim: true,
    text: true,
  },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: [{ type: String, ref: 'User' }],
  usersDisliked: [{ type: String, ref: 'User' }],
});

const Sauce = mongoose.model('Sauce', sauceSchema);

export default Sauce;
