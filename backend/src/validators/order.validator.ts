import { body } from 'express-validator';

const createOrderValidator = [
  body('restaurantId')
    .notEmpty().withMessage('ID quán ăn là bắt buộc')
    .isMongoId().withMessage('ID quán ăn không hợp lệ'),
  body('shippingAddress')
    .notEmpty().withMessage('Địa chỉ giao hàng không được để trống'),
  body('phone')
    .notEmpty().withMessage('Số điện thoại không được để trống'),
  body('items')
    .isArray({ min: 1 }).withMessage('Giỏ hàng không được để trống'),
  body('items.*.foodId') // Kiểm tra TỪNG PHẦN TỬ trong mảng items
    .notEmpty().withMessage('foodId là bắt buộc')
    .isMongoId().withMessage('foodId không hợp lệ'),
  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Số lượng phải ít nhất là 1'),
  // Bạn không cần validate price và name, chúng ta sẽ lấy nó từ DB cho an toàn
];

const updateStatusValidator = [
  body('status')
    .notEmpty().withMessage('Trạng thái là bắt buộc')
    .isIn(['confirmed', 'shipping', 'delivered', 'cancelled'])
    .withMessage('Trạng thái không hợp lệ'),
];

export const OrderValidator = {
  createOrderValidator,
  updateStatusValidator,
};