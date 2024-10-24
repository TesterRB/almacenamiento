import { Router } from "express";
import {
    obtenerEquipos,
    obtenerEquipoPorId,
    crearEquipo,
    actualizarEquipo,
    eliminarEquipo
} from "../Controllers/teamsController.js";

const teamsRouter = Router();

// Rutas para interactuar con los equipos
teamsRouter.get("/", obtenerEquipos); // Obtener todos los equipos
teamsRouter.get("/:id", obtenerEquipoPorId); // Obtener un equipo por ID
teamsRouter.post("/", crearEquipo); // Crear un nuevo equipo
teamsRouter.put("/:id", actualizarEquipo); // Actualizar un equipo existente
teamsRouter.delete("/:id", eliminarEquipo); // Eliminar un equipo por ID

export { teamsRouter };
