import express from 'express';
import cors from 'cors';
import { connectDB } from './DB/conexion_mongo.js'; // Asegúrate de que la ruta sea correcta
import { UniversidadServerResponse } from './Routes/universidades.routes.js'; // Ruta hacia universidades
import { CarreraServerResponse } from './Routes/carreras.routes.js'; // Ruta hacia carreras

class Server {

    constructor() {
        this.app = express();

        // Definir las rutas base de la API
        this.paths = {
            universidades: '/api/universidades', // Ruta para universidades
            carreras: '/api/carreras' // Ruta para carreras
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
        this.app.use(this.paths.universidades, UniversidadServerResponse); // Rutas para universidades
        this.app.use(this.paths.carreras, CarreraServerResponse); // Rutas para carreras
    }

    listen() {
        // Configuración para escuchar el servidor en un puerto
        const port = process.env.PORT
        this.app.listen(port, () => {
            console.log(`Servidor encendido en el puerto ${port}`);
        });
    }
}

export { Server };
