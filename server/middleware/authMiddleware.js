import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';
let isAuth = async (req, res, next) => {
    try {
        // console.log(req.headers);

        let token =req.cookies.token;
         console.log(token)
        if (!token) {
            let tokenNotErr = new Error("invalid credential");
            next(tokenNotErr)
        };

        let decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        let user = await userModel.findById(decode._id);
       console.log(user)
        req.user = user;

        return next()
    } catch (error) {
        console.log(error)
        next(error)
    }
};

let isAdmin = (req, res, next) => {
    try {
        if (req.user.role === !'admin') {
            let adminNotAuthEr = new Error("admin only ");
            next(adminNotAuthEr)
        }
        return next()
    } catch (error) {
        next(error)
    }
}

export { isAuth, isAdmin }