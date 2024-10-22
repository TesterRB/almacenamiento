import { Router } from "express";
import {
    InsertCarrera,
    GetCarreras,
    GetCarreraByName,
    UpdateCarrera,
    DeleteCarrera
} from "../Controllers/carreras.controllers.js"; 

const CarreraServerResponse = Router();

// Rutas para interactuar con las carreras
CarreraServerResponse.get("/", GetCarreras); // Obtener todas las carreras
CarreraServerResponse.get("/:Nombre", GetCarreraByName); // Obtener una carrera por nombre
CarreraServerResponse.post("/insert", InsertCarrera); // Insertar una nueva carrera
CarreraServerResponse.put("/update/:id", UpdateCarrera); // Modificar una carrera existente
CarreraServerResponse.delete("/delete/:id", DeleteCarrera); // Eliminar una carrera por ID

export { CarreraServerResponse };
