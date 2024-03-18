import { Menu } from "primereact/menu";
import { useUserDetails } from "./query/use-user-details";
import { useNavigate } from "react-router-dom";
import UserDetails from "./component/user-details-card";
import { MenuItem } from "primereact/menuitem";
export default function Dashboard() {
  const { data, isFetched, isError } = useUserDetails();
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      label: "Choose Actions",
      items: [
        
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
        // {
        //   label: "All Point Bets",
        //   command: () => navigate("/all-point-bets"),
        // },
        {
          label: "All Patti Bets",
          command: () => navigate("/admin/all-patti-bets"),
        },
        {
          label: "Adjust Point",
          command: () => navigate("/admin/adjust-point"),
        },
        {
          label: "Transfer Point",
          command: () => navigate("/admin/transfer-point"),

        },
        {
          label: "Result",
          command: () => navigate("/admin/result"),

        },
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

  console.log("data in dashboard",data);
  return (
    <div>
      <Menu model={menuItems} className="w-full md:w-15rem" />

      {isFetched && !isError && (
        <UserDetails
          user={{
            name: data.data?.name,
            balance: data.data?.balance,
            margin: data.data?.margin,
            id: data.data?.userId,
            role: data.data?.role,
            isActive: data.data?.isActive,
            ntp: data.data?.ntp,
          }}
        />
      )}
    </div>
  );
}
