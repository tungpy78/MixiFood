import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';
import { StatusCodes } from 'http-status-codes';

// Controller: Tạo đơn hàng
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.jwtDecoded.id; // Lấy từ token
        const { restaurantId, items, shippingAddress, phone } = req.body;
        const order = await OrderService.createOrderService(
            userId, 
            restaurantId, 
            shippingAddress, 
            phone,
            items
        );
        res.status(StatusCodes.CREATED).json({
        message: 'Đặt hàng thành công!',
        data: order
        });
    } catch (error) {
        next(error);
    }
};
// Controller: Lấy lịch sử đơn hàng của tôi
const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.jwtDecoded.id; // Lấy từ token
        const orders = await OrderService.getOrdersByUserService(userId);
        res.status(StatusCodes.OK).json({
        message: 'Lấy danh sách đơn hàng thành công!',
        data: orders
        });
    } catch (error) {
        next(error);
    }
};
// Controller: Lấy đơn hàng của 1 quán (cho chủ quán)
const getOrdersByRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ownerId = req.jwtDecoded.id; // Lấy từ token
       const { restaurantId } = req.params as { restaurantId: string }; // Lấy từ URL
        const orders = await OrderService.getOrdersByRestaurantService(ownerId, restaurantId);
        res.status(StatusCodes.OK).json({
        message: 'Lấy danh sách đơn hàng của quán thành công!',
        data: orders
        });
    } catch (error) {
        next(error);
    }
};
const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ownerId = req.jwtDecoded.id; // Lấy từ token
        const { orderId } = req.params as { orderId: string }; // Lấy từ URL
        const { status } = req.body;
        const updatedOrder = await OrderService.updateOrderStatusService(ownerId, orderId, status);
        res.status(StatusCodes.OK).json({
        message: 'Cập nhật trạng thái đơn hàng thành công!',
        data: updatedOrder
        });
    } catch (error) {
        next(error);
    }
};
export const OrderController = {
    createOrder, 
    getMyOrders,
    getOrdersByRestaurant,
    updateOrderStatus
};