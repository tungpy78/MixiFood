import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthValidator } from "../validators/auth.validator";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.post('/register', AuthValidator.registerValidator,AuthMiddleware.validateRequest, AuthController.register);
router.post('/login', AuthValidator.loginValidator, AuthMiddleware.validateRequest, AuthController.login);
router.post('/refresh', AuthController.refreshToken);


export const authRouter: Router = router;