// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");
// const cloudinary = require("../configs/cloudinaryConfig");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "HAIRHARMONY",
//   allowedFormats: ["jpg", "png", "jpeg"],
//   transformation: [{ width: 500, height: 500, crop: "limit" }],
// });

// const upload = multer({ storage: storage });

import cloudinaryStorage from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../../config/cloundinary";
import { ICustomParamsUpdate } from "../../types/custom-params-update.interface";
import { Request, Response } from "express";
import { BadRequestException } from "../../domain/exceptions/bad-request.exception";

// Validate cloudinary configuration before creating storage
if (!cloudinary || !cloudinary.v2 || !cloudinary.v2.uploader) {
  throw new Error(
    "Cloudinary is not properly configured. Please check your environment variables: CLOUND_NAME, API_CLOUND_KEY, API_CLOUND_SECRET"
  );
}

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: "WEBBLUETOOTH" as string,
    allowedFormats: ["jpg", "png", "jpeg"],
    // transformation: [{ width: 500, height: 500, crop: "limit" }] as any,
  } as ICustomParamsUpdate,
});

export const upload = multer({ storage: storage });

export const uploadImageSingle = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new BadRequestException("No file provided");
  }
  
  // Debug: Log req.file to see what Cloudinary returns
  console.log("Upload file object:", JSON.stringify(req.file, null, 2));
  
  // Cloudinary returns URL in different properties
  // Try secure_url first (HTTPS), then url, then path
  const fileUrl = (req.file as any).secure_url || 
                  (req.file as any).url || 
                  req.file.path;
  
  if (!fileUrl) {
    console.error("File object keys:", Object.keys(req.file));
    throw new BadRequestException("Failed to get file URL from Cloudinary");
  }
  
  res.json({ 
    url: fileUrl,
    public_id: (req.file as any).public_id || null
  });
};

export const uploadMultipleImages = async (req: Request, res: Response) => {
  if (!Array.isArray(req.files)) {
    throw new BadRequestException("Files not provided or incorrect format");
  }
  
  const fileLinks = req.files.map((file: any) => {
    const url = file.secure_url || file.url || file.path;
    return {
      url: url,
      public_id: file.public_id || null
    };
  });
  
  res.json({ urls: fileLinks });
};
