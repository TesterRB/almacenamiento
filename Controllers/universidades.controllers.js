import { response } from "express";
import { UniversidadesModel } from "../Models/universidades.js";
import { CarrerasModel } from "../Models/carreras.js";

// Adicionar una universidad
const InsertUniversidad = async (req, res = response) => {
    const Body = req.body;

    try {
        const universidad = await UniversidadesModel.findOne({ Nombre: Body.Nombre });

        if (universidad) {
            return res.status(400).json({
                ok: false,
                msg: `La universidad ${Body.Nombre} ya existe en la BD`
            });
        }

        const nuevaUniversidad = new UniversidadesModel(Body);
        await nuevaUniversidad.save();

        res.status(201).json({
            ok: true,
            msg: 'Universidad insertada con éxito',
            data: nuevaUniversidad
        });
    } catch (error) {
        console.error("ERROR: INSERTAR", error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno al insertar la universidad',
            error
        });
    }
};

// Consultar los datos de todas las universidades
const GetUniversidades = async (req, res = response) => {
    try {
        const [numUniversidades, universidades] = await Promise.all([
            UniversidadesModel.countDocuments(),
            UniversidadesModel.find({})
        ]);

        res.status(200).json({
            ok: true,
            total: numUniversidades,
            data: universidades
        });
    } catch (error) {
        console.error("ERROR: CONSULTAR", error);
        res.status(500).json({
            ok: false,
            msg: 'Error al consultar universidades',
            error
        });
    }
};

// Consultar los datos de una sola universidad por nombre
const GetUniversidadByName = async (req, res = response) => {
    const { Nombre } = req.params;

    try {
        const universidad = await UniversidadesModel.findOne({
            Nombre: {
                $regex: Nombre,
                $options: 'i'
            }
        });

        if (!universidad) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró ninguna universidad con el nombre ${Nombre}`
            });
        }

        res.status(200).json({
            ok: true,
            data: universidad
        });
    } catch (error) {
        console.error("ERROR: CONSULTAR POR NOMBRE", error);
        res.status(500).json({
            ok: false,
            msg: 'Error al buscar universidad',
            error
        });
    }
};

// Consultar todas las carreras de una universidad
const GetCarrerasByUniversidad = async (req, res = response) => {
    const { Nombre } = req.params;

    try {
        const carreras = await CarrerasModel.find({
            "Universidad": {
                $regex: Nombre,
                $options: 'i'
            }
        });

        if (carreras.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontraron carreras para la universidad ${Nombre}`
            });
        }

        res.status(200).json({
            ok: true,
            data: carreras
        });
    } catch (error) {
        console.error("ERROR: CONSULTAR CARRERAS", error);
        res.status(500).json({
            ok: false,
            msg: 'Error al consultar carreras',
            error
        });
    }
};

// Modificar los datos de una universidad
const UpdateUniversidad = async (req, res = response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const universidadActualizada = await UniversidadesModel.findByIdAndUpdate(id, body, { new: true });

        if (!universidadActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la universidad'
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Universidad actualizada con éxito',
            data: universidadActualizada
        });
    } catch (error) {
        console.error("ERROR: ACTUALIZAR", error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar universidad',
            error
        });
    }
};

// Eliminar una universidad
const DeleteUniversidad = async (req, res = response) => {
    const { id } = req.params;

    try {
        const universidadEliminada = await UniversidadesModel.findByIdAndDelete(id);

        if (!universidadEliminada) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la universidad'
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Universidad eliminada con éxito',
            data: universidadEliminada.Nombre
        });
    } catch (error) {
        console.error("ERROR: ELIMINAR", error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar universidad',
            error
        });
    }
};

export {
    InsertUniversidad,
    GetUniversidades,
    GetUniversidadByName,
    GetCarrerasByUniversidad,
    UpdateUniversidad,
    DeleteUniversidad
};
