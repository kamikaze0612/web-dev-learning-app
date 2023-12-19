const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("Connected to Database!"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
});
