import { Router } from 'express';
import { listUsers, getUser, deleteUser } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize} from '../middlewares/role.middleware.js';

/**
 * TODO: Define user routes (all require admin role)
 *
 * GET    /           → listUsers (requires authenticate and requireRole('admin'))
 * GET    /:id        → getUser (requires authenticate and requireRole('admin'))
 * DELETE /:id        → deleteUser (requires authenticate and requireRole('admin'))
 *
 * Apply authenticate middleware to all routes
 * Apply requireRole('admin') middleware to all routes
 */

const usersRouter = Router();

usersRouter.get("/", authenticate, authorize("admin"), listUsers)
usersRouter.get("/:id", authenticate, authorize("admin"), getUser)
usersRouter.delete("/:id", authenticate, authorize("admin"), deleteUser)

// Your routes here


export default usersRouter;
