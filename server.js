const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
  });
});
