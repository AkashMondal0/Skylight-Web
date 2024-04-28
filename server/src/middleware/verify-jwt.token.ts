/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
function verifyToken(req: any, res: any, next: any) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        code: 0,
        message: "Access Denied",
        status_code: 401,
        data: {}
    });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            code: 0,
            message: "Invalid token",
            status_code: 404,
            data: {}
        });
    }
}

export default verifyToken;