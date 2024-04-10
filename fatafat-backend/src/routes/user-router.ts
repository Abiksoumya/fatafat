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
import { getResultsHandler } from "../handler/transaction/get-result-handler";
import { getBetPattiByUser } from "../handler/user/get.patti.user";
import { getPointByUser } from "../handler/user/get.point.report";
import { getAllReport, getReport } from "../handler/user/get.all.report";
import { updateUser } from "../handler/user/update.user";
import { getPointByDate } from "../handler/user/getPointByDate";

const userRouter = express.Router();

//Get All USers
//userRouter.get("/all-users");
userRouter.post("/create-super-admin", createSuperAdmin());
userRouter.post("/login", loginUserHandler());
userRouter.get("/allResult", getResultsHandler());
userRouter.get("/reports", getAllReport());

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
userRouter.get("/getPattiByUser", getBetPattiByUser());
userRouter.get("/getPointByUser", getPointByUser());
userRouter.get("/getPointByDate/:date", getPointByDate());

userRouter.get("/getReport", getReport());
userRouter.put("/update/:userId", updateUser);

export default userRouter;
