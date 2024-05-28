const express = require("express");
const { connectToDb } = require("./db/db");
const cors = require("cors");
const userRoutes = require("../backend/routes/user.routes");

const weatherRoutes = require("../backend/routes/weather.routes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/weather", weatherRoutes);

async function start() {
  try {
    await connectToDb(process.env.MONGODB_URL);
    console.log("Connected to db...");

    app.listen(3000, () => {
      console.log("Server is listening on port 3000...");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

start();
