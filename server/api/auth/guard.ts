import jsonwebtoken from "jsonwebtoken";
import { HandlerResponseFunction } from "../../framework/http/API";
import { SECRET } from "./constants";

export function Guard(
  handler: HandlerResponseFunction,
): HandlerResponseFunction {
  return (req, server) => {
    try {
      const authHeader = req.headers.get("Authorization");
      const token = authHeader?.split(" ")[1];

      const isValidToken = jsonwebtoken.verify(token as string, SECRET);

      if (isValidToken) {
        return handler(req, server);
      }
    } catch (e) {
      return new Response("Unauthorized", { status: 401 });
    }
  };
}
