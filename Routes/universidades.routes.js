import { Router } from "express";
import {
    InsertUniversidad,
    GetUniversidades,
    GetUniversidadByName,
    GetCarrerasByUniversidad,
    UpdateUniversidad,
    DeleteUniversidad
} from "../Controllers/universidades.controllers.js"; // Asegúrate de que la ruta sea correcta

const UniversidadServerResponse = Router();

// Rutas para interactuar con las universidades
UniversidadServerResponse.get("/", GetUniversidades); // Obtener todas las universidades
UniversidadServerResponse.get("/:Nombre", GetUniversidadByName); // Obtener una universidad por nombre
UniversidadServerResponse.get("/:Nombre/carreras", GetCarrerasByUniversidad); // Obtener las carreras de una universidad
UniversidadServerResponse.post("/insert", InsertUniversidad); // Insertar una nueva universidad
UniversidadServerResponse.put("/update/:id", UpdateUniversidad); // Modificar una universidad existente
UniversidadServerResponse.delete("/delete/:id", DeleteUniversidad); // Eliminar una universidad por ID

export { UniversidadServerResponse };
