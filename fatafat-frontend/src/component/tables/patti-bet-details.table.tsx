import { usebetDetailsByDate } from "../../query/user.report";
import { useLocation } from "react-router-dom";

export default function PattibetDetailsTable() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get("date");
  const userId = searchParams.get("userId");
  console.log(date, userId);

  const { data, isFetched } = usebetDetailsByDate(userId);
  const filteredData = data?.data?.filter((item) => item.date === date);
  const totalBetAmount = filteredData?.reduce(
    (total, item) => total + (item.betPoint || 0),
    0
  );

  // Calculate total win bet amount
  const totalWinBetAmount = filteredData?.reduce(
    (total, item) => total + (item.winBetPoint || 0),
    0
  );

  console.log(filteredData);

  return (
    <>
      <div className="overflow-x-auto p-10">
        <h2 className="text-2xl ml-1 mb-4">Transaction Data</h2>
        <table className="min-w-full p-10 divide-gray-200 shadow overflow-hidden sm:rounded-lg">
          <thead className="bg-orange-500">
            <tr>
              <th className=" py-2 text-center text-xs font-medium text-gray-50 uppercase tracking-wider">
                Date
              </th>
              <th className=" py-2 text-center text-xs font-medium text-gray-50 uppercase tracking-wider">
                Slot
              </th>
              <th className=" py-2 text-center text-xs font-medium text-gray-50 uppercase tracking-wider">
                Patti
              </th>
              <th className=" py-2 text-center text-xs font-medium text-gray-50 uppercase tracking-wider">
                Bet Amount
              </th>
              <th className=" py-2 text-center text-xs font-medium text-gray-50 uppercase tracking-wider">
                Win Bet Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {filteredData?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.slot}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.patti}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.betPoint ? item.betPoint : 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.winBetPoint ? item.winBetPoint : 0}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-green-100">
              <td
                colSpan="3"
                className="px-8 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center font-bold">
                {totalBetAmount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center font-bold">
                {totalWinBetAmount}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
