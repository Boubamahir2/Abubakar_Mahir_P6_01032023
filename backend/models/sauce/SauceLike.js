import mongoose from "mongoose";

const sauceLikeSchema = new mongoose.Schema({
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

sauceLikeSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const SauceLike = mongoose.model("SauceLike", sauceLikeSchema);

export default SauceLike;