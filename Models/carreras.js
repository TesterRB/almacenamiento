import { Schema, model } from "mongoose";

// Definición del esquema de carreras
const CarrerasSchema = new Schema({
  "Nombre de la Carrera": {
    type: String,
    required: true,
    unique: true, 
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
  "Asignaturas Principales": {
    type: [String], 
    required: true,
  },
  "Requisitos de Admisión": {
    type: String,
    required: true,
  },
  "Tasa de Empleabilidad": {
    type: String,
    required: true,
  },
  Descripción: {
    type: String,
    required: false, 
  }
}, {
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
