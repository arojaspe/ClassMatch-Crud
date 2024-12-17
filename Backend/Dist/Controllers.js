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
exports.deletePersona = exports.putPersona = exports.postPersona = exports.getPersona = exports.getPersonas = void 0;
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
    persona ? res.json(persona) : res.status(404).json({
        msg: "No existe persona con ID: " + id
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
    try {
        console.log(bod.USER_NAME, bod.USER_LASTNAME, bod.USER_FACULTY, bod.USER_CITY);
        Funcs.updatePersona(req, bod.nombre, bod.telefono, bod.id_vivienda_actual);
        res.status(200).send({
            data: {
                msg: "Succesfully updated"
            }
        });
    }
    catch (error) {
        res.status(401).json({
            errors: [{
                    message: "Could not connect to DB",
                    extensions: {
                        code: "Controller issue"
                    }
                }]
        });
    }
});
exports.putPersona = putPersona;
const deletePersona = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "Delete Usuarios",
        id
    });
};
exports.deletePersona = deletePersona;
