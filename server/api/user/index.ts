import API from "../../framework/http/API";
import { v4 } from "uuid";
import { APIResponse, ResponseJSON } from "../../framework/http/responseJSON";
import { Guard } from "../auth/guard";

const api = new API();

api.get(
  "/user/data",
  Guard(() => {
    return ResponseJSON<
      APIResponse<{
        user: {
          id: string;
          name: string;
          email: string;
          photo: string;
        };
      }>
    >(
      {
        status: "success",
        data: {
          user: {
            id: v4(),
            name: "Jaime",
            email: "j@somosradar.com",
            photo: "https://cdn-icons-png.flaticon.com/512/3176/3176151.png",
          },
        },
      },
      200,
    );
  }),
);

export default api;
