import { Router } from "express";
import {
  getUserInfo,
  updateUserInfo,
  requestPasswordReset,
  resetPassword,
} from "../../controllers/user/infoController";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";

const userRouter = Router();

userRouter.get(
  "/get-user-info",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  getUserInfo
);
userRouter.post(
  "/update-user-info",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  updateUserInfo
);
userRouter.post(
  "/request-password-reset",
  authMiddleware,
  roleMiddleware(["admin", "super"]),
  requestPasswordReset
);
userRouter.post(
  "/reset-password",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  resetPassword
);
export default userRouter;