const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  startingCode: {
    html: {
      type: String,
      default: "",
    },
    css: {
      type: String,
      default: "",
    },
  },
  checkingCode: {
    html: {
      type: String,
      default: "",
    },
    css: {
      type: String,
      default: "",
    },
  },
});

const Instruction = mongoose.model("Instruction", instructionSchema);

module.exports = Instruction;
