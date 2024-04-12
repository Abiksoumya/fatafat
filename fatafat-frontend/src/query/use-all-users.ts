import { useQuery } from "@tanstack/react-query";
import { getAllUser, getAllUsers } from "../services/user";

export function useAllUsers() {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: () => {
      return getAllUsers();
    },
  });
}

export function useAllUser() {
  return useQuery({
    queryKey: ["all-user"],
    queryFn: () => {
      return getAllUser();
    },
  });
}
