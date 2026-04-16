import uploadCloudinary from "../config/cloudinaty";
import Item from "../models/item.model";
import Shop from "../models/shop.model";


export const addItem = async (req, res) => {
    try {
        const { name, category, category, foodType } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Item name is Required" });
        }
        if (!category) {
            return res.status(400).json({ message: "Item category is Required" });
        }
        if (!foodType) {
            return res.status(400).json({ message: "Item foodType is Required" });
        }

        let image;
        if (req.file) {
            image = await uploadCloudinary(req.file.path);
        }
        if (!image) {
            return res.status(400).json({ message: "Item image is Required" });
        }
        const shop = await Shop.findOne({ owner: req.user._id });
        if (!shop) {
            return res.status(404).json({ message: "Shop not found for the user" });
        }
        const item = await Item.create({
            name,
            category,
            price,
            foodType,
            image,
            shop: shop._id,
        })

        return res.status(201).json({ message: "Item added successfully", item });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in Item Adding", error });
    }
}

export const editItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const { name, category, price, foodType } = req.body;
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        if (item.shop.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to edit this item" });
        }
        if (name) item.name = name;
        if (category) item.category = category;
        if (price) item.price = price;
        if (foodType) item.foodType = foodType;
        if (req.file) {
            const image = await uploadCloudinary(req.file.path);
            item.image = image;
        }
        await item.save();
        return res.status(200).json({ message: "Item updated successfully", item });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in Item Updating", error });
    }
}