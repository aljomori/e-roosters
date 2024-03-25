import api from "./api";
import websockets from "./websockets";

const server = Bun.serve<{ userId: string; channelId: string }>({
  fetch: (req, server) => api.listen(req, server),
  websocket: websockets,
});

console.log("api", api.endpoints);
console.log(`Listening on ${server.hostname}:${server.port}`);
