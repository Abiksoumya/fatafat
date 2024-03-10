import axios from "axios";

export function http() {
  const http = axios.create({
    baseURL: "http://localhost:5000",
  });

  const token = localStorage.getItem("token");


  if (token) {
    http.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
  return http;
}
// export function attachToken(token: string) {
//   //To be activated later
//   http.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });
// }
