import { sign } from "jsonwebtoken";
import { v4 } from "uuid";
import { SECRET } from "./constants";
import { APIResponse, ResponseJSON } from "../../framework/http/responseJSON";
import API from "../../framework/http/API";

const api = new API();

api.post("/login", (req) => {
  const token = sign(
    { userId: v4(), name: "Jaime", email: "j@somosradar.com" },
    SECRET,
    {
      expiresIn: "2 days",
    },
  );

  return ResponseJSON<APIResponse<{ token: string }>>(
    {
      status: "success",
      data: {
        token,
      },
    },
    200,
  );
});

export default api;
