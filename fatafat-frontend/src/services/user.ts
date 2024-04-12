import { AdjustPointFormData } from "../component/forms/adjust-point-form";
import { CreateUserInputs } from "../component/forms/create-user-form";
import { TransferPointFormData } from "../component/forms/transfer-point-form";
import { ResultFormData } from "../component/result";
import { http } from "../helper/http";
import { decodeToken } from "../helper/jwt.halper";

export interface LoginPayload {
  username: string;
  password: string;
}
export async function loginUser(payload: LoginPayload) {
  console.log("================================", payload);

  const res = await http().post("/user/login", {
    username: payload.username,
    password: payload.password,
  });

  console.log("================================", res.data);
  if (res.data) {
    return res.data;
  }
}

export async function getUserDetails() {
  const { data } = await http().get("/user/details");
  console.log("User details", JSON.stringify(data));
  return data;
}

export async function createNewUser(payload: CreateUserInputs) {
  const { data } = await http().post("/user/create", payload);
  return data;
}

export async function updateUser(payload: CreateUserInputs, id: string) {
  console.log("Update user", JSON.stringify(payload));
  const { data } = await http().put(`/user/update/${id}`, payload);
  return data;
}

export async function getAllUsers() {
  const tokeData = decodeToken();
  const { data } = await http().get("/user/all");

  if (tokeData.role === "stokez") {
    const filteredData = data?.data.filter((item: any) => {
      // Check if the role is "stokez" and userId matches

      return item.role === "agent" && item.createdBy === tokeData?.userId;
    });

    return filteredData;
  }

  return data;
}

export async function getAllUser() {
  const { data } = await http().get("/user/all");

  return data;
}

export async function adjustPoint(paylaod: AdjustPointFormData) {
  const { data } = await http().post("/user/adjust-point", paylaod);
  return data;
}

export async function transferPoint(paylaod: TransferPointFormData) {
  console.log("result data", paylaod);

  const { data } = await http().post("/user/transfer-point", paylaod);

  console.log("Transfer point", data);
  return data;
}

export async function declareResult(paylaod: ResultFormData) {
  console.log("result data", paylaod);

  const { data } = await http().post("/user/declare", paylaod);
  return data;
}

export async function getReport() {
  const { data } = await http().get("/user/reports");
  return data;
}

export async function getBetDetailsByDate(id: string) {
  const { data } = await http().get(`/user/getPointByDate/${id}`);
  return data;
}
