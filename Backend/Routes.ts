import { Router } from "express";
import * as Conts from "./Controllers";

const router= Router();

//User Management
router.get("/personas", Conts.getPersonas); 
router.get("/persona/:id", Conts.getPersona);
router.post("/persona", Conts.postPersona);
router.put("/persona/:id", Conts.putPersona);
router.delete("/persona/:id", Conts.deletePersona);

// Viviendas
router.get("/viviendas", Conts.getViviendas); 
router.get("/vivienda/:id", Conts.getVivienda);
router.post("/vivienda", Conts.postVivienda);
// No se pueden modificar los datos de las viviendas
// se elimina, se crea una nueva y se relaciona
router.delete("/vivienda/:id", Conts.deleteVivienda);

//Governors Management
router.get("/gobernadores", Conts.getGobernadores);
router.get("/gobernador/:id", Conts.getGobernador);
// No se pueden borrar o editar
router.post("/gobernador/", Conts.postGobernador);


export default router;
