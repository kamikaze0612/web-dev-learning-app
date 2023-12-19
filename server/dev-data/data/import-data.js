"use strict";

const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Instruction = require("../../models/instructionModel");

dotenv.config({ path: "../../config.env" });

const DB = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB);

/* Import JSON file */
const instructions = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

/* Function for importing data to Database */
const importData = async () => {
  try {
    await Instruction.create(instructions);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

/* Function for deleting data from Database */
const deleteData = async () => {
  try {
    await Instruction.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
