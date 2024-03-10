import { http } from "../helper/http";

export async function getAllTransaction() {
  const { data } = await http().get("/transaction/all");
  return data;
}

export async function getNumberWiseBetPoint() {
  const { data } = await http().get("/transaction/number-wise-point-value");
  return data;
}

export async function getAllPointBets() {
  const { data } = await http().get("/transaction/all-point-bets");
  return data;
}

export async function getAllPattiBets() {
  const { data } = await http().get("/transaction/all-patti-bets");
  return data;
}
