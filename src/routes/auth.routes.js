import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import * as controller from'../controllers/auth.controller.js'

/**
 * TODO: Define auth routes
 *
 * POST   /register  → register (no auth required)
 * POST   /login     → login (no auth required)
 * GET    /me        → me (requires authenticate middleware)
 */

const authRouter = Router();

// Your routes here
authRouter.post("/register", controller.registerController)
authRouter.post("/login", controller.loginController)
authRouter.get("/me", authenticate, controller.meController)

export default authRouter;
