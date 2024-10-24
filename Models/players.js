import { Schema, model } from "mongoose";

// Definición del esquema de jugadores
const PlayersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'equipos', // Referencia al equipo
    required: true,
  }
}, 
{
  collection: 'jugadores', // Nombre de la colección en MongoDB
  versionKey: false
});

PlayersSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id; // Incluir el MongoID en el response
  return data;
};

export const PlayersModel = model("jugadores", PlayersSchema);
