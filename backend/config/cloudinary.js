import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

const uploadCloudinary = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!file || !file.path) {
            throw new Error("File path missing");
        }

        const result = await cloudinary.uploader.upload(file.path);

        fs.unlinkSync(file.path);

        return result.secure_url;

    } catch (error) {
        if (file && file.path) {
            fs.unlinkSync(file.path);
        }
        console.log(error);
        throw error;
    }
}

export default uploadCloudinary;

