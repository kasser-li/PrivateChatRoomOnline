import { Router } from "express";
import {
  sendMessage,
  getMessageList,
  deleteMessage,
  blockMessage,
} from "../../controllers/message/messageController";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";

const messageRouter = Router();

messageRouter.post(
  "/send-msg",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  sendMessage
);
messageRouter.get(
  "/get-msg-list",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  getMessageList
);
messageRouter.post(
  "/delete-msg",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  deleteMessage
);
messageRouter.post(
  "/block-msg",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  blockMessage
);
export default messageRouter;
