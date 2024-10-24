import { Schema, model } from "mongoose";

const TeamsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
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
    default: 0, // Valor por defecto
  }
}, 
{
  collection: 'Teams', // Nombre de la colección en MongoDB
  versionKey: false
});

TeamsSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id; // Incluir el MongoID en el response
  return data;
};

export const TeamsModel = model("equipos", TeamsSchema);
