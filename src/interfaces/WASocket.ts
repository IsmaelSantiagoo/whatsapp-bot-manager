export default interface WASocket {
  status: "wa-connected" | "wa-disconnected" | "wa-reconnecting" | "wa-waiting-connection" | "not-found";
}