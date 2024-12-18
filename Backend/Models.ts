import { DataTypes } from "sequelize";
import db from "./Connection";

//Tables
export const persona= db.define("persona", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    tipo_doc: {
        type: DataTypes.ENUM("Pasaporte", "Cédula", "DNI"),
    },
    nombre: {
        type: DataTypes.STRING,
    },
    fecha_nac: {
        type: DataTypes.DATE,
    },
    sexo: {
        type: DataTypes.ENUM("Masculino", "Femenino"),
    },
    telefono: {
        type: DataTypes.INTEGER,
    },
    id_vivienda_actual: {
        type: DataTypes.INTEGER,
    },
    id_municipio_origen: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'persona'
})
export const vivienda= db.define("vivienda", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    direccion: {
        type: DataTypes.STRING,
    },
    id_municipio: {
        type: DataTypes.INTEGER,
    },
    capacidad: {
        type: DataTypes.INTEGER,
    },
    niveles: {
        type: DataTypes.INTEGER,
    },
    area: {
        type: DataTypes.INTEGER,
    },
    categoria: {
        type: DataTypes.ENUM("Apartamento", "Casa"),
    },
    estrato: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'vivienda'
})
export const departamento= db.define("departamento", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    pais: {
        type: DataTypes.STRING,
    },
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'departamento'
})
export const municipio= db.define("municipio", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    id_departamento: {
        type: DataTypes.STRING,
    },
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'municipio'
})
export const CDF= db.define("CDF", {
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_cdf: {
        type: DataTypes.INTEGER,
    },
    fecha_registro: {
        type: DataTypes.DATE,
    },
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'CDF'
})
export const posesion= db.define("posesion", {
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_vivienda: {
        type: DataTypes.INTEGER,
    },
    fecha_registro: {
        type: DataTypes.DATE,
    },
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'posesion'
})
export const gobernador= db.define("gobernador", {
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_departamento: {
        type: DataTypes.INTEGER,
    },
    fecha_registro: {
        type: DataTypes.DATE,
    },
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'gobernador'
})
export const alcalde= db.define("posesion", {
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_municipio: {
        type: DataTypes.INTEGER,
    },
    fecha_registro: {
        type: DataTypes.DATE,
    },
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'alcalde'
})

// Relations
vivienda.hasMany(persona, {foreignKey: 'id_vivienda_actual'});
vivienda.belongsTo(municipio, {foreignKey: 'id_municipio'});

persona.belongsTo(vivienda, {foreignKey: 'id_vivienda_actual'});
persona.belongsTo(municipio, {foreignKey: 'id_municipio_origen'});

municipio.hasMany(persona, {foreignKey: 'id_municipio_origen'});
municipio.hasMany(vivienda, {foreignKey: 'id_municipio'});
municipio.belongsTo(departamento, {foreignKey: 'id_departamento'});

departamento.hasMany(municipio, {foreignKey: 'id_departamento'});

//gobernador.hasOne(persona);
//persona.belongsTo(gobernador);


