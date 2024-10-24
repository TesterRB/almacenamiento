import { TeamsModel } from "../Models/teams.js";

// Obtener todos los equipos
export const obtenerEquipos = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;

  try {
    const [total, equipos] = await Promise.all([
      TeamsModel.countDocuments(),
      TeamsModel.find({})
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({ Ok: true, total, resp: equipos });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};

// Obtener un equipo por ID
export const obtenerEquipoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const equipo = await TeamsModel.findById(id);
    if (!equipo) {
      return res.status(404).json({ Ok: false, resp: "Equipo no encontrado" });
    }
    res.json({ Ok: true, resp: equipo });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};

// Crear un equipo
export const crearEquipo = async (req, res) => {
  const { name, country, foundationYear, stadium } = req.body;

  try {
    const equipo = new TeamsModel({ name, country, foundationYear, stadium });
    await equipo.save();

    res.json({ Ok: true, resp: equipo });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};

// Actualizar un equipo
export const actualizarEquipo = async (req, res) => {
  const { id } = req.params;
  const { name, country, foundationYear, stadium } = req.body;

  try {
    const equipoActualizado = await TeamsModel.findByIdAndUpdate(id, { name, country, foundationYear, stadium }, { new: true });

    res.json({ Ok: true, resp: equipoActualizado });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};

// Eliminar un equipo
export const eliminarEquipo = async (req, res) => {
  const { id } = req.params;

  try {
    const equipoEliminado = await TeamsModel.findByIdAndDelete(id);
    if (!equipoEliminado) {
      return res.status(404).json({ Ok: false, resp: "Equipo no encontrado" });
    }
    res.json({ Ok: true, resp: "Equipo eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};
