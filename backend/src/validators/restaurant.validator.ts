import { body } from 'express-validator';

const createRestaurantValidator = [
  body('name')
    .notEmpty()
    .withMessage('Tên quán không được để trống')
    .isString()
    .withMessage('Tên quán phải là chuỗi'),
  body('address')
    .notEmpty()
    .withMessage('Địa chỉ không được để trống')
    .isString(),
  body('phone')
    .optional()
    .isString(),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Link ảnh không hợp lệ'),
];

export const RestaurantValidator = {
  createRestaurantValidator,
};