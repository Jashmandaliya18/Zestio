import JWT from "jsonwebtoken";

const getToken = async (userId) => {
    try {
        const secret = process.env.JWT_SECRET;
        const token = await JWT.sign({ userId }, secret, { expiresIn: "7d" });
        return token;

    } catch (error) {
        console.log(error);
        throw new Error("Token generation failed");
    }
}

export default getToken;