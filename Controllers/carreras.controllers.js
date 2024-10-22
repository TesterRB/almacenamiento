import { response } from "express";
import { CarrerasModel } from "../Models/carreras.js";

// Adicionar una nueva carrera
const InsertCarrera = async (req, res = response) => {
    const body = req.body;

    try {
        const carrera = await CarrerasModel.findOne({ NombreDeLaCarrera: body.NombreDeLaCarrera });

        if (carrera) {
            return res.status(400).json({
                ok: false,
                msg: `La carrera ${body.NombreDeLaCarrera} ya existe en la BD`
            });
        }

        const nuevaCarrera = new CarrerasModel(body);
        await nuevaCarrera.save();

        res.status(201).json({
            ok: true,
            msg: 'Carrera insertada',
            data: nuevaCarrera
        });
    } catch (error) {
        console.log("ERROR:INSERTAR", error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar carrera',
            error
        });
    }
};

// Consultar los datos de todas las carreras
const GetCarreras = async (req, res = response) => {
    try {
        const [numCarreras, carreras] = await Promise.all([
            CarrerasModel.countDocuments(),
            CarrerasModel.find({})
        ]);

        res.status(200).json({
            ok: true,
            total: numCarreras,
            data: carreras
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al consultar carreras',
            error
        });
    }
};

// Consultar los datos de una carrera por nombre
const GetCarreraByName = async (req, res = response) => {
    const { NombreDeLaCarrera } = req.params;

    try {
        const carrera = await CarrerasModel.findOne({
            NombreDeLaCarrera: {
                $regex: NombreDeLaCarrera,
                $options: 'i' // Busca sin importar mayúsculas/minúsculas
            }
        });

        if (!carrera) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró ninguna carrera con el nombre ${NombreDeLaCarrera}`
            });
        }

        res.status(200).json({
            ok: true,
            data: carrera
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al buscar carrera',
            error
        });
    }
};

// Modificar los datos de una carrera
const UpdateCarrera = async (req, res = response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const carreraActualizada = await CarrerasModel.findByIdAndUpdate(id, body, { new: true });

        if (!carreraActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la carrera'
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Carrera actualizada',
            data: carreraActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar carrera',
            error
        });
    }
};

// Eliminar una carrera
const DeleteCarrera = async (req, res = response) => {
    const { id } = req.params;

    try {
        const carreraEliminada = await CarrerasModel.findByIdAndDelete(id);

        if (!carreraEliminada) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la carrera'
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Carrera eliminada',
            data: carreraEliminada.NombreDeLaCarrera
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar carrera',
            error
        });
    }
};

export {
    InsertCarrera,
    GetCarreras,
    GetCarreraByName,
    UpdateCarrera,
    DeleteCarrera
};
