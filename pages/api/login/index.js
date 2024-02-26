import { User } from '@/database/models';
import jwt from "jsonwebtoken";

const createSendToken = (user, res) => {
    try {
        // const cookieOptions = {
        //     expires: new Date(
        //         Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
        //     ),
        //     httpOnly: true,
        // };
       

        // if (process.env.NODE_ENV === 'production') {
        //     cookieOptions.secure = true;
        // }

        const user_token = jwt.sign(
            {
                ...user
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_COOKIE_EXPIRES_IN || "7d" }
        );

        // res.setHeader('Set-Cookie', [
        //     `user_token=${user_token}; ${cookieOptions.expires.toUTCString()}; HttpOnly${cookieOptions.secure ? '; Secure' : ''}`,
        // ]);

        return res.status(200).json({
            status: 'success',
            message: 'Login Successfully',
            data: user,
            user_token
        });
    } catch (error) {
        console.error('Error creating and sending token:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


export default async (req, res) => {

    try {
        const { mobile, password } = req.body;

        if (!mobile || !password) {
            return res.status(200).json({
                status: 'fail',
                message: 'Please enter email and password',
            });
        }

        const user = await User.findOne({
            where: { mobile: mobile, password: password },
        });


        if (user) {
            createSendToken(user, res);
        }
        return;

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};
