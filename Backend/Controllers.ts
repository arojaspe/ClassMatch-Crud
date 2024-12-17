import { Request, Response } from "express";
import * as Models from "./Models";
import * as Funcs from "./Functions"

//Class: Persona
export const getPersonas = async (req: Request, res: Response) => {
    
    const personas= await Models.persona.findAll();
    res.json({personas});
}
export const getPersona = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const persona= await Models.persona.findByPk(id);

    persona ? res.status(201).json(
        {
            msg: "User found",
            data: persona
        }
    ) : res.status(404).json({
        errors: [{
            message: "No existe persona con ID: " +id,
            extensions: {
                code: "Conts.getPersona"
            }
        }]
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
    const {id} = req.params

    try {
        let result= await Funcs.updatePersona(req, bod.nombre, bod.telefono, bod.id_vivienda_actual)
        console.log(bod)

        if (result instanceof TypeError=== false) {
            res.status(200).send({
                data: {
                    msg: "Succesfully updated persona:"+id
                }
            })
        } else {
            res.status(404).json({
                errors: [{
                    data: result,
                    message: "Could not update persona:"+id+" it was not found",
                    extensions: {
                        code: "Funcs.putPersona"
                    }
                }]
            })
        }        
    } catch (error) {
        res.status(401).json({
            errors: [{
                data: error,
                message: "Could not update persona: "+id,
                extensions: {
                    code: "Funcs.putPersona"
                }
            }]
        })
    }
    
}
export const deletePersona = async (req: Request, res: Response) => {
    
    const {id}= req.params;
    const persona= await Models.persona.findByPk(id);
    try {
        persona ? persona.destroy().then(() => {
            res.json({
                msg: "User deleted",
                id: id
            })
        })  : res.status(404).json({
            msg: "No existe persona con ID: "+ id
        })
    } catch (error) {
        console.log(error)
    }
}

//Class: Gobernadores
export const getGobernadores = async (req: Request, res: Response) => {
    
    const gobernadrores= await Models.gobernador.findAll();
    res.json({gobernadrores});
}