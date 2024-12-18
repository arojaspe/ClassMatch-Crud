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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getVivienda = exports.getViviendas = exports.getGobernadores = exports.deletePersona = exports.putPersona = exports.postPersona = exports.getPersona = exports.getPersonas = void 0;
const Models = __importStar(require("./Models"));
const Funcs = __importStar(require("./Functions"));
//Class: Persona
const getPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const personas = yield Models.persona.findAll();
    res.json({ personas });
});
exports.getPersonas = getPersonas;
const getPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const persona = yield Models.persona.findByPk(id);
    persona ? res.status(201).json({
        msg: "User found",
        data: persona
    }) : res.status(404).json({
        errors: [{
                message: "No existe persona con ID: " + id,
                extensions: {
                    code: "Conts.getPersona"
                }
            }]
    });
});
exports.getPersona = getPersona;
const postPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const persona = Models.persona.build(body);
        yield persona.save();
        res.json(persona);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Persona",
        });
    }
});
exports.postPersona = postPersona;
const putPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bod = req.body;
    const { id } = req.params;
    try {
        let result = yield Funcs.updatePersona(req, bod.nombre, bod.telefono, bod.id_vivienda_actual);
        console.log(bod);
        if (result instanceof TypeError === false) {
            res.status(200).send({
                data: {
                    msg: "Succesfully updated persona:" + id
                }
            });
        }
        else {
            res.status(404).json({
                errors: [{
                        data: result,
                        message: "Could not update persona:" + id + " it was not found",
                        extensions: {
                            code: "Funcs.putPersona"
                        }
                    }]
            });
        }
    }
    catch (error) {
        res.status(401).json({
            errors: [{
                    data: error,
                    message: "Could not update persona: " + id,
                    extensions: {
                        code: "Funcs.putPersona"
                    }
                }]
        });
    }
});
exports.putPersona = putPersona;
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const persona = yield Models.persona.findByPk(id);
    try {
        persona ? persona.destroy().then(() => {
            res.json({
                msg: "User deleted",
                id: id
            });
        }) : res.status(404).json({
            msg: "No existe persona con ID: " + id
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deletePersona = deletePersona;
//Class: Gobernadores
const getGobernadores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gobernadores = yield Models.gobernador.findAll();
    res.json({ gobernadores });
});
exports.getGobernadores = getGobernadores;
//Class: Viviendas
const getViviendas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const viviendas = yield Models.vivienda.findAll();
    res.json({ viviendas });
});
exports.getViviendas = getViviendas;
const getVivienda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vivienda = yield Models.vivienda.findByPk(id);
    vivienda ? res.status(201).json({
        msg: "Apartment found",
        data: vivienda
    }) : res.status(404).json({
        errors: [{
                message: "No existe vivienda con ID: " + id,
                extensions: {
                    code: "Conts.getVivienda"
                }
            }]
    });
});
exports.getVivienda = getVivienda;
