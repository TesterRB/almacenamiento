import { Router } from "express";
import {
    obtenerJugadores,
    obtenerJugadorPorId,
    obtenerJugadoresPorEquipo,
    obtenerJugadoresPorNombre,
    crearJugador,
    actualizarJugador,
    eliminarJugador
} from "../Controllers/playersController.js";

const playersRouter = Router();

// Rutas para interactuar con los jugadores
playersRouter.get("/", obtenerJugadores); // Obtener todos los jugadores
playersRouter.get("/:id", obtenerJugadorPorId); // Obtener un jugador por ID
playersRouter.get("/equipo/:teamId", obtenerJugadoresPorEquipo); // Obtener jugadores por equipo
playersRouter.get("/buscar", obtenerJugadoresPorNombre); // Buscar jugadores por nombre
playersRouter.post("/", crearJugador); // Crear un nuevo jugador
playersRouter.put("/:id", actualizarJugador); // Actualizar un jugador existente
playersRouter.delete("/:id", eliminarJugador); // Eliminar un jugador por ID

export { playersRouter };
