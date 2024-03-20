import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Button } from "primereact/button";
import { downloadCSV } from "../../helper/csv-download";
import { useAllPointBets } from "../../query/use-all-point-bets";

export default function PointBetsTable() {
  const { data } = useAllPointBets();

  console.log(data);

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button
        type="button"
        label="Export Excel"
        onClick={() =>
          downloadCSV(
            data?.data,
            `all-point-bets${new Date().toLocaleDateString()}`
          )
        }
      />
    </div>
  );

  return (
    <div className="card">
      <button>
        
      </button>
      <DataTable header={header} value={data?.data}>
        <Column field="ticketNo" header="Ticket No"></Column>
        <Column field="userId" header="User Id"></Column>
        <Column field="point" header="Point"></Column>
        <Column field="betPoint" header="betPoint"></Column>
        <Column field="slot" header="Time Slot"></Column>
        <Column field="status" header="Status"></Column>
      </DataTable>
    </div>
  );
}
