const Instruction = require("../models/instructionModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllInstructions = catchAsync(async (req, res) => {
  const instructions = await Instruction.find();

  res.status(200).json({
    status: "success",
    data_length: instructions.length,
    data: {
      instructions,
    },
  });
});

exports.createInstruction = catchAsync(async (req, res) => {
  const instruction = await Instruction.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      instruction,
    },
  });
});
