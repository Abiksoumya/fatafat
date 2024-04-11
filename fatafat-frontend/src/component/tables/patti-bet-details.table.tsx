import { usebetDetailsByDate } from "../../query/user.report";
import { useLocation } from "react-router-dom";

export default function PattibetDetailsTable() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get("date");
  const userId = searchParams.get("userId");
  console.log(date, userId);

  const { data, isFetched } = usebetDetailsByDate(date);

  function filterDataByUserId(data: any, userId: any) {
    // Filter the data based on the provided userId
    return data?.data.filter((item) => item.userId === userId);
  }

  const filteredData = filterDataByUserId(data, userId);

  const uniqueSlots = [...new Set(filteredData?.map((item) => item.slot))];
  const slotToTotalBetMap = new Map();
  filteredData?.forEach((item) => {
    item.numbers.forEach((number) => {
      slotToTotalBetMap.set(
        number.slot,
        (slotToTotalBetMap.get(number.slot) || 0) + number.totalBetAmount
      );
    });
  });
  console.log(filteredData);

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border border-gray-200 text-left">
              UserId
            </th>
            {/* Dynamically generate table headers for each unique slot */}
            {uniqueSlots?.map((slot) => (
              <th
                key={slot}
                className="px-6 py-3 border border-gray-200 text-left"
              >
                Slot {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Map through data and display user information */}
          {filteredData?.map((item) => (
            <tr key={item.userId} className="border border-gray-200">
              <td className="px-6 py-4 border border-gray-200">
                {item.userId}
              </td>
              {/* Map through unique slots again to display corresponding totalBetAmount */}
              {uniqueSlots.map((slot) => (
                <td
                  key={`${item.userId}-${slot}`}
                  className="px-6 py-4 border border-gray-200"
                >
                  {/* Retrieve totalBetAmount from lookup object or display 0 */}
                  {slotToTotalBetMap.get(slot) || 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
