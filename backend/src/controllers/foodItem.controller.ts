import { Request, Response, NextFunction } from 'express';
import { FoodItemService } from '../services/foodItem.service';
import { StatusCodes } from 'http-status-codes';

// Controller: Tạo món ăn mới
const createFoodItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.jwtDecoded.id; // Lấy ID của chủ quán từ token đã được xác thực
        const foodItemData = req.body;

        const foodItem = await FoodItemService.createFoodItemService(userId, foodItemData);
        res.status(StatusCodes.CREATED).json({
            message: 'Món ăn đã được tạo thành công!',
            data: foodItem
        });
    } catch (error) {
        next(error);
    }
};
// Controller: Lấy các món ăn của 1 quán
const getAllFoodItemsByRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { restaurantId } = req.params as { restaurantId: string };
        const foodItems = await FoodItemService.getAllFoodItemsByRestaurantService(restaurantId);
        res.status(StatusCodes.OK).json({
            message: 'Lấy danh sách món ăn thành công!',
            data: foodItems
        });
    } catch (error) {
        next(error);
    }
};
export const FoodItemController = {
    createFoodItem,
    getAllFoodItemsByRestaurant,
};