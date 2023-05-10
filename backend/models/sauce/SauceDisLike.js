import mongoose from "mongoose";
console.log('Initializing User model...');
const sauceDisLikeSchema = new mongoose.Schema({
    sauce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sauce",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

sauceDisLikeSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const SauceDisLike = mongoose.model("SauceDisLike", sauceDisLikeSchema);

export default SauceDisLike;