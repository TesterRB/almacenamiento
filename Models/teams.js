import { Schema, model } from "mongoose";

// Definición del esquema de equipos
const TeamsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Asegura que no haya nombres duplicados
  },
  country: {
    type: String,
    required: true,
  },
  foundationYear: {
    type: Number,
    required: true,
  },
  stadium: {
    type: String,
  },
  championshipsWon: {
    type: Number,
    default: 0, // Valor por defecto en caso de que no se indique
  }
}, 
{
  collection: 'Teams', // Nombre de la colección en MongoDB
  versionKey: false // Ocultar el campo __v
});

// Método para ocultar campos innecesarios en la salida JSON
TeamsSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id; // Incluir el MongoID en el response
  return data;
};

// Crear el modelo basado en el esquema
export const TeamsModel = model("equipos", TeamsSchema);
