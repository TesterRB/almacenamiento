import { Router } from "express";
import {
    obtenerContrataciones,
    crearContratacion,
    actualizarContratacion,
    eliminarContratacion,
    obtenerContratacionPorIDJugador,
    obtenerContratacionPorNombreJugador
} from "../Controllers/contractsController.js";

const contractsRouter = Router();

// Rutas para interactuar con las contrataciones
contractsRouter.get("/", obtenerContrataciones); // Obtener todas las contrataciones
contractsRouter.get("/jugador/:playerId", obtenerContratacionPorIDJugador); // Obtener contrato por ID del jugador
contractsRouter.get("/jugador/nombre/:playerName", obtenerContratacionPorNombreJugador); // Obtener contrato por nombre del jugador
contractsRouter.post("/", crearContratacion); // Crear una nueva contratación
contractsRouter.put("/:id", actualizarContratacion); // Actualizar una contratación existente
contractsRouter.delete("/:id", eliminarContratacion); // Eliminar una contratación por ID

export { contractsRouter };
