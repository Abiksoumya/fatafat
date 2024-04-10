import { usebetDetailsByDate } from "../../query/user.report";
import { useLocation } from "react-router-dom";

export default function PattibetDetailsTable() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get("date");
  const userId = searchParams.get("userId");
  console.log(date, userId);

  const { data, isFetched } = usebetDetailsByDate(date);
  console.log("bet data by date", data, isFetched);

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-center p-2 font-medium text-gray-900">ID</th>
              <th className="text-center p-2 font-medium text-gray-900">
                Username
              </th>
              <th className="text-center p-2 font-medium text-gray-900">
                Play Point
              </th>
              <th className="text-center p-2 font-medium text-gray-900">
                Win Point
              </th>
              <th className="text-center p-2 font-medium text-gray-900">
                Agent Commission
              </th>
              <th className="text-center p-2 font-medium text-gray-900">NTP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border border-gray-100">
            <tr className="hover:bg-gray-50">
              <th className="flex gap-3 px-6 p-4 font-normal text-gray-900">
                <div className="text-sm">
                  <div className="text-gray-400">id</div>
                </div>
              </th>
              <td className="px-6 p-4">name</td>
              <td className="px-6 p-4">betPoint</td>
              <td className="px-6 p-4">winPoint</td>
              <td className="px-6 p-4">3</td>
              <td className="px-6 p-4">npn</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
