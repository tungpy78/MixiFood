import Restaurant, { IRestaurant } from "../models/Restaurant"
import ApiError from "../utils/AppError";

// Service: Tạo quán mới
const createRestaurantService = async (
    name: string,
    address: string,
    ownerId: string, // ID từ người dùng đã xác thực
    imageUrl?: string,
    phone?: string) => {
    const restaurant = new Restaurant({
        name,
        address,
        ownerId,
        imageUrl,
        phone
    });

    await restaurant.save();
    return restaurant;
}
// Service: Lấy TẤT CẢ quán ăn (cho trang chủ)
const getAllRestaurantsService = async (): Promise<IRestaurant[]> => {
    const restaurants = await Restaurant.find().populate('ownerId', 'username email');
    return restaurants;
}
// Service: Lấy 1 quán ăn theo ID (cho trang chi tiết)
const getRestaurantByIdService = async (restaurantId: string): Promise<IRestaurant> => {
    const restaurant = await Restaurant.findById(restaurantId).populate('ownerId', 'username email');
    if (!restaurant) {
        throw new ApiError(404, 'Quán ăn không tồn tại.');
    }
    return restaurant;
}
export const RestaurantService = {
    createRestaurantService,
    getAllRestaurantsService,
    getRestaurantByIdService
};