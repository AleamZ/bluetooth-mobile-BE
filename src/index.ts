import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB";
import { mainRoutes } from "./presentations/routes/main.route";
import { configureSocketIO } from "./config/socket-io";
import http from "http";
import { startPromotionCron } from "./infrastructure/cron/promotion.cron";
dotenv.config();
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = configureSocketIO(server);
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

connectDB().then(() => {
  startPromotionCron();
});

mainRoutes(app);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
