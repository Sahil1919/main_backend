
import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadCloudinary = async (localFilePath) => {
  try {

    if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
    console.log("File Upload Successfully");
    fs.unlinkSync(localFilePath)
    return response
  }
  catch (error) {
    fs.unlinkSync(localFilePath)
    console.log("Unable to Upload File on Cloudinary");
    return null
  }
}

export {uploadCloudinary}