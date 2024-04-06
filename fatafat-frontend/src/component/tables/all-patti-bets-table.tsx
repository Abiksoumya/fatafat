import { useAllPattiBets } from "../../query/use-all-patti-bets";
import { PATTIS } from "../../helper/constants";

export default function PattiBetsTable() {
  const { data, isFetched } = useAllPattiBets();
  const slots = ["9.45", "11", "12.3", "2", "3.30", "5", "6.30", "8", "9.3"];

  let pattiData = {};

  if (isFetched) {
    data.data.forEach(({ _id, total }) => {
      const patti = _id.patti;
      const slot = _id.slot;
      
      pattiData[patti] = pattiData[patti] || {};
      pattiData[patti][slot] = total;
    });
  }

  const formatSlot = (slot) => {
    if (slot.includes(".")) {
      const [hour, minute] = slot.split(".");
      return `${hour.padStart(2, "0")}:${minute.padEnd(2, "0")}`;
    } else {
      return `${slot}.00`;
    }
  };

  return (
    <div className="overflow-x-auto p-10">
      <table className="min-w-full  p-10 divide-gray-200 shadow overflow-hidden sm:rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-1 text-left text-xs font-medium bg-orange-400 text-gray-50 uppercase tracking-wider">Patti</th>
            {slots.map((slot, index) => (
              <th key={index} className="px-4 py-2 text-center text-xs bg-orange-400 font-medium text-gray-50 uppercase tracking-wider">{formatSlot(slot)}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {PATTIS.map((patti, pattiIndex) => (
            <tr key={pattiIndex} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{patti}</td>
              {slots.map((slot, slotIndex) => (
                <td key={slotIndex} className="px-6 py-4 whitespace-nowrap text-gray-500">{pattiData[patti]?.[slot] || "0"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}