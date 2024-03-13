import express from "express";
import { verifyUser } from "../middleware/verify-user";
import { getAllTransactionHandler } from "../handler/transaction/get-all-transaction-handdler";
import { getNumberWisePointValue } from "../handler/transaction/get-number-wise-point-value";
import { getAllPointBetsHandler } from "../handler/transaction/get-all-point-bets-handler";
import { getPattiWisePointValue } from "../handler/transaction/get-patti-wise-point-value";
import { getResultsHandler } from "../handler/transaction/get-result-handler";

const transRouter = express.Router();

//Get All USers
//userRouter.get("/all-users");
transRouter.use(verifyUser());
transRouter.get("/all", getAllTransactionHandler());
transRouter.get("/number-wise-point-value", getNumberWisePointValue);
transRouter.get("/all-point-bets", getAllPointBetsHandler);
transRouter.get("/all-patti-bets", getPattiWisePointValue);

export default transRouter;
