import { useNavigate } from "react-router-dom";

type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[] | { (): JSX.Element };
};

export default function ProtectedRoute({
  children,
}: {
  children: ChildrenProps;
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return navigate("/login");
  return children;
}
