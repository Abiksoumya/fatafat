import { DataTable } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import moment from "moment";
import { Button } from "primereact/button";
import { downloadCSV } from "../../helper/csv-download";
import { useAllTransaction } from "../../query/use-all-transaction";
import { Calendar } from "primereact/calendar";

interface Transaction {
  id: String;
  userId: String;
  otherId: string;
  timestamp: Date;
  point: number;
  type: string;
  balance: number;
}

export default function AllTransactionsTable() {
  const { data } = useAllTransaction();
  console.log(data);

  const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button
        type="button"
        label="Export Excel"
        onClick={() =>
          downloadCSV(data, `all-transaction${new Date().toLocaleDateString()}`)
        }
      />
    </div>
  );

  const dateTimeTemplate = (rowData: Transaction) => {
    return moment(new Date(rowData.timestamp)).format("YYYY-MM-DD HH:mm:ss");
  };

  return (
    <div className="card">
      <DataTable
        header={header}
        virtualScrollerOptions={{ lazy: true }}
        value={data}
        paginator
        rows={50}
        rowsPerPageOptions={[50, 100, 200, 500]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="userId" header="User Id" filter></Column>
        <Column field="type" header="Transaction Type" filter></Column>
        <Column field="point" header="Point" filter></Column>
        <Column field="balance" header="Balance"></Column>
        <Column field="otherId" header="Other Id"></Column>
        <Column
          filter
          dataType="date"
          filterField="date"
          field="createdAt"
          header="Creation Date & Time"
          filterElement={dateFilterTemplate}
          body={dateTimeTemplate}
        ></Column>
      </DataTable>
    </div>
  );
}
