import axios from "axios";
let base_url = "http://localhost:3000/";
if (import.meta.env.MODE === "production") {
  base_url = "https://some-production-url.com";
}
const apiConfig = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiConfig };
