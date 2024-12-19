"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { Request, Response } from "express";
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "https://classmatch-crud.onrender.com" }));
app.use(express_1.default.json());
// app.get("/api/personas", async (req, res) => {
//   try {
//     const personas = await persona.findAll();
//     res.json(personas);
//   } catch (error) {
//     console.error("Error al obtener personas:", error);
//     res.status(500).json({ message: "Error al obtener personas" });
//   }
// });
// app.get(
//   "/api/personas/:id",
//   async (req: Request<{ id: string }>, res: Response) => {
//     const { id } = req.params; // Obtén el ID de los parámetros de la URL
//     try {
//       const person = await persona.findByPk(id); // Busca la persona por su ID
//       if (!person) {
//         return res.status(404).json({ message: "Persona no encontrada" });
//       }
//       res.json(persona); // Envía los datos de la persona como JSON
//     } catch (error) {
//       console.error("Error al obtener la persona:", error);
//       res.status(500).json({ message: "Error al obtener la persona" });
//     }
//   }
// );
app.listen(5000, () => {
    console.log("Servidor backend corriendo en el puerto 5000");
});
