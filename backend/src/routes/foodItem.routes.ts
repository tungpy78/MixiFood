import { Router } from "express";
import { FoodItemController } from "../controllers/foodItem.controller";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { FoodItemValidator } from "../validators/foodItem.validator";

const router: Router = Router();
// --- Các Route cho Món ăn (FoodItem) ---

// [GET] /api/fooditems/restaurant/:restaurantId
// Lấy tất cả món ăn của 1 quán ăn
// AI CŨNG CÓ THỂ XEM
router.get(
  '/restaurant/:restaurantId', 
  FoodItemController.getAllFoodItemsByRestaurant
);

// [POST] /api/fooditems
// Tạo món ăn mới
// CHỈ CÓ "MANAGER" (Chủ quán/Admin) MỚI ĐƯỢC TẠO
router.post(
  '/',
  AuthMiddleware.isAuthorized, // 1. Phải đăng nhập
  AuthMiddleware.isManager,   // 2. Phải là Manager/Admin
  FoodItemValidator.createFoodItemValidator, // 3. Dữ liệu phải hợp lệ
  AuthMiddleware.validateRequest, // 4. Kiểm tra kết quả validator
  FoodItemController.createFoodItem // 5. Nếu qua hết, mới chạy controller
);

// (Sau này thêm router.put('/:id'), router.delete('/:id') ở đây)

export const foodItemRouter: Router = router;