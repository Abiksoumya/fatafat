
import { useAllUsers } from "../../query/use-all-users";
import { useAllUsersReport } from "../../query/user.report";

export default function BetPointTable() {

  const { data, isFetched } = useAllUsersReport();

  const userData  = useAllUsers();

  console.log("table",data);
  

console.log("user data ---------- ",userData?.data?.data);

 


  return (
    <>
<div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
  <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead className="bg-gray-200">
      <tr>
      <th className="text-center p-2 font-medium text-gray-900">ID</th>
        <th  className="text-center p-2  font-medium text-gray-900">Username</th>
        <th className="text-center p-2 font-medium text-gray-900">Play Point</th>
        <th  className="text-center p-2 font-medium text-gray-900">Win Point</th>
        <th  className="text-center p-2 font-medium text-gray-900  ">Agent Commission</th>
        <th  className="text-center p-2 font-medium text-gray-900">NTP</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 border border-gray-100">
      {
        data?.data?.map((item:any, index:any) =>(
          <tr key={index} className="hover:bg-gray-50">
          <th className="flex gap-3 px-6 p-4 font-normal text-gray-900">
            <div className="text-sm">
              <div className="font-medium text-gray-700"></div>
              <div className="text-gray-400">{item?.userId}</div>
            </div>
          </th>
          <td className="px-6 p-4">
                  {/* Find the corresponding user data by userId */}
                  {userData.data.data.find((user: any) => user._id === item?.user)?.name || "Unknown"}
                </td>
          <td className="px-6 p-4">{item?.totalBetPoint}</td>
          <td className="px-6 p-4">
            {item?.totalWinBetPoint}
          </td>
          <td className="px-6 p-4">
           102.23
          </td>
          <td className="px-6 p-4">
                  {/* Find the corresponding user data by userId */}
                  {userData.data.data.find((user: any) => user._id === item?.user)?.ntp.toFixed(1) || "Unknown"}
                </td>
        </tr>
        ))
      }
     
    </tbody>
  </table>
</div>
    </>
  );
}
