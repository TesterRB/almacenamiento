import { Server } from "./Server.js";
import dotenv from 'dotenv'

dotenv.config()
const RealServer = new Server()
RealServer.listen()