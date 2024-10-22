import { Server } from './Server.js';
import dotenv from 'dotenv';

dotenv.config();
const realServer = new Server();
realServer.listen();
