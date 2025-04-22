import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  updateRoom,
  getRoomList,
  getRoomDetail,
  joinRoom,
  exitRoom,
  searchRoom,
} from "../../controllers/room/roomController";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";

const roomRouter = Router();

roomRouter.post(
  "/create-room",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  createRoom
);
roomRouter.post(
  "/update-room",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  updateRoom
);
roomRouter.post(
  "/delete-room",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  deleteRoom
);
roomRouter.get(
  "/get-room-list",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  getRoomList
);

roomRouter.get(
  "/get-room-detail",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  getRoomDetail
);
roomRouter.post(
  "/join-room",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  joinRoom
);
roomRouter.post(
  "/exit-room",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  exitRoom
);

roomRouter.get(
  "/search-room",
  authMiddleware,
  roleMiddleware(["admin", "super", "user"]),
  searchRoom
);

export default roomRouter;
