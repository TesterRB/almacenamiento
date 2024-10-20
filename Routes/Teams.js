import { Router } from "express";
import { InsertTeam } from "../Controllers/Teams.js";
import { GetTeams } from "../Controllers/Teams.js";
import { TeamByName } from "../Controllers/Teams.js";
import { DeleteTeam } from "../Controllers/Teams.js";


const TeamServerResponse = Router();

TeamServerResponse.get("/", GetTeams)
TeamServerResponse.get("/:Name", TeamByName)
TeamServerResponse.post("/Insert", InsertTeam)
TeamServerResponse.delete("/Delete/:Id", DeleteTeam)

export {TeamServerResponse} 