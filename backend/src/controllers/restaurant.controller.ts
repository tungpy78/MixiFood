import { Request, Response, NextFunction } from 'express';
import { RestaurantService } from '../services/restaurant.service';
import { StatusCodes } from 'http-status-codes';

// Controller: Tạo quán mới
const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, address, phone } = req.body;

        // Lấy ID của chủ quán TỪ TOKEN đã được xác thực
        const ownerId = req.jwtDecoded.id;
        const restaurant = await RestaurantService.createRestaurantService(name, address, ownerId, phone);
        res.status(StatusCodes.CREATED).json({
            message: 'Nhà hàng đã được tạo thành công!',
            data: restaurant
        });

    } catch (error) {
        next(error);
    }
};
// Controller: Lấy tất cả quán
const getAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurants = await RestaurantService.getAllRestaurantsService();
        res.status(StatusCodes.OK).json({
            message: 'Lấy danh sách nhà hàng thành công!',
            data: restaurants
        }); 
    } catch (error) {
        next(error);
    }
};
// Controller: Lấy 1 quán
const getRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params as { id: string }; // Lấy id từ URL
        const restaurant = await RestaurantService.getRestaurantByIdService(id);
        res.status(StatusCodes.OK).json({
            message: 'Lấy thông tin nhà hàng thành công!',
            data: restaurant
        });
    } catch (error) {
        next(error);
    }
};
export const RestaurantController = {
    createRestaurant, 
    getAllRestaurants,
    getRestaurantById
};