import { PlayersModel } from "../Models/players.js";
import { TeamsModel } from "../Models/teams.js";

// Obtener jugadores (con información del equipo)
export const obtenerJugadores = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;

  try {
    const [total, jugadores] = await Promise.all([
      PlayersModel.countDocuments(),
      PlayersModel.find({})
        .populate("team", "name country") // Obtener información del equipo
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({ Ok: true, total, resp: jugadores });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};

// Crear un jugador
export const crearJugador = async (req, res) => {
  const { name, position, height, nationality, birthDate, team } = req.body;

  try {
    // Verificar que el equipo exista
    const equipoExiste = await TeamsModel.findById(team);
    if (!equipoExiste) {
      return res.status(400).json({ Ok: false, resp: "El equipo no existe" });
    }

    const jugador = new PlayersModel({ name, position, height, nationality, birthDate, team });
    await jugador.save();

    res.json({ Ok: true, resp: jugador });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};

// Actualizar un jugador
export const actualizarJugador = async (req, res) => {
  const { id } = req.params;
  const { name, position, height, nationality, birthDate, team } = req.body;

  try {
    // Verificar que el equipo exista antes de asignar
    const equipoExiste = await TeamsModel.findById(team);
    if (!equipoExiste) {
      return res.status(400).json({ Ok: false, resp: "El equipo no existe" });
    }

    const jugadorActualizado = await PlayersModel.findByIdAndUpdate(id, { name, position, height, nationality, birthDate, team }, { new: true });

    res.json({ Ok: true, resp: jugadorActualizado });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};
