import { Request, Response, NextFunction } from 'express';
import { registerSchema, loginSchema, checkEmailSchema } from '../utils/validators';
import { userService } from '../services/userService';
import { AuthenticatedRequest } from '../middleware/auth';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validationResult = registerSchema.safeParse(req.body);
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0]?.message || 'Validation failed';
        res.status(400).json({
          success: false,
          message: firstError,
          code: 'VALIDATION_ERROR',
          errors: validationResult.error.flatten().fieldErrors,
        });
        return;
      }

      const { email, password, name, role } = validationResult.data;

      const isTaken = await userService.isEmailTaken(email);
      if (isTaken) {
        res.status(409).json({
          success: false,
          message: 'An account with this email address already exists',
          code: 'DUPLICATE_EMAIL',
        });
        return;
      }

      const newUser = await userService.createUser({
        email,
        password,
        name,
        role,
      });

      const tokens = userService.generateTokens(newUser);
      const sanitizedUser = userService.sanitizeUser(newUser);

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: {
          user: sanitizedUser,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validationResult = loginSchema.safeParse(req.body);
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0]?.message || 'Validation failed';
        res.status(400).json({
          success: false,
          message: firstError,
          code: 'VALIDATION_ERROR',
          errors: validationResult.error.flatten().fieldErrors,
        });
        return;
      }

      const { email, password } = validationResult.data;

      const user = await userService.findByEmail(email);
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS',
        });
        return;
      }

      const isMatch = await userService.comparePassword(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS',
        });
        return;
      }

      const tokens = userService.generateTokens(user);
      const sanitizedUser = userService.sanitizeUser(user);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: sanitizedUser,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async checkEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validationResult = checkEmailSchema.safeParse(req.body);
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0]?.message || 'Invalid email format';
        res.status(400).json({
          success: false,
          message: firstError,
          code: 'VALIDATION_ERROR',
        });
        return;
      }

      const { email } = validationResult.data;
      const isTaken = await userService.isEmailTaken(email);

      res.status(200).json({
        success: true,
        data: {
          email,
          available: !isTaken,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async me(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthenticated',
          code: 'UNAUTHENTICATED',
        });
        return;
      }

      const user = await userService.findById(req.user.id);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User profile not found',
          code: 'NOT_FOUND',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          user: userService.sanitizeUser(user),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({
          success: false,
          message: 'Refresh token is required',
          code: 'MISSING_REFRESH_TOKEN',
        });
        return;
      }

      const decoded = userService.verifyRefreshToken(refreshToken);
      const user = await userService.findById(decoded.sub);
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'User associated with token no longer exists',
          code: 'INVALID_TOKEN',
        });
        return;
      }

      const tokens = userService.generateTokens(user);
      res.status(200).json({
        success: true,
        data: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
        code: 'INVALID_TOKEN',
      });
    }
  },

  async logout(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  },
};
