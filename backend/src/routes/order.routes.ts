import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { OrderValidator } from '../validators/order.validator';
import { AuthMiddleware } from '../middlewares/authMiddleware';

const router: Router = Router();

// --- Các Route cho Đơn hàng (Order) ---

// [POST] /api/orders
// TẠO ĐƠN HÀNG MỚI (chỉ user đã đăng nhập)
router.post(
  '/',
  AuthMiddleware.isAuthorized, // 1. Phải đăng nhập
  OrderValidator.createOrderValidator, // 2. Dữ liệu phải hợp lệ
  AuthMiddleware.validateRequest, // 3. Kiểm tra kết quả validator
  OrderController.createOrder // 4. Chạy controller
);

// [GET] /api/orders/my-orders
// XEM LỊCH SỬ ĐƠN HÀNG CỦA TÔI (chỉ user đã đăng nhập)
router.get(
  '/my-orders',
  AuthMiddleware.isAuthorized,
  OrderController.getMyOrders
);

// [GET] /api/orders/restaurant/:restaurantId
// XEM ĐƠN HÀNG CỦA 1 QUÁN (chỉ Manager/Admin)
router.get(
  '/restaurant/:restaurantId',
  AuthMiddleware.isAuthorized,
  AuthMiddleware.isManager, // Dùng middleware của bạn
  OrderController.getOrdersByRestaurant
);

// [PUT] /api/orders/:orderId/status
// CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG (chỉ Manager/Admin)
router.put(
  '/:orderId/status',
  AuthMiddleware.isAuthorized,
  AuthMiddleware.isManager,
  OrderValidator.updateStatusValidator, // Validator mới
  AuthMiddleware.validateRequest,
  OrderController.updateOrderStatus // Controller mới
);

// (Sau này thêm router.put('/:orderId/status') để cập nhật trạng thái)

export const orderRouter: Router = router;