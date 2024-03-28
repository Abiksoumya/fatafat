import { Card } from "primereact/card";
type UserProps = {
  name: String;
  balance: number;
  margin: number;
  role: string;
  id: string;
  isActive: boolean;
  ntp: string;
};

export default function UserDetails({ user }: { user: UserProps }) {
  return (
    <>
      <Card title="User Details" className="w-full">
        <p>Name: {user?.name}</p>
        <p>User ID: {user?.id}</p>
        <p>Balance: {user?.balance}</p>
        <p>NTP: {user?.ntp}</p>
        <p>Margin: {Number(user?.margin)}%</p>
        <p>Role: {user?.role}</p>
        <p>Account Status: {user?.isActive ? "Active" : "Deactivated"}</p>
      </Card>
    </>
  );
}
