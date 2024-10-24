import express from 'express';
import cors from 'cors';
import { connectDB } from './DB/conexion_mongo.js'; 
import { contractsRouter } from './Routes/contractsRoutes.js'; 
import { playersRouter } from './Routes/playersRoutes.js'; 
import { teamsRouter } from './Routes/teamsRoutes.js'; 

class Server {
    constructor() {
        this.app = express();

        // Definir las rutas base de la API
        this.paths = {
            contratos: '/api/contratos', 
            jugadores: '/api/jugadores', 
            equipos: '/api/equipos'
        };

        // Conectar a la base de datos
        this.dbMongoConecction();

        // Inicializar middlewares
        this.middlewares();

        // Inicializar rutas
        this.routes();
    }

    async dbMongoConecction() {
        try {
            await connectDB();
            console.log('Conexión exitosa a MongoDB');
        } catch (error) {
            console.error('No se pudo conectar a la BD Mongo', error);
            process.exit(1); 
        }
    }

    middlewares() {
        // CORS para permitir accesos desde otros dominios
        this.app.use(cors());

        // Middleware para parsear el body en formato JSON
        this.app.use(express.json());

        // Servir archivos estáticos si fuera necesario (público)
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.contratos, contractsRouter); // Rutas para contrataciones
        this.app.use(this.paths.jugadores, playersRouter); // Rutas para jugadores
        this.app.use(this.paths.equipos, teamsRouter); // Rutas para equipos
    }

    listen() {
        const port = process.env.PORT; 
        this.app.listen(port, () => {
            console.log(`Servidor encendido en el puerto ${port}`);
        });
    }
}

export { Server };
