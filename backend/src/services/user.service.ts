import { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { JwtProvider } from "../providers/JwtProvider";
import ApiError from "../utils/AppError";

const registerUserService = async (username: string, email: string, phone: string, password: string) => {
    // Kiểm tra nếu user đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, 'Email đã được sử dụng bởi tài khoản khác.');
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
        throw new ApiError(400, 'Số điện thoại đã được sử dụng bởi tài khoản khác.');
    }
    // 2. Tạo user mới
    const user = new User({ 
        username, 
        email, 
        password, 
        phone
    });
    
    // 3. Lưu (password sẽ tự băm)
    await user.save();
    return user;
};
const loginUserService = async (emailorphone: string, password: string) => {
    // Tìm user theo email hoặc số điện thoại
    const user = await User.findOne({ $or: [{ "email": emailorphone }, { "phone": emailorphone }] }).select('+password');
    if (!user) {
        throw new ApiError(400, 'Tài khoản không tồn tại.');
    }
    // Kiểm tra mật khẩu
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(400, 'Mật khẩu không đúng.');
    }
    
    const playload = {
        id: user._id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        role: user.role
    };

    const accessToken = await JwtProvider.generateToken(
        playload,
        process.env.ACCESS_TOKEN_SECRET_SIGNATURE as string,
        "1h"
    );

    const refreshToken = await JwtProvider.generateToken(
        playload,
        process.env.REFRESH_TOKEN_SECRET_SIGNATURE as string,
        "7d"
    );

    return { accessToken, refreshToken, playload};
    
}
const refreshTokenService = async (refreshToken: string) => {
    console.log("refreshToken1", refreshToken)
    const refreshTokenDecoded = await JwtProvider.verifyToken(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_SIGNATURE as string
    ) as JwtPayload;
    console.log("refreshTokenDecoded", refreshTokenDecoded)
    const user = refreshTokenDecoded.userInfo
    console.log("user", user)
    
    

    const accessToken = await JwtProvider.generateToken(
        user,
        process.env.ACCESS_TOKEN_SECRET_SIGNATURE as string,
        // "5 s"
        "1h"
    )
    console.log("accessToken1", accessToken)
    
    
    return {
        accessToken
    };
}
export const UserService = {
    registerUserService,
    loginUserService,
    refreshTokenService
};