import io from "socket.io-client";
import { API_SOCKET } from "@env";

const socket = io(API_SOCKET); // Replace with your server URL

export default socket;
