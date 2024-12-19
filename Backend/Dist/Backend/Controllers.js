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
exports.deleteMunicipio = exports.putMunicipio = exports.postMunicipio = exports.getMunicipio = exports.getMunicipios = exports.deleteDepartamento = exports.putDepartamento = exports.postDepartamento = exports.getDepartamento = exports.getDepartamentos = exports.putPosesion = exports.postPosesion = exports.getPosesion = exports.getPosesiones = exports.deleteVivienda = exports.putVivienda = exports.postVivienda = exports.getVivienda = exports.getViviendas = exports.postAlcalde = exports.getAlcalde = exports.getAlcaldes = exports.postGobernador = exports.getGobernador = exports.getGobernadores = exports.deletePersona = exports.putPersona = exports.postPersona = exports.getPersona = exports.getPersonas = void 0;
const Models = __importStar(require("./Models"));
const Funcs = __importStar(require("./Functions"));
//Class: Persona
const getPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const personas = yield Models.persona.findAll({
        include: [
            {
                model: Models.vivienda,
                include: [
                    { model: Models.municipio,
                        include: [
                            { model: Models.departamento }
                        ]
                    },
                ]
            },
            {
                model: Models.municipio,
                include: [
                    { model: Models.departamento }
                ]
            },
        ],
    });
    res.json({ personas });
});
exports.getPersonas = getPersonas;
const getPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const persona = yield Models.persona.findByPk(id, {
        include: [
            {
                model: Models.vivienda,
                include: [
                    { model: Models.municipio,
                        include: [
                            { model: Models.departamento }
                        ]
                    },
                ]
            },
            {
                model: Models.municipio,
                include: [
                    { model: Models.departamento }
                ]
            },
        ],
    });
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
    const gobernadores = yield Models.gobernador.findAll({
        include: [
            { model: Models.departamento },
            {
                model: Models.persona,
                include: [
                    {
                        model: Models.vivienda,
                        include: [
                            { model: Models.municipio,
                                include: [
                                    { model: Models.departamento }
                                ]
                            },
                        ]
                    },
                    {
                        model: Models.municipio,
                        include: [
                            { model: Models.departamento }
                        ],
                    },
                ]
            },
        ],
    });
    res.json({ gobernadores });
});
exports.getGobernadores = getGobernadores;
const getGobernador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const gobernador = yield Models.gobernador.findByPk(id, {
        include: [
            { model: Models.departamento },
            {
                model: Models.persona,
                include: [
                    {
                        model: Models.vivienda,
                        include: [
                            { model: Models.municipio,
                                include: [
                                    { model: Models.departamento }
                                ]
                            },
                        ]
                    },
                    {
                        model: Models.municipio,
                        include: [
                            { model: Models.departamento }
                        ],
                    },
                ]
            },
        ],
    });
    gobernador ? res.status(201).json({
        msg: "Governor found",
        data: gobernador
    }) : res.status(404).json({
        errors: [{
                message: "No existe gobernador con ID: " + id,
                extensions: {
                    code: "Conts.getGobernador"
                }
            }]
    });
});
exports.getGobernador = getGobernador;
const postGobernador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const gobernador = Models.gobernador.build(body);
        yield gobernador.save();
        res.json(gobernador);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Gobernador",
        });
    }
});
exports.postGobernador = postGobernador;
//Class: Alcaldes
const getAlcaldes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alcaldes = yield Models.alcalde.findAll({
        include: [
            {
                model: Models.municipio,
                include: [
                    { model: Models.departamento }
                ],
            },
            {
                model: Models.persona,
                include: [
                    {
                        model: Models.vivienda,
                        include: [
                            { model: Models.municipio,
                                include: [
                                    { model: Models.departamento }
                                ]
                            },
                        ]
                    },
                    {
                        model: Models.municipio,
                        include: [
                            { model: Models.departamento }
                        ],
                    },
                ]
            },
        ],
    });
    res.json({ alcaldes });
});
exports.getAlcaldes = getAlcaldes;
const getAlcalde = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alcalde = yield Models.alcalde.findByPk(id, {
        include: [
            {
                model: Models.municipio,
                include: [
                    { model: Models.departamento }
                ],
            },
            {
                model: Models.persona,
                include: [
                    {
                        model: Models.vivienda,
                        include: [
                            { model: Models.municipio,
                                include: [
                                    { model: Models.departamento }
                                ]
                            },
                        ]
                    },
                    {
                        model: Models.municipio,
                        include: [
                            { model: Models.departamento }
                        ],
                    },
                ]
            },
        ],
    });
    alcalde ? res.status(201).json({
        msg: "Major found",
        data: alcalde
    }) : res.status(404).json({
        errors: [{
                message: "No existe alcalde con ID: " + id,
                extensions: {
                    code: "Conts.getAlcalde"
                }
            }]
    });
});
exports.getAlcalde = getAlcalde;
const postAlcalde = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const alcalde = Models.alcalde.build(body);
        yield alcalde.save();
        res.json(alcalde);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Alcalde",
        });
    }
});
exports.postAlcalde = postAlcalde;
//Class: Viviendas
const getViviendas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const viviendas = yield Models.vivienda.findAll({
        include: [
            {
                model: Models.municipio,
                include: [
                    { model: Models.departamento }
                ]
            },
        ],
    });
    res.json({ viviendas });
});
exports.getViviendas = getViviendas;
const getVivienda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vivienda = yield Models.vivienda.findByPk(id, {
        include: [
            {
                model: Models.municipio,
                include: [
                    { model: Models.departamento }
                ]
            },
        ],
    });
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
const postVivienda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const vivienda = Models.vivienda.build(body);
        yield vivienda.save();
        res.json(vivienda);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Vivienda",
        });
    }
});
exports.postVivienda = postVivienda;
const putVivienda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bod = req.body;
    const { id } = req.params;
    try {
        let result = yield Funcs.updateVivienda(req, bod.capacidad, bod.estrato);
        console.log(bod);
        if (result instanceof TypeError === false) {
            res.status(200).send({
                data: {
                    msg: "Succesfully updated vivienda:" + id
                }
            });
        }
        else {
            res.status(404).json({
                errors: [{
                        data: result,
                        message: "Could not update vivienda:" + id + " it was not found",
                        extensions: {
                            code: "Funcs.putVivienda"
                        }
                    }]
            });
        }
    }
    catch (error) {
        res.status(401).json({
            errors: [{
                    data: error,
                    message: "Could not update vivienda: " + id,
                    extensions: {
                        code: "Funcs.putVivienda"
                    }
                }]
        });
    }
});
exports.putVivienda = putVivienda;
const deleteVivienda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vivienda = yield Models.vivienda.findByPk(id);
    try {
        vivienda ? vivienda.destroy().then(() => {
            res.json({
                msg: "Apartment deleted",
                id: id
            });
        }) : res.status(404).json({
            msg: "No existe vivienda con ID: " + id
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteVivienda = deleteVivienda;
//Class: Posesiones
const getPosesiones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posesiones = yield Models.posesion.findAll({
        include: [
            { model: Models.persona },
            { model: Models.vivienda },
        ],
    });
    res.json({ posesiones });
});
exports.getPosesiones = getPosesiones;
const getPosesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const posesion = yield Models.posesion.findByPk(id, {
        include: [
            { model: Models.persona },
            { model: Models.vivienda },
        ]
    });
    posesion ? res.status(201).json({
        msg: "Posesion not found",
        data: posesion
    }) : res.status(404).json({
        errors: [{
                message: "No existe posesion con ID: " + id,
                extensions: {
                    code: "Conts.getPosesion"
                }
            }]
    });
});
exports.getPosesion = getPosesion;
const postPosesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const posesion = Models.posesion.build(body);
        yield posesion.save();
        res.json(posesion);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Posesion",
        });
    }
});
exports.postPosesion = postPosesion;
const putPosesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bod = req.body;
    const { id } = req.params;
    try {
        let result = yield Funcs.updatePosesion(req, bod.id_persona);
        console.log(bod);
        if (result instanceof TypeError === false) {
            res.status(200).send({
                data: {
                    msg: "Succesfully updated posesion:" + id
                }
            });
        }
        else {
            res.status(404).json({
                errors: [{
                        data: result,
                        message: "Could not update posesion:" + id + " it was not found",
                        extensions: {
                            code: "Funcs.putPosesion"
                        }
                    }]
            });
        }
    }
    catch (error) {
        res.status(401).json({
            errors: [{
                    data: error,
                    message: "Could not update posesion: " + id,
                    extensions: {
                        code: "Funcs.putPosesion"
                    }
                }]
        });
    }
});
exports.putPosesion = putPosesion;
//Class: Departamento
const getDepartamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departamento = yield Models.departamento.findAll();
    res.json({ departamento });
});
exports.getDepartamentos = getDepartamentos;
const getDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const departamento = yield Models.departamento.findByPk(id);
    departamento ? res.status(201).json({
        msg: "Departamento not found",
        data: departamento
    }) : res.status(404).json({
        errors: [{
                message: "No existe departamento con ID: " + id,
                extensions: {
                    code: "Conts.getDepartamento"
                }
            }]
    });
});
exports.getDepartamento = getDepartamento;
const postDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const departamento = Models.departamento.build(body);
        yield departamento.save();
        res.json(departamento);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Departamento",
        });
    }
});
exports.postDepartamento = postDepartamento;
const putDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bod = req.body;
    const { id } = req.params;
    try {
        let result = yield Funcs.updateDepartamento(req, bod.nombre);
        console.log(bod);
        if (result instanceof TypeError === false) {
            res.status(200).send({
                data: {
                    msg: "Succesfully updated departmamento:" + id
                }
            });
        }
        else {
            res.status(404).json({
                errors: [{
                        data: result,
                        message: "Could not update departamento:" + id + " it was not found",
                        extensions: {
                            code: "Funcs.putDepartamento"
                        }
                    }]
            });
        }
    }
    catch (error) {
        res.status(401).json({
            errors: [{
                    data: error,
                    message: "Could not update departamento: " + id,
                    extensions: {
                        code: "Funcs.putDepartamento"
                    }
                }]
        });
    }
});
exports.putDepartamento = putDepartamento;
const deleteDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const departamento = yield Models.departamento.findByPk(id);
    try {
        departamento ? departamento.destroy().then(() => {
            res.json({
                msg: "Departamento borrado",
                id: id
            });
        }) : res.status(404).json({
            msg: "No existe departamento con ID: " + id
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteDepartamento = deleteDepartamento;
//Class: Municipio
const getMunicipios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const municipio = yield Models.municipio.findAll();
    res.json({ municipio });
});
exports.getMunicipios = getMunicipios;
const getMunicipio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const municipio = yield Models.municipio.findByPk(id);
    municipio ? res.status(201).json({
        msg: "Municipio not found",
        data: municipio
    }) : res.status(404).json({
        errors: [{
                message: "No existe municipio con ID: " + id,
                extensions: {
                    code: "Conts.getMunicipio"
                }
            }]
    });
});
exports.getMunicipio = getMunicipio;
const postMunicipio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const municipio = Models.municipio.build(body);
        yield municipio.save();
        res.json(municipio);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Municipio",
        });
    }
});
exports.postMunicipio = postMunicipio;
const putMunicipio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bod = req.body;
    const { id } = req.params;
    try {
        let result = yield Funcs.updateMunicipio(req, bod.nombre);
        console.log(bod);
        if (result instanceof TypeError === false) {
            res.status(200).send({
                data: {
                    msg: "Succesfully updated Municipio:" + id
                }
            });
        }
        else {
            res.status(404).json({
                errors: [{
                        data: result,
                        message: "Could not update municipio:" + id + " it was not found",
                        extensions: {
                            code: "Funcs.putMunicipio"
                        }
                    }]
            });
        }
    }
    catch (error) {
        res.status(401).json({
            errors: [{
                    data: error,
                    message: "Could not update Municipio: " + id,
                    extensions: {
                        code: "Funcs.putMunicipio"
                    }
                }]
        });
    }
});
exports.putMunicipio = putMunicipio;
const deleteMunicipio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const municipio = yield Models.municipio.findByPk(id);
    try {
        municipio ? municipio.destroy().then(() => {
            res.json({
                msg: "Municipio borrado",
                id: id
            });
        }) : res.status(404).json({
            msg: "No existe Municipio con ID: " + id
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteMunicipio = deleteMunicipio;
