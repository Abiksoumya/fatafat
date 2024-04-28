import { useEffect, useState } from "react";
import { useAllUsersReport } from "../../query/user.report";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import queryString from "query-string";

export default function BetPointTable() {
  const { data, isFetched } = useAllUsersReport();
  const [filteredData, setFilteredData] = useState([]);
  const [filterOption, setFilterOption] = useState("today");
  const [date, setDate] = useState("");

  console.log("data.................", data);

  // Default filter option

  const navigate = useNavigate();
  const handleEdit = (userId: any, date: string) => {
    const queryParams = queryString.stringify({ date: date, userId: userId });
    navigate(`/admin/user-bet-details?${queryParams}`);
  };

  useEffect(() => {
    if (isFetched && data) {
      const today = new Date();
      const todayDateString = today.toISOString().split("T")[0];
      setDate(todayDateString);

      let filteredDataArray = [];
      switch (filterOption) {
        case "today":
          filteredDataArray = data.filter((item) =>
            item.timestamp.startsWith(todayDateString)
          );
          break;
        case "yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayDateString = yesterday.toISOString().split("T")[0];
          filteredDataArray = data.filter((item) =>
            item.timestamp.startsWith(yesterdayDateString)
          );
          setDate(yesterdayDateString);

          break;
        case "lastWeek":
          const lastWeekStart = new Date(today);
          lastWeekStart.setDate(lastWeekStart.getDate() - 7); // Date of the start of last week
          const lastWeekEnd = new Date(today);
          lastWeekEnd.setDate(lastWeekEnd.getDate() - 1); // Date of the end of last week
          const lastWeekStartString = lastWeekStart.toISOString().split("T")[0];
          const lastWeekEndString = lastWeekEnd.toISOString().split("T")[0];
          filteredDataArray = data.filter((item) => {
            const itemDate = new Date(item.timestamp)
              .toISOString()
              .split("T")[0];
            return (
              itemDate >= lastWeekStartString && itemDate <= lastWeekEndString
            );
          });
          break;
        default:
          break;
      }
      setFilteredData(filteredDataArray);
    }
  }, [isFetched, data, filterOption]);

  const handleFilterOptionChange = (option) => {
    setFilterOption(option);
  };

  return (
    <>
      <div className="flex justify-center space-x-4 m-5">
        <button
          className={`px-4 py-2 rounded-lg ${
            filterOption === "today" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterOptionChange("today")}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filterOption === "yesterday"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleFilterOptionChange("yesterday")}
        >
          Yesterday
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filterOption === "lastWeek"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleFilterOptionChange("lastWeek")}
        >
          Last Week
        </button>
      </div>

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
              <th className="text-center p-2 font-medium text-gray-900">
                View
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border border-gray-100">
            {filteredData.map((item, index) => (
              <tr className="hover:bg-gray-50" key={index}>
                <th className="flex gap-3 px-6 p-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="text-gray-400">{item.userId}</div>
                  </div>
                </th>
                <td className="px-6 p-4">{item.userName}</td>
                <td className="px-6 p-4">{item.betPoint}</td>
                <td className="px-6 p-4">{item.winPoint}</td>
                <td className="px-6 p-4">{item.margin}</td>
                <td className="px-6 p-4">{item.ntp}</td>
                <Button
                  label="view"
                  className="p-button-rounded p-button-success mt-1"
                  onClick={() => handleEdit(item?.userId, date)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
