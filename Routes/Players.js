import { Router } from "express";
import { GetAllPlayers } from "../Controllers/Players.js";
import { GetPlayerId } from "../Controllers/Players.js";
import { PlayersByName } from "../Controllers/Players.js"
import { InsertPlayer } from "../Controllers/Players.js";
import { DeletePlayer } from "../Controllers/Players.js";
import { GetTeams } from "../Controllers/Players.js";

const PlayerServerResponse = Router()

PlayerServerResponse.get('/', GetAllPlayers)
PlayerServerResponse.get('/:Id', GetPlayerId)
PlayerServerResponse.get('/Search/:Name', PlayersByName)
PlayerServerResponse.get('/SearchTeam/:Name/:Select', GetTeams)
PlayerServerResponse.get('/SearchTeam/:Name', GetTeams)
PlayerServerResponse.delete('/:Id',DeletePlayer)
PlayerServerResponse.post('/', InsertPlayer)



export {PlayerServerResponse}