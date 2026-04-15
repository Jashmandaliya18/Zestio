import JWT from "jsonwebtoken"

export const isAuth = async (req, res, next) => {
    try {
        console.log("cookies:", req.cookies);

        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Token not Found" });
        }
        const decodeToken = JWT.verify(token, process.env.JWT_SECRET);
        if (!decodeToken) {
            return res.status(400).json({ message: "Token not Verify" });
        }
        console.log(decodeToken);
        req.userId = decodeToken.userId;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "isAuth Error" });
    }
}