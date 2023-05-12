import { Schema, model } from 'mongoose';

const sauceSchema = Schema({
  userId: { type: String, required: true, ref: 'User' },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true }, // main spicy ingredient
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: [{ type: String, ref: 'User' }], // Array of userId who liked the sauce
  usersDisliked: [{ type: String, ref: 'User' }], //Array of userId who disliked the sauce
});

export default model('Sauce', sauceSchema);
