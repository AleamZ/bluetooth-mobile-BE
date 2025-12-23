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
  origin: [
    "https://www.bluetoothmobile.vn",
    "www.bluetoothmobile.vn",
    "http://localhost:5173",
    "https://bluetooth-mobile-fe-git-main-aleamzs-projects.vercel.app",
    "https://bluetooth-mobile-git-main-aleamzs-projects.vercel.app",
    "https://bluetooth-mobile-ejwqrhdxa-aleamzs-projects.vercel.app" // thay đúng domain vercel của bạn vào đây
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};


app.use(cors(corsOptions));

connectDB().then(() => {
  startPromotionCron();
});

mainRoutes(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("\n🚀 Server đã khởi động thành công!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📍 Local:   http://localhost:${PORT}`);
  console.log(`📍 Network: http://0.0.0.0:${PORT}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
});
