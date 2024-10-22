import { Schema, model } from "mongoose";

// Definición del esquema de universidades
const UniversidadesSchema = new Schema({
  Nombre: {
    type: String,
    required: true,
    unique: true, // Asegura que no haya nombres duplicados
  },
  Ciudad: {
    type: String,
    required: true,
  },
  País: {
    type: String,
    required: true,
  },
  Fundada: {
    type: Number,
    required: true,
  },
  Tipo: {
    type: String,
    required: true,
  },
  Presidente: {
    type: String,
  },
  Estudiantes: {
    type: Number,
  },
  RankingGlobal: {
    type: Number,
  },
  NumeroFacultades: {
    type: Number,
  },
  Descripción: {
    type: String,
  },
}, 
{
  collection: 'Universidades', // Nombre de la colección en MongoDB
  versionKey: false // Ocultar el campo __v que se genera por defecto
});

// Método para ocultar campos innecesarios en la salida JSON
UniversidadesSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return data;
};

// Crear el modelo basado en el esquema
export const UniversidadesModel = model("Universidades", UniversidadesSchema);