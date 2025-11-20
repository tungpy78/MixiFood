import { StatusCodes } from "http-status-codes";
import FoodItem, { IFoodItem } from "../models/FoodItem";
import ApiError from "../utils/AppError";
import { RestaurantService } from "./restaurant.service";

// Interface cho data tạo món ăn
interface IFoodItemData {
  name: string;
  price: number;
  restaurantId: string;
  description?: string;
  imageUrl?: string;
}
// Service: Tạo món ăn mới
const createFoodItemService = async (
    userId: string, // ID của chủ quán (từ token)
    foodItemData: IFoodItemData
): Promise<IFoodItem> => {
  // Kiểm tra quán ăn có tồn tại không
  const restaurant = await RestaurantService.getRestaurantByIdService(foodItemData.restaurantId);
  if (!restaurant) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Quán ăn không tồn tại');
  }
    if (restaurant.ownerId !== userId) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Bạn không có quyền thêm món ăn cho quán này');
  }
    // Tạo món ăn mới
    const foodItem = new FoodItem({
    ...foodItemData,
  });

  await foodItem.save();
  return foodItem;
}
// Service: Lấy TẤT CẢ món ăn của 1 quán (cho trang chi tiết)
const getAllFoodItemsByRestaurantService = async (restaurantId: string): Promise<IFoodItem[]> => {
    const foodItems = await FoodItem.find({ restaurantId });
    if (!foodItems) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy món ăn nào cho quán này');
    }
    return foodItems;
}

export const FoodItemService = {
  createFoodItemService,
  getAllFoodItemsByRestaurantService,   
};