import API from "../framework/http/API";
import auth from "./auth";
import user from "./user";
import socket from "./socket";

const api = new API();

api.setEndpoints({
  ...api.endpoints,
  ...auth.endpoints,
  ...user.endpoints,
  ...socket.endpoints,
});
console.log("Endpoints Available:", api.endpoints);

export default api;
