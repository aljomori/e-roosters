import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import API from "../../framework/http/API";
import { SECRET } from "../auth/constants";

const api = new API();

api.get("/socket", (req, server) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const channelId = url.searchParams.get("channelId");
  console.log("token", token);

  const isValidToken = jsonwebtoken.verify(token as string, SECRET);

  if (!isValidToken) {
    new Response("WebSocket upgrade error", { status: 401 });
  }
  const { userId } = isValidToken as JwtPayload;

  const success = server.upgrade(req, { data: { userId, channelId } });

  return success
    ? undefined
    : new Response("WebSocket upgrade error", { status: 400 });
});

export default api;
