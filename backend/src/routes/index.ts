import { Express } from "express"
import { authRouter } from "./auth.routes";
import { restaurantRouter } from "./restaurant.routes";
import { orderRouter } from "./order.routes";
import { foodItemRouter } from "./foodItem.routes";


const clientRoutes = (app: Express): void => {
    app.use('/api/auth', authRouter);
    app.use('/api/restaurants', restaurantRouter);
    app.use('/api/fooditems', foodItemRouter);
    app.use('/api/orders', orderRouter); // <-- 2. GẮN ROUTE MỚI
};

export default clientRoutes;