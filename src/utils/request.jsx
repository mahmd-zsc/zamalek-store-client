import axios from "axios";

const request = axios.create({
  // baseURL: "http://localhost:3000/",
  // baseURL: "https://backend-dbflgyq7h-mahmdzscs-projects.vercel.app/",
  baseURL: "https://zamalek-server.vercel.app/api/",
});

export default request;
