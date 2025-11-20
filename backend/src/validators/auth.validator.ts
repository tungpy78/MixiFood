import { body } from "express-validator";

const registerValidator = [
    body('email')
    .isEmail().withMessage('Email không hợp lệ.')
    .normalizeEmail(),
    body('password')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự.'),
    body('username')    
    .notEmpty().withMessage('Tên người dùng không được để trống.')
    .isLength({ max: 30 }).withMessage('Tên người dùng không được vượt quá 30 ký tự.'),
    body('role')
    .optional()
    .isIn(['customer', 'admin', 'restaurant_owner']).withMessage('Vai trò không hợp lệ.')
];
const loginValidator = [
    body('email')
    .notEmpty().withMessage('Email hoặc Số điện thoại không được để trống.'),
    body('password')
    .notEmpty().withMessage('Mật khẩu không được để trống.')
];

export const AuthValidator = {
    registerValidator,
    loginValidator
};