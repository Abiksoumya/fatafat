import { http } from "../helper/http";
import { decodeToken } from "../helper/jwt.halper";

export async function getAllTransaction() {
  const tokeData = decodeToken();

  const { data } = await http().get("/transaction/all");
  if (tokeData.role === "stokez") {
    const filteredData = data?.data.filter((item: any) => {
      // Check if the role is "stokez" and userId matches

      return item.userId === tokeData?.userId;
    });
    console.log("-------pppppppppppppppp", filteredData);

    return filteredData;
  }

  return data?.data;
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
