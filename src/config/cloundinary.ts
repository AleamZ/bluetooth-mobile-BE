import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();

// Validate environment variables
if (!process.env.CLOUND_NAME || !process.env.API_CLOUND_KEY || !process.env.API_CLOUND_SECRET) {
  console.warn("⚠️  Cloudinary environment variables are not set. Upload functionality may not work.");
}

cloudinary.config({
  cloud_name: process.env.CLOUND_NAME || "",
  api_key: process.env.API_CLOUND_KEY || "",
  api_secret: process.env.API_CLOUND_SECRET || "",
});

// Export wrapped cloudinary object for multer-storage-cloudinary compatibility
// multer-storage-cloudinary expects { v2: { uploader: ... } }
export default {
  v2: cloudinary,
};
