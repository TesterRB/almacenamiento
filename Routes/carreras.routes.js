import { Router } from "express";
import {
    InsertCarrera,
    GetCarreras,
    GetCarreraByName,
    UpdateCarrera,
    DeleteCarrera
} from "../Controllers/carreras.controllers.js"; // Asegúrate de que la ruta sea correcta

const CarreraServerResponse = Router();

// Rutas para interactuar con las carreras
CarreraServerResponse.get("/", GetCarreras); // Obtener todas las carreras
CarreraServerResponse.get("/:NombreDeLaCarrera", GetCarreraByName); // Obtener una carrera por nombre
CarreraServerResponse.post("/insert", InsertCarrera); // Insertar una nueva carrera
CarreraServerResponse.put("/update/:id", UpdateCarrera); // Modificar una carrera existente
CarreraServerResponse.delete("/delete/:id", DeleteCarrera); // Eliminar una carrera por ID

export { CarreraServerResponse };
