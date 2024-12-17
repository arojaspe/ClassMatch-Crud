import { Request, Response } from "express";
import * as Models from "./Models";
import { ErrorOptions } from "sequelize/types/errors/base-error";

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