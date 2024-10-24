import express from 'express';
import cors from 'cors';
import { connectDB } from './DB/conexion_mongo.js'; // Asegúrate de que la ruta sea correcta
import { contractsRouter } from './Routes/contractsRoutes.js'; // Ruta hacia contrataciones
import { playersRouter } from './Routes/playersRoutes.js'; // Ruta hacia jugadores
import { teamsRouter } from './Routes/teamsRoutes.js'; // Ruta hacia equipos

class Server {
    constructor() {
        this.app = express();

        // Definir las rutas base de la API
        this.paths = {
            universidades: '/api/universidades', // Ruta para universidades
            carreras: '/api/carreras', // Ruta para carreras
            contratos: '/api/contratos', // Ruta para contrataciones
            jugadores: '/api/jugadores', // Ruta para jugadores
            equipos: '/api/equipos' // Ruta para equipos
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
            await connectDB(); // Usamos la función de conexión de MongoDB
            console.log('Conexión exitosa a MongoDB');
        } catch (error) {
            console.error('No se pudo conectar a la BD Mongo', error);
            process.exit(1); // Salir si no se puede conectar a la BD
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
        // Configuración de las rutas
        this.app.use(this.paths.contratos, contractsRouter); // Rutas para contrataciones
        this.app.use(this.paths.jugadores, playersRouter); // Rutas para jugadores
        this.app.use(this.paths.equipos, teamsRouter); // Rutas para equipos
    }

    listen() {
        // Configuración para escuchar el servidor en un puerto
        const port = process.env.PORT; 
        this.app.listen(port, () => {
            console.log(`Servidor encendido en el puerto ${port}`);
        });
    }
}

export { Server };
