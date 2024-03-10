import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/user";

export function useAllUsers() {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: () => {
      return getAllUsers();
    },
  });
}
