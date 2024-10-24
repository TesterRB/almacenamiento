import { ContractsModel } from "../Models/contracts.js";
import { PlayersModel } from "../Models/players.js";
import { TeamsModel } from "../Models/teams.js";

// Obtener todas las contrataciones
export const obtenerContrataciones = async (req, res) => {
  try {
    const contrataciones = await ContractsModel.find({})
      .populate("player", "name position") // Obtener info del jugador
      .populate("team", "name country");   // Obtener info del equipo

    res.json({ Ok: true, resp: contrataciones });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};

// Crear una contratación
export const crearContratacion = async (req, res) => {
  const { player, team, startDate, endDate } = req.body;

  try {
    // Verificar que el jugador exista
    const jugadorExiste = await PlayersModel.findById(player);
    if (!jugadorExiste) {
      return res.status(400).json({ Ok: false, resp: "El jugador no existe" });
    }

    // Verificar que el equipo exista
    const equipoExiste = await TeamsModel.findById(team);
    if (!equipoExiste) {
      return res.status(400).json({ Ok: false, resp: "El equipo no existe" });
    }

    const contratacion = new ContractsModel({ player, team, startDate, endDate });
    await contratacion.save();

    res.json({ Ok: true, resp: contratacion });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};

// Actualizar una contratación
export const actualizarContratacion = async (req, res) => {
  const { id } = req.params;
  const { player, team, startDate, endDate } = req.body;

  try {
    // Verificar que el jugador y el equipo existan
    const jugadorExiste = await PlayersModel.findById(player);
    if (!jugadorExiste) {
      return res.status(400).json({ Ok: false, resp: "El jugador no existe" });
    }

    const equipoExiste = await TeamsModel.findById(team);
    if (!equipoExiste) {
      return res.status(400).json({ Ok: false, resp: "El equipo no existe" });
    }

    const contratacionActualizada = await ContractsModel.findByIdAndUpdate(id, { player, team, startDate, endDate }, { new: true });

    res.json({ Ok: true, resp: contratacionActualizada });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};
