import { Router } from "express";
import { RestaurantController } from "../controllers/restaurant.controller";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { RestaurantValidator } from "../validators/restaurant.validator";

const router: Router = Router();

// --- Các Route cho Quán ăn (Restaurant) ---

// [GET] /api/restaurants
// AI CŨNG CÓ THỂ XEM
router.get(
  '/', 
  RestaurantController.getAllRestaurants
);

// [GET] /api/restaurants/:id
// AI CŨNG CÓ THỂ XEM
router.get(
  '/:id', 
  RestaurantController.getRestaurantById
);

// [POST] /api/restaurants
// CHỈ CÓ "MANAGER" (Chủ quán/Admin) MỚI ĐƯỢC TẠO
router.post(
  '/',
  AuthMiddleware.isAuthorized, // 1. Phải đăng nhập
  AuthMiddleware.isManager,   // 2. Phải là Manager/Admin (dùng middleware của bạn)
  RestaurantValidator.createRestaurantValidator, // 3. Dữ liệu phải hợp lệ
  AuthMiddleware.validateRequest, // 4. Kiểm tra kết quả validator
  RestaurantController.createRestaurant // 5. Nếu qua hết, mới chạy controller
);

export const restaurantRouter: Router = router;