import { Schema, model } from "mongoose";

// Definición del esquema de carreras
const CarrerasSchema = new Schema({
  NombreDeLaCarrera: {
    type: String,
    required: true,
    unique: true, // Asegura que no haya carreras duplicadas por nombre
  },
  Facultad: {
    type: String,
    required: true,
  },
  Universidad: {
    type: String,
    required: true,
  },
  Duración: {
    type: String,
    required: true,
  },
  Tipo: {
    type: String,
    required: true,
  },
  AsignaturasPrincipales: {
    type: [String], // Especificamos que es un array de Strings
    required: true,
  },
  RequisitosDeAdmision: {
    type: String,
    required: true,
  },
  TasaDeEmpleabilidad: {
    type: String,
    required: true,
  },
  Descripción: {
    type: String,
  }
},
{
  collection: 'Carreras', // Nombre de la colección en MongoDB
  versionKey: false // Oculta el campo __v generado por defecto
});

// Método para ocultar campos innecesarios en la salida JSON
CarrerasSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return data;
};

// Crear el modelo basado en el esquema
export const CarrerasModel = model("Carreras", CarrerasSchema);