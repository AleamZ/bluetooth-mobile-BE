import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.API_CLOUND_KEY,
  api_secret: process.env.API_CLOUND_SECRET,
});

export default cloudinary;
