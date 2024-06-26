import { Menu } from "primereact/menu";
import { useUserDetails } from "./query/use-user-details";
import { useNavigate } from "react-router-dom";
import UserDetails from "./component/user-details-card";
import { MenuItem } from "primereact/menuitem";
import { useEffect, useState } from "react";
import { decodeToken } from "./helper/jwt.halper";
export default function Dashboard() {
  const { data, isFetched, isError } = useUserDetails();
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  console.log("user dataggggg", user);
  useEffect(() => {
    const tokeData = decodeToken();
    console.log("token data", tokeData);
    setUser(tokeData);
  }, []);

  const menuItems: MenuItem[] = [
    {
      label: "Choose Actions",
      items: [
        {
          label: "Home",
          command: () => {
            navigate("/admin/");
          },
        },

        {
          label: "Create User",
          command: () => {
            navigate("/admin/create-user");
          },
        },
        {
          label: "All Users",
          command: () => {
            navigate("/admin/all-users");
          },
        },
        {
          label: "Debit / Credit History",
          command: () => navigate("/admin/all-transactions"),
        },
        {
          label: "Number Wise Bet Point",
          command: () => navigate("/admin/number-wise-bet-point"),
        },

        {
          label: "Transfer Point",
          command: () => navigate("/admin/transfer-point"),
        },

        ...(user?.role === "admin"
          ? [
              {
                label: "Result",
                command: () => navigate("/admin/result"),
              },
              {
                label: "All Patti Bets",
                command: () => navigate("/admin/all-patti-bets"),
              },
            ]
          : []),
        {
          label: "Logout",
          command: () => {
            localStorage.removeItem("token");
            navigate("/login");
          },
        },
      ],
    },
  ];

  return (
    <div>
      <Menu model={menuItems} className="w-full md:w-15rem" />

      {isFetched && !isError && (
        <UserDetails
          user={{
            name: data?.data?.name,
            balance: data?.data?.balance,
            margin: data?.data?.margin,
            id: data?.data?.userId,
            role: data?.data?.role,
            isActive: data?.data?.isActive,
            ntp: data?.data?.ntp,
          }}
        />
      )}
    </div>
  );
}
