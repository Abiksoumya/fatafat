import { useAllUsers } from "../../query/use-all-users";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import moment from "moment";
import { Button } from "primereact/button";
import { downloadCSV } from "../../helper/csv-download";
import { useEffect, useState } from "react";
import { http } from "../../helper/http";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface User {
  id: String;
  userId: String;
  createdAt: Date;
  name: String;
  role: String;
  margin: number;
  isActive: boolean;
  createdBy: String;
  balance: number;
  ntp: number;
}

export default function AllUsersTable() {
  const { data } = useAllUsers();
  const [user, setUser] = useState<User>();
  const [show, setShow] = useState(false);
  const client = useQueryClient();
  console.log("--------------", data);

  const navigate = useNavigate();
  const handleEdit = (userId: any) => {
    navigate(`/admin/user-update/${userId}`);
  };

  // console.log("filter data", filteredData);

  const header = (
    <div className="flex align-items-center justify-content-end gap-1">
      <Button
        type="button"
        label="Export Excel"
        onClick={() =>
          downloadCSV(data, `user-lists${new Date().toLocaleDateString()}`)
        }
      />
    </div>
  );

  const activeTemplate = (rowData: User) => {
    return (
      <Tag
        value={rowData.isActive ? "Active" : "Disabled"}
        severity={rowData.isActive ? "success" : "danger"}
      />
    );
  };

  const dateTimeTemplate = (rowData: User) => {
    return moment(new Date(rowData.createdAt)).format("YYYY-MM-DD HH:mm:ss");
  };
  return (
    <div className="card">
      {show && (
        <Button
          label={
            user?.isActive
              ? `Deactivate ${user?.userId}`
              : `Activate ${user?.userId}`
          }
          className="m-4"
          severity={user?.isActive ? "danger" : "info"}
          onClick={() => {
            http()
              .patch(
                `/user/${user?.isActive ? "deactivate" : "activate"}/${
                  user?.userId
                }`
              )
              .then((data) => {
                console.log(data);
                client.invalidateQueries({ queryKey: ["all-users"] });
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
      )}
      <DataTable
        header={header}
        virtualScrollerOptions={{ lazy: true }}
        value={data}
        paginator
        rows={50}
        rowsPerPageOptions={[50, 100, 200, 500]}
        tableStyle={{ minWidth: "50rem" }}
        onRowSelect={(e) => {
          setShow(true);
          setUser(e.data);
        }}
        onRowUnselect={(e) => {
          setShow(false);
        }}
      >
        <Column selectionMode="single" headerStyle={{ width: "2rem" }}></Column>
        {/* <Column field="userId" header="User Id" filter></Column> */}
        <Column field="name" header="Name" filter></Column>
        <Column field="password" header="Password" filter></Column>
        <Column
          field="isActive"
          header="Account Status"
          filter
          body={activeTemplate}
        ></Column>
        <Column field="role" header="Type Of User" filter></Column>
        <Column field="balance" header="Balance"></Column>
        <Column field="margin" header="Margin %"></Column>
        {/* <Column field="ntp" header="NTP"></Column> */}
        <Column field="createdBy" header="Created By"></Column>
        {/* <Column
          field="createdAt"
          header="Creation Date & Time"
          body={dateTimeTemplate}
          headerStyle={{ width: "2rem" }}
        ></Column> */}
        <Column
          header="Action"
          body={(rowData) => (
            <Button
              label="Edit"
              className="p-button-rounded p-button-success"
              onClick={() => handleEdit(rowData.userId)}
            />
          )}
          style={{ textAlign: "center", width: "3rem" }}
        />
      </DataTable>
    </div>
  );
}
