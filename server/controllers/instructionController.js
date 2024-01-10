const Instruction = require("../models/instructionModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllInstructions = catchAsync(async (req, res) => {
  const instructions = await Instruction.find().sort({ id: 1 });

  res.status(200).json({
    status: "success",
    data_length: instructions.length,
    data: {
      instructions,
    },
  });
});

exports.getInstruction = catchAsync(async (req, res) => {
  const instruction = await Instruction.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      instruction,
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

exports.updateInstruction = catchAsync(async (req, res) => {
  const newInstruction = await Instruction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      instruction: newInstruction,
    },
  });
});

exports.deleteInstruction = catchAsync(async (req, res) => {
  await Instruction.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
