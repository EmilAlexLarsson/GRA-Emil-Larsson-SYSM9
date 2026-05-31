const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lägg till ett namn"],
    },
    email: {
      type: String,
      required: [true, "Lägg till en e-post"],
      unique: [true, "E-post måste vara unik"],
    },
    password: {
      type: String,
      required: [true, "Lägg till ett lösenord"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
