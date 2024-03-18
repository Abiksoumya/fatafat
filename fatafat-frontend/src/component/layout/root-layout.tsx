import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../header";
import Dashboard from "../../dashboard";

export const RootLayout: React.FC = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) navigate("/login");
      else navigate("/admin");
    }, []);

  return (
    <div>
      <Header />
      <div className="grid">
        <div className="sm:col-12 lg:col-2">
          <Dashboard />
        </div>
        <div className="sm:col-12 lg:col-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
