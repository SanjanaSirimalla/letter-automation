<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
=======
import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/connectDB.js";

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Application Error", err);
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });
>>>>>>> 808da5e0d378a9b890d312b4ea51d18003c3d329
