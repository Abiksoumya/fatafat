import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../services/user";

export function useUserDetails() {
  return useQuery({
    queryKey: ["user-details"],
    queryFn: () => {
      return getUserDetails();
    },
  });
}
