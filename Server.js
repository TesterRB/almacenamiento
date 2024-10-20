import express from 'express'
import cors from 'cors'
import { DATASTORAGE } from './DB/MongoConnection.js'
import { TeamServerResponse } from './Routes/Teams.js'
import { PlayerServerResponse } from './Routes/Players.js'


class Server {

    constructor() {
        this.app = express()

        this.paths = {
            teams: '/api/teams',
            players: '/api/players'
        }

        this.dbMongoConecction();
        this.middlewares();
        this.routes();
    }

    async dbMongoConecction() {
        try {
            await DATASTORAGE()
            console.log('Connection success')
        }
        catch(error){
            console.error('No se pudo Conectar a la BD Mongo', error)
        }
    }

    routes() {
        this.app.use(this.paths.teams, TeamServerResponse)
        this.app.use(this.paths.players, PlayerServerResponse)
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }


    listen() {
        // Usa el puerto 0 para que el sistema elija un puerto disponible
        const server = this.app.listen(0, () => {
            const port = server.address().port; // Obtén el puerto asignado dinámicamente
            console.log('Servidor encendido en el puerto', port);
        });
    }
}

export {Server}