import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {

    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "UserId is not Found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User is not Found" });
        }
        return res.status(201).json({
            message: "Current User fetch Successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        return res.status(500).json({ message: `Get Current User error ${error}` });
    }
}