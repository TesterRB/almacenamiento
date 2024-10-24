import { Schema, model } from "mongoose";

// Definición del esquema de contrataciones
const ContractsSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'jugadores', // Referencia al jugador
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'equipos', // Referencia al equipo
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  }
}, 
{
  collection: 'contrataciones', // Nombre de la colección en MongoDB
  versionKey: false // Ocultar el campo __v
});

// Método para ocultar campos innecesarios en la salida JSON
ContractsSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id; // Incluir el MongoID en el response
  return data;
};

// Crear el modelo basado en el esquema
export const ContractsModel = model("contrataciones", ContractsSchema);
