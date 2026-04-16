import { v2 as cloudinary } from 'cloudinary'
import fs, { unlinkSync } from 'fs'

const uploadCloudinary = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
        const result = cloudinary.uploader.upload(file);
        await fs.unlinkSync(file);
        return result.secure_url;
    } catch (error) {
        await fs.unlinkSync(file);
        console.log(error);
        return res.status(500).json({ message: `Error in Image Uplaoding: ${error}` });
    }
}
export default uploadCloudinary;

