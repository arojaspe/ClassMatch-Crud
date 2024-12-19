import {Request} from "express";
import * as Models from "./Models";

//Class: Persona
export function createPersona(tipo_doc:string, nombre:string, fecha_nac: Date, sexo: string, telefono: number, id_vivienda_actual: number, id_municipio_origen: number) {
    try {
        let persona = Models.persona.build({
                tipo_doc: tipo_doc,
                nombre: nombre,
                fecha_nac: fecha_nac,
                sexo: sexo,
                telefono: telefono,
                id_vivienda_actual: id_vivienda_actual,
                id_municipio_origen: id_municipio_origen,
        })
        persona.save()
        return(persona.getDataValue("id"))
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}
export async function updatePersona(req: Request, nombre?: string, telefono?:string, id_vivienda_actual?:string) {
    try {
        const {id} = req.params;
        let persona= await Models.persona.findByPk(id)
        if (!persona) {throw new TypeError("Persona not found")}

        persona.set({
            nombre: nombre??  persona.getDataValue("nombre"),
            telefono: telefono?? persona.getDataValue("telefono"),
            id_vivienda_actual: id_vivienda_actual?? persona.getDataValue("USER_LASTNAME"),
        }).save()
    } catch (error) {
        return(error)
    }
}

//Class: Vivienda
export async function updateVivienda(req: Request, capacidad?: string, estrato?:string) {
    try {
        const {id} = req.params;
        let vivienda= await Models.vivienda.findByPk(id)
        if (!vivienda) {throw new TypeError("Vivienda not found")}

        vivienda.set({
            capacidad: capacidad??  vivienda.getDataValue("capacidad"),
            estrato: estrato?? vivienda.getDataValue("estrato"),
        }).save()
    } catch (error) {
        return(error)
    }
}

//Class: Posesion
export async function updatePosesion(req: Request, id_persona:string) {
    try {
        const {id} = req.params;
        let posesion= await Models.posesion.findByPk(id)
        if (!posesion) {throw new TypeError("Posesion not found")}
        posesion.set({
            id_persona: id_persona}).save()
    } catch (error) {
        return(error)
    }
}

//Class: Departamento
export async function updateDepartamento(req: Request, nombre:string) {
    try {
        const {id} = req.params;
        let departamento= await Models.departamento.findByPk(id)
        if (!departamento) {throw new TypeError("Departamento not found")}
        departamento.set({
            nombre: nombre}).save()
    } catch (error) {
        return(error)
    }
}

//Class: Municipio
export async function updateMunicipio(req: Request, nombre?:string, id_departamento?:string) {
    try {
        const {id} = req.params;
        let municipio= await Models.municipio.findByPk(id)
        if (!municipio) {throw new TypeError("Municipio not found")}
        municipio.set({
            nombre: nombre?? municipio.getDataValue('nombre'),
            id_departamento: id_departamento?? municipio.getDataValue('id_departamento')
            }).save()
    } catch (error) {
        return(error)
    }
}