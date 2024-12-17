import { Request, Response } from "express";
import * as Models from "./Models";
import * as Funcs from "./Functions"
import { v4 as uuidv4 } from 'uuid';

//Class: Persona
export const getPersonas = async (req: Request, res: Response) => {
    
    const personas= await Models.persona.findAll();
    res.json({personas});
}
export const getPersona = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const persona= await Models.persona.findByPk(id);

    persona ? res.json(persona) : res.status(404).json({
        msg: "No existe persona con ID: "+ id
    })
}
export const postPersona = async (req: Request, res: Response) => {
    
    const {body}= req;
    try {
        const persona= Models.persona.build(body);
        await persona.save();
        res.json(persona);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Persona",
        })
    }
}
export const putPersona = async (req: Request, res: Response) => {
    const bod= req.body    
    try {
        console.log(bod.USER_NAME, bod.USER_LASTNAME, bod.USER_FACULTY, bod.USER_CITY)
        Funcs.updatePersona(req, bod.nombre, bod.telefono, bod.id_vivienda_actual)
        res.status(200).send({
            data: {
                msg: "Succesfully updated"
            }
        })
    } catch (error) {
        res.status(401).json({
            errors: [{
                message: "Could not connect to DB",
                extensions: {
                    code: "Controller issue"
                }
            }]
        })
    } 
}
export const deletePersona = (req: Request, res: Response) => {
    
    const {id}= req.params;
    
    res.json({
        msg: "Delete Usuarios",
        id
    })
}