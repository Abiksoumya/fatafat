import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Button } from "primereact/button";
import { downloadCSV } from "../../helper/csv-download";
import { useNumberWiseBetPoint } from "../../query/use-number-bet-point";

export default function BetPointTable() {
  const { data } = useNumberWiseBetPoint();
  console.log(data);

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button
        type="button"
        label="Export Excel"
        onClick={() =>
          downloadCSV(
            data?.data,
            `number-wise-point-value${new Date().toLocaleDateString()}`
          )
        }
      />
    </div>
  );

  return (
    <div className="card">
      <DataTable header={header} value={data?.data}>
        <Column field="point" header="Point"></Column>
        <Column field="sum" header="Sum"></Column>
      </DataTable>
    </div>
  );
}
