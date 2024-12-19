"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Conts = __importStar(require("./Controllers"));
const router = (0, express_1.Router)();
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
router.put("/vivienda/:id", Conts.putVivienda);
// se elimina, se crea una nueva y se relaciona
router.delete("/vivienda/:id", Conts.deleteVivienda);
//Governors Management
router.get("/gobernadores", Conts.getGobernadores);
router.get("/gobernador/:id", Conts.getGobernador);
// No se pueden borrar o editar
router.post("/gobernador/", Conts.postGobernador);
//Majors Managment
router.get("/alcaldes", Conts.getAlcaldes);
router.get("/alcalde/:id", Conts.getAlcalde);
// No se pueden borrar o editar
router.post("/alcalde/", Conts.postAlcalde);
//Poesion
router.get("/posesiones", Conts.getPosesiones);
router.get("/posesion/:id", Conts.getPosesion);
// No se pueden borrar
router.post("/posesion/:id", Conts.postPosesion);
//Departamento
router.get("/departamentos", Conts.getDepartamentos);
router.get("/departamento/:id", Conts.getDepartamento);
router.post("/departamento/:id", Conts.postDepartamento);
router.put("/departamento/:id", Conts.putDepartamento);
router.delete("/departamento/:id", Conts.deleteDepartamento);
//Municipio
router.get("/municipios", Conts.getMunicipios);
router.get("/municipio/:id", Conts.getMunicipio);
router.post("/municipio/:id", Conts.postMunicipio);
router.put("/municipio/:id", Conts.putMunicipio);
router.delete("/municipio/:id", Conts.deleteMunicipio);
exports.default = router;
