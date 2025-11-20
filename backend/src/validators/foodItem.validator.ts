import { body } from 'express-validator';

const createFoodItemValidator = [
  body('name')
    .notEmpty()
    .withMessage('Tên món ăn không được để trống'),
  body('price')
    .notEmpty()
    .withMessage('Giá tiền không được để trống')
    .isNumeric()
    .withMessage('Giá tiền phải là số'),
  body('restaurantId')
    .notEmpty()
    .withMessage('ID quán ăn là bắt buộc')
    .isMongoId()
    .withMessage('ID quán ăn không hợp lệ'),
  body('description')
    .optional()
    .isString(),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Link ảnh không hợp lệ'),
];

export const FoodItemValidator = {
  createFoodItemValidator,
};