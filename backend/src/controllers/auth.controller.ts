import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/AppError';

const register = async (req: Request, res: Response, next: Function) => {
    try {
        const { username, email, phone, password } = req.body;

        const user = await UserService.registerUserService(email, password, username, phone);
        res.status(StatusCodes.CREATED).json({
            message: 'Bạn đã đăng ký thành công!',
            user
        });
    } catch (error) {
        next(error);
    }
};
const login = async (req: Request, res: Response, next: Function) => {
    try {
        const { email, password } = req.body;
        const tokens = await UserService.loginUserService(email, password);
        res.status(StatusCodes.OK).json({
            message: 'Đăng nhập thành công!',
            tokens
        });
    } catch (error) {
        next(error);
    }
};
const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Simulate refresh token logic
        const refreshToken = req.body.refreshToken;
        
        const response = await UserService.refreshTokenService(refreshToken);
        
        res.status(StatusCodes.OK).json(response);
        
    }
    catch (error) {
        next(error);
    }
}
export const AuthController = {
    register,
    login,
    refreshToken
};