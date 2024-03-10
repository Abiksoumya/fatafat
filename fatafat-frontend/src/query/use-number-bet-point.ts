import { useQuery } from "@tanstack/react-query";
import { getNumberWiseBetPoint } from "../services/transaction";

export function useNumberWiseBetPoint() {
  return useQuery({
    queryKey: ["number-wise-bet-point"],
    queryFn: () => {
      return getNumberWiseBetPoint();
    },
  });
}
