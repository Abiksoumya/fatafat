import express from "express";
import { createUser } from "../handler/user/create-user";
import { getAllUSer } from "../handler/user/get-all-user";
import { verifyUser } from "../middleware/verify-user";
import { loginUserHandler } from "../handler/user/login-user";
import { activateUserHandler } from "../handler/user/activate-user";
import { deactivateUserHandler } from "../handler/user/deactivate-user";
import { verifyAdmin } from "../middleware/verify-admin";
import { verifyStokez } from "../middleware/verify-stokez";
import { createSuperAdmin } from "../handler/user/create-super-admin";
import { adjustCreditPointHandler } from "../handler/user/adjust-credit-point";
import { transferCreditPointHandler } from "../handler/user/transfer-credit-point";
import { getUserDetailsHandler } from "../handler/user/get-user-details";
import { createPointBet } from "../handler/user/create-point-bet";
import { createPattiBet } from "../handler/user/create-patti-bet";
import { declareResult } from "../handler/result/declare.result";

const userRouter = express.Router();

//Get All USers
//userRouter.get("/all-users");
userRouter.post("/create-super-admin", createSuperAdmin());
userRouter.post("/login", loginUserHandler());

userRouter.use(verifyUser());
//userRouter.use(verifyStokez());

//Stokez Level Access

//userRouter.use(verifyAdmin());
userRouter.get("/details", getUserDetailsHandler());

//Admin Level Access
userRouter.get("/all", getAllUSer());
userRouter.post("/create", createUser);
userRouter.patch("/activate/:userId", activateUserHandler());
userRouter.patch("/deactivate/:userId", deactivateUserHandler());
userRouter.post("/adjust-point", adjustCreditPointHandler());
userRouter.post("/transfer-point", transferCreditPointHandler());
userRouter.post("/point-bet", createPointBet());
userRouter.post("/patti-bet", createPattiBet());
userRouter.post("/declare", declareResult());


export default userRouter;
