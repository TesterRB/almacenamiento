import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Obtener la URI desde el archivo .env
const Uri = process.env.MONGODB_URI;

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar:", error);
    process.exit(1);
  }
};

export { connectDB };