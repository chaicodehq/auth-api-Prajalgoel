import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";
import { User } from "../models/user.model.js";

/**
 * TODO: Register a new user
 *
 * 1. Extract name, email, password from req.body
 * 2. Check if user with email already exists
 *    - If yes: return 409 with { error: { message: "Email already exists" } }
 * 3. Create new user (password will be hashed by pre-save hook)
 * 4. Return 201 with { user } (password excluded by default)
 */

export async function registerController(req, res, next) {
    try {
        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(409).json({
                error: {
                    message: "Email already exists",
                },
            });

        const user = await User.create({ name, email, password, role });
        const userObject = user.toObject();
        delete userObject.password;

        return res.status(201).json({ user: userObject });
    } catch (error) {
        next(error);
    }
}

/**
 * TODO: Login user
 *
 * 1. Extract email, password from req.body
 * 2. Find user by email (use .select('+password') to include password field)
 * 3. If no user found: return 401 with { error: { message: "Invalid credentials" } }
 * 4. Compare password using bcrypt.compare(password, user.password)
 * 5. If password wrong: return 401 with { error: { message: "Invalid credentials" } }
 * 6. Generate JWT token with payload: { userId: user._id, email: user.email, role: user.role }
 * 7. Return 200 with { token, user } (exclude password from user object)
 */
export async function loginController(req, res, next) {
    try {
        // Your code here
        const { email, password } = req.body;

        const existing = await User.findOne({ email }).select("+password");
        if (!existing)
            return res.status(401).json({
                error: {
                    message: "Invalid credentials",
                },
            });

        const PasswordMatch = await bcrypt.compare(password, existing.password);
        if (!PasswordMatch)
            return res.status(401).json({
                error: {
                    message: "Invalid credentials",
                },
            });

        const token = signToken({
            userId: existing._id,
            email: existing.email,
            role: existing.role,
        });

        const user = existing.toObject();
        delete user.password;

        return res.status(200).json({
            token,
            user,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * TODO: Get current user
 *
 * 1. req.user is already set by auth middleware
 * 2. Return 200 with { user: req.user }
 */
export async function meController(req, res, next) {
    try {
        return res.status(200).json({
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
}
