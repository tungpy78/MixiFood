import { StatusCodes } from "http-status-codes";
import Order, { IOrder, IOrderItem } from "../models/Order";
import Restaurant from "../models/Restaurant";
import ApiError from "../utils/AppError";
import FoodItem from "../models/FoodItem";

// Interface cho data giỏ hàng từ client
interface IClientItem {
  foodId: string;
  quantity: number;
}

// Service: Tạo đơn hàng mới
const createOrderService = async (
  userId: string, 
  restaurantId: string,
  shippingAddress: string,
  phone: string,
  items: IClientItem[]
): Promise<IOrder> => {
    // Logic để tạo đơn hàng mới sẽ được viết ở đây
    // 1. Kiểm tra quán ăn có tồn tại không
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy quán ăn');
    }
    // 2. Tính toán lại tổng tiền ở Backend (Để bảo mật, không tin giá tiền từ client)
    let totalPrice = 0;
    const processedItems: IOrderItem[] = [];

    for (const item of items) {
        const food = await FoodItem.findById(item.foodId);
        if (!food) {
            throw new ApiError(StatusCodes.NOT_FOUND, `Không tìm thấy món ăn với ID: ${item.foodId}`);
        }
        // Đảm bảo món ăn này thuộc quán ăn mà user đang đặt
        if (food.restaurantId !== restaurantId) {
            throw new ApiError(StatusCodes.BAD_REQUEST, `Món ăn với ID: ${item.foodId} không thuộc quán ăn này`);
        }
        processedItems.push({
        foodId: food._id,
        name: food.name,
        price: food.price,
        quantity: item.quantity,
        });
        totalPrice += food.price * item.quantity;
    }   
    // 3. Tạo đơn hàng mới trong DB
    const order = new Order({
    userId,
    restaurantId,
    items: processedItems,
    totalPrice,
    shippingAddress,
    phone,
    status: 'pending',
  });
    await order.save();
    return order;
};
// Service: Lấy đơn hàng của 1 user
const getOrdersByUserService = async (userId: string): Promise<IOrder[]> => {
    return await Order.find({ userId: userId }).sort({ createdAt: -1 });
}
// Service: Lấy đơn hàng của 1 quán ăn (cho chủ quán)
const getOrdersByRestaurantService = async (
    ownerId: string, // ID chủ quán từ token
    restaurantId: string
): Promise<IOrder[]> => {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy quán ăn');
    }
    if (restaurant.ownerId !== ownerId) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Bạn không có quyền xem đơn hàng của quán ăn này');
    }
    // 3. Lấy đơn hàng
    return await Order.find({ restaurantId: restaurantId })
    .populate('userId', 'username phone') // Lấy cả tên và SĐT người đặt
    .sort({ createdAt: -1 });
}
const updateOrderStatusService = async (
    ownerId: string, // ID chủ quán từ token
    orderId: string,
    newStatus: 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
): Promise<IOrder | null> => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy đơn hàng');
    }
    const restaurant = await Restaurant.findById(order.restaurantId);
    if (!restaurant) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy quán ăn của đơn hàng này');
    }
    if (restaurant.ownerId !== ownerId) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Bạn không có quyền cập nhật đơn hàng của quán ăn này');
    }
    order.status = newStatus;
    await order.save();
    return order;
};
export const OrderService = {
    createOrderService,
    getOrdersByUserService,
    getOrdersByRestaurantService,
    updateOrderStatusService
};