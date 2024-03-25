import { ServerWebSocket, WebSocketHandler } from "bun";

interface SocketSync {
  userId: string;
  channelId: string;
}

const handleSync = (
  message: string,
  channelId: string,
  ws: ServerWebSocket<SocketSync>,
) => {
  try {
    console.log("PUBLISH", ws.publish(channelId, message));
  } catch (e) {
    console.log("ee", e);
  }
};

const websockets: WebSocketHandler<SocketSync> = {
  open(ws) {
    const { userId, channelId } = ws.data;
    if (!ws.isSubscribed(channelId)) {
      ws.subscribe(channelId);
    }
    ws.publish(
      channelId,
      JSON.stringify({
        type: "open",
        payload: { message: `${userId} connects to channel ${channelId}` },
      }),
    );
  },
  message(ws, message) {
    const { userId, channelId } = ws.data;
    console.log("*****START******");
    console.log("userId", userId);
    console.log("channelId", channelId);
    console.log("ws.isSubscribed(channelId)", ws.isSubscribed(channelId));
    console.log("message", message);

    if (ws.isSubscribed(channelId)) {
      ws.publish(channelId, message);
    }

    console.log("*****END******");
  },
  close(ws) {
    const { userId, channelId } = ws.data;
    console.log("close ws", ws);

    const msg = `${userId} has left the chat`;
    ws.publish(channelId, msg);
    ws.unsubscribe(channelId);
  },
};

export default websockets;
