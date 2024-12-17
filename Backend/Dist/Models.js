"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alcalde = exports.gobernador = exports.posesion = exports.CDF = exports.municipio = exports.departamento = exports.vivienda = exports.persona = void 0;
const sequelize_1 = require("sequelize");
const Connection_1 = __importDefault(require("./Connection"));
//Tables
exports.persona = Connection_1.default.define("persona", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    tipo_doc: {
        type: sequelize_1.DataTypes.ENUM("Pasaporte", "Cédula", "DNI"),
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    fecha_nac: {
        type: sequelize_1.DataTypes.DATE,
    },
    sexo: {
        type: sequelize_1.DataTypes.ENUM("Masculino", "Femenino"),
    },
    telefono: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_vivienda_actual: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_municipio_origen: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'persona'
});
exports.vivienda = Connection_1.default.define("vivienda", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_municipio: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    capacidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    niveles: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    area: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    categoria: {
        type: sequelize_1.DataTypes.ENUM("Apartamento", "Casa"),
    },
    estrato: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'vivienda'
});
exports.departamento = Connection_1.default.define("departamento", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    pais: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'departamento'
});
exports.municipio = Connection_1.default.define("municipio", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_departamento: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'municipio'
});
exports.CDF = Connection_1.default.define("CDF", {
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    id_cdf: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'CDF'
});
exports.posesion = Connection_1.default.define("posesion", {
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    id_vivienda: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'posesion'
});
exports.gobernador = Connection_1.default.define("gobernador", {
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    id_departamento: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'gobernador'
});
exports.alcalde = Connection_1.default.define("posesion", {
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    id_municipio: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'alcalde'
});
