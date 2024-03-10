import express from "express";
import userRouter from "./routes/user-router";
import bodyParser from "body-parser";
import { schedule } from "./job/publish-result";
import cors from "cors";
import transRouter from "./routes/transaction-router";
import { resetAndBackupNTP } from "./job/backup-and-reset-ntp";
import { connect } from "mongoose";
// import { DB, PORT, app } from "./app";
import { config } from "dotenv";
config();
const app = express();

//Use all routes
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRouter);
app.use("/transaction", transRouter);

const PORT = 5000;
const DB = 'mongodb+srv://soumyamohanty540:w0NXkYtEv2MTf8L2@cluster0.qlof1tt.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'

connect(DB as string)
  .then((connection) => {
    console.log(
      `🔑 Authentication database successfully running on ${connection.connection.host}`
    );
    // handlerUserCreateEvent();
    app.listen(PORT, () => {
      console.log(`🔑 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(`Error: ${err}`));

// schedule().start();

// resetAndBackupNTP().then((result) => {
//   console.log("Finished");
// });


