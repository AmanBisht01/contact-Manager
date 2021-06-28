const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    username: { type: String, required: true },
    contactno: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    email: { type: String, minlength: 3 },
  },
  {
    timestamps: true,
  }
);

const contact = mongoose.model("contact", contactSchema);

module.exports = contact;
