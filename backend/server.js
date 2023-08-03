import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import multer from "multer";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use("/public", express.static(path.join(__dirname, 'public')))
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public"),
  filename:(req, file, cb, filename) => {
    cb(null, uuidv4() + path.extname(file.originalname))
  }
})
app.use(multer({storage: storage}).single("image"))


app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);




try {
  await mongoose
    .connect(
      "mongodb+srv://Maudena:1ogj4glbhVa3ep1c@cluster0.4mbu3fv.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(console.log("DB ON"));
  app.listen(3000, () => console.log("Server Up"));
} catch (error) {
  console.log(error);
}
