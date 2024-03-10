import "./patti-table.css";
import { useAllPattiBets } from "../../query/use-all-patti-bets";
import { PATTIS } from "../../helper/constants";

export default function PattiBetsTable() {
  const { data, isFetched } = useAllPattiBets();

  let pattiMap = new Map<String, string>();
  console.log("jjjjjjjjjjjjjjjjjjjj",pattiMap);


  if (isFetched) {
    data.data.map(({ _id, total }: { _id: string; total: string }) =>
      pattiMap.set(_id, total)
    );
  }

  //   const header = (
  //     <div className="flex align-items-center justify-content-end gap-2">
  //       <Button
  //         type="button"
  //         label="Export Excel"
  //         onClick={() =>
  //           downloadCSV(
  //             data?.data,
  //             `all-point-bets${new Date().toLocaleDateString()}`
  //           )
  //         }
  //       />
  //     </div>
  //   );
  function PattiCell({ patti, total }: { patti: string; total: string }) {
    console.log('patti: ', patti, total);
    return (
      <div className="patti-cell">
        <h4 className="bg-primary">{patti}</h4>
        <h5>Total Bet = {total}</h5>
      </div>
    );
  }

  function PattiHeading({ point }: { point: number }) {
    return <h3 className="bg-secondary">{point}</h3>;
  }

  return (
    <div className="card patti-table">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <PattiHeading point={item} />
      ))}
      {isFetched &&
        PATTIS.map((item) => (
          <PattiCell patti={item} total={pattiMap.get(item) ?? "0"} />
        ))}
    </div>
  );
}
