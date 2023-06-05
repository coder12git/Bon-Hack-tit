const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });
mongoose.connect(process.env.DB_URI);

const app = require("./app");

const port = process.env.port || 8000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
