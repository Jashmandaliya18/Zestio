import uploadCloudinary, { } from "../config/cloudinary.js"
import Shop from "../models/shop.model.js";

export const createAndEditShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Shop name is required" });
        }
        if (!city) {
            return res.status(400).json({ message: "City is required" });
        }
        if (!state) {
            return res.status(400).json({ message: "State is required" });
        }
        if (!address) {
            return res.status(400).json({ message: "Address is required" });
        }

        let image;
        if (req.file) {
            image = await uploadCloudinary(req.file.path);
        }
        if (!image) {
            return res.status(400).json({ message: "Shop image is required" });
        }
        let shop = await Shop.findOne({ owner: req.user._id });
        if (!shop) {
            shop = await Shop.create({
                name,
                image,
                owner: req.user._id,
                city,
                state,
                address,
            })
        } else {
            shop = await Shop.findByIdAndUpdate(shop._id, {
                name,
                image,
                owner: req.user._id,
                city,
                state,
                address,
            }, { new: true })
        }

        await newShop.populate("owner");
        return res.status(201).json({
            message: "New Shop Created Successfully",
            newShop: {
                _id: newShop._id,
                name: newShop.name,
                owner: newShop.owner,
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error in Shop Creation: ${error}` });
    }
}


export const getMyShop = async (req, res) => {
    try {
        const shop = Shop.findOne({ owner: req.user._id }).populate("owner items");
        if (!shop) {
            return res.status(400).json({ message: "Shop is not Found" });
        }
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({ message: `Error in getting my shop: ${error}` });
    }

}
