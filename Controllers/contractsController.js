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
    const jugadorExiste = await PlayersModel.findById(player);
    if (!jugadorExiste) {
      return res.status(400).json({ Ok: false, resp: "El jugador no existe" });
    }

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

// Eliminar una contratación
export const eliminarContratacion = async (req, res) => {
  const { id } = req.params;

  try {
    const contratacionEliminada = await ContractsModel.findByIdAndDelete(id);
    if (!contratacionEliminada) {
      return res.status(404).json({ Ok: false, resp: "Contratación no encontrada" });
    }
    res.json({ Ok: true, resp: "Contratación eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};

// Consultar contrato por ID de jugador
export const obtenerContratacionPorIDJugador = async (req, res) => {
  const { playerId } = req.params;

  try {
    const contratacion = await ContractsModel.findOne({ player: playerId })
      .populate("player", "name position")
      .populate("team", "name country");

    if (!contratacion) {
      return res.status(404).json({ Ok: false, resp: "No se encontró contratación para este jugador" });
    }

    res.json({ Ok: true, resp: contratacion });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};

// Consultar contrato por nombre de jugador
export const obtenerContratacionPorNombreJugador = async (req, res) => {
  const { playerName } = req.params;

  try {
    const jugador = await PlayersModel.findOne({ name: playerName });
    if (!jugador) {
      return res.status(404).json({ Ok: false, resp: "Jugador no encontrado" });
    }

    const contratacion = await ContractsModel.findOne({ player: jugador._id })
      .populate("player", "name position")
      .populate("team", "name country");

    if (!contratacion) {
      return res.status(404).json({ Ok: false, resp: "No se encontró contratación para este jugador" });
    }

    res.json({ Ok: true, resp: contratacion });
  } catch (error) {
    res.status(500).json({ Ok: false, resp: error });
  }
};
