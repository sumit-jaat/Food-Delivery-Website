import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({
            success: false,
            message:"User not authorized"
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error while authenticating"
        })
    }
}

export default authMiddleware;