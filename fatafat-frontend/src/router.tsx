import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard";
import LoginForm from "./component/forms/login-form";
import { RootLayout } from "./component/layout/root-layout";
import CreateUserForm from "./component/forms/create-user-form";
import AllUsersTable from "./component/tables/all-user-table";
import AdjustPointForm from "./component/forms/adjust-point-form";
import AllTransactionsTable from "./component/tables/all-transactions-table";
import BetPointTable from "./component/tables/bet-point-table";
import Result from "./component/result";
import PointBetsTable from "./component/tables/all-point-bets-table";
import PattiBetsTable from "./component/tables/all-patti-bets-table";
import { TransferPointForm } from "./component/forms/transfer-point-form";
import UpdateUserForm from "./component/forms/update.user.form";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <RootLayout />,
    children: [
      {
        path: "create-user",
        element: <CreateUserForm />,
      },
      {
        path: "all-users",
        element: <AllUsersTable />,
      },
      {
        path: "adjust-point",
        element: <AdjustPointForm />,
      },
      {
        path: "transfer-point",
        element: <TransferPointForm />,
      },
      {
        path: "all-transactions",
        element: <AllTransactionsTable />,
      },
      {
        path: "number-wise-bet-point",
        element: <BetPointTable />,
      },
      {
        path: "all-point-bets",
        element: <PointBetsTable />,
      },
      {
        path: "all-patti-bets",
        element: <PattiBetsTable />,
      },
      { path: "result", element: <Result /> },
      {
        path: "user-update/:id",
        element: <UpdateUserForm />,
      },

    ],
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  // { path: "result", element: <Result /> },
]);
