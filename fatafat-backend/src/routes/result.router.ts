import express from "express";
import { getResultsHandler } from "../handler/transaction/get-result-handler";

const result = express.Router();
result.get("/", getResultsHandler);


export default result;


