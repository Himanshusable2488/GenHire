require("dotenv").config()
const app = require("../Backend/src/app.js")
const connectToDB = require("./src/config/db.js")

connectToDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});




   