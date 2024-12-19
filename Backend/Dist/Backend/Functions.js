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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMunicipio = exports.updateDepartamento = exports.updatePosesion = exports.updateVivienda = exports.updatePersona = exports.createPersona = void 0;
const Models = __importStar(require("./Models"));
//Class: Persona
function createPersona(tipo_doc, nombre, fecha_nac, sexo, telefono, id_vivienda_actual, id_municipio_origen) {
    try {
        let persona = Models.persona.build({
            tipo_doc: tipo_doc,
            nombre: nombre,
            fecha_nac: fecha_nac,
            sexo: sexo,
            telefono: telefono,
            id_vivienda_actual: id_vivienda_actual,
            id_municipio_origen: id_municipio_origen,
        });
        persona.save();
        return (persona.getDataValue("id"));
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
exports.createPersona = createPersona;
function updatePersona(req, nombre, telefono, id_vivienda_actual) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            let persona = yield Models.persona.findByPk(id);
            if (!persona) {
                throw new TypeError("Persona not found");
            }
            persona.set({
                nombre: nombre !== null && nombre !== void 0 ? nombre : persona.getDataValue("nombre"),
                telefono: telefono !== null && telefono !== void 0 ? telefono : persona.getDataValue("telefono"),
                id_vivienda_actual: id_vivienda_actual !== null && id_vivienda_actual !== void 0 ? id_vivienda_actual : persona.getDataValue("USER_LASTNAME"),
            }).save();
        }
        catch (error) {
            return (error);
        }
    });
}
exports.updatePersona = updatePersona;
//Class: Vivienda
function updateVivienda(req, capacidad, estrato) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            let vivienda = yield Models.vivienda.findByPk(id);
            if (!vivienda) {
                throw new TypeError("Vivienda not found");
            }
            vivienda.set({
                capacidad: capacidad !== null && capacidad !== void 0 ? capacidad : vivienda.getDataValue("capacidad"),
                estrato: estrato !== null && estrato !== void 0 ? estrato : vivienda.getDataValue("estrato"),
            }).save();
        }
        catch (error) {
            return (error);
        }
    });
}
exports.updateVivienda = updateVivienda;
//Class: Posesion
function updatePosesion(req, id_persona) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            let posesion = yield Models.posesion.findByPk(id);
            if (!posesion) {
                throw new TypeError("Posesion not found");
            }
            posesion.set({
                id_persona: id_persona
            }).save();
        }
        catch (error) {
            return (error);
        }
    });
}
exports.updatePosesion = updatePosesion;
//Class: Departamento
function updateDepartamento(req, nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            let departamento = yield Models.departamento.findByPk(id);
            if (!departamento) {
                throw new TypeError("Departamento not found");
            }
            departamento.set({
                nombre: nombre
            }).save();
        }
        catch (error) {
            return (error);
        }
    });
}
exports.updateDepartamento = updateDepartamento;
//Class: Municipio
function updateMunicipio(req, nombre, id_departamento) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            let municipio = yield Models.municipio.findByPk(id);
            if (!municipio) {
                throw new TypeError("Municipio not found");
            }
            municipio.set({
                nombre: nombre !== null && nombre !== void 0 ? nombre : municipio.getDataValue('nombre'),
                id_departamento: id_departamento !== null && id_departamento !== void 0 ? id_departamento : municipio.getDataValue('id_departamento')
            }).save();
        }
        catch (error) {
            return (error);
        }
    });
}
exports.updateMunicipio = updateMunicipio;
