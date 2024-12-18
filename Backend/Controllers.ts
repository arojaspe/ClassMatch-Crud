import { Request, Response } from "express";
import * as Models from "./Models";
import * as Funcs from "./Functions"

//Class: Persona
export const getPersonas = async (req: Request, res: Response) => {
    
    const personas= await Models.persona.findAll({
        include: [
            {
                model: Models.vivienda,
                include : [
                    {model: Models.municipio,
                        include: [ 
                            {model: Models.departamento}
                        ]
                    },
                ]
            },
            {
                model: Models.municipio,
                include : [
                    {model: Models.departamento}
                ]
            },
        ],
    });
    res.json({personas});
}
export const getPersona = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const persona= await Models.persona.findByPk(id, {
        include: [
            {
                model: Models.vivienda,
                include : [
                    {model: Models.municipio,
                        include: [ 
                            {model: Models.departamento}
                        ]
                    },
                ]
            },
            {
                model: Models.municipio,
                include : [
                    {model: Models.departamento}
                ]
            },
        ],
    });

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
    
    const gobernadores= await Models.gobernador.findAll({
        include: [
            {model: Models.departamento},
            {
                model: Models.persona,
                include: [
                        {
                            model: Models.vivienda,
                            include : [
                                {model: Models.municipio,
                                    include: [ 
                                        {model: Models.departamento}
                                    ]
                                },
                            ]
                        },
                        {
                            model: Models.municipio,
                            include : [
                                {model: Models.departamento}
                            ],
                        },
                ]
            },
        ],
    });
    res.json({gobernadores});
}
export const getGobernador = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const gobernador = await Models.gobernador.findByPk(id, {
        include: [
            {model: Models.departamento},
            {
                model: Models.persona,
                include: [
                        {
                            model: Models.vivienda,
                            include : [
                                {model: Models.municipio,
                                    include: [ 
                                        {model: Models.departamento}
                                    ]
                                },
                            ]
                        },
                        {
                            model: Models.municipio,
                            include : [
                                {model: Models.departamento}
                            ],
                        },
                ]
            },
        ],
    });

    gobernador ? res.status(201).json(
        {
            msg: "Governor found",
            data: gobernador
        }
    ) : res.status(404).json({
        errors: [{
            message: "No existe gobernador con ID: " +id,
            extensions: {
                code: "Conts.getGobernador"
            }
        }]
    })
}
export const postGobernador = async (req: Request, res: Response) => {
    
    const {body}= req;
    try {
        const gobernador = Models.gobernador.build(body);
        await gobernador.save();
        res.json(gobernador);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Gobernador",
        })
    }
}

//Class: Alcaldes


//Class: Viviendas
export const getViviendas = async (req: Request, res: Response) => {
    
    const viviendas = await Models.vivienda.findAll({
        include: [
            {
                model: Models.municipio,
                include : [
                    {model: Models.departamento}
                ]
            },
        ],
    });
    res.json({viviendas});
}
export const getVivienda = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const vivienda = await Models.vivienda.findByPk(id,{
        include: [
            {
                model: Models.municipio,
                include : [
                    {model: Models.departamento}
                ]
            },
        ],
    });

    vivienda ? res.status(201).json(
        {
            msg: "Apartment found",
            data: vivienda
        }
    ) : res.status(404).json({
        errors: [{
            message: "No existe vivienda con ID: " +id,
            extensions: {
                code: "Conts.getVivienda"
            }
        }]
    })
}
export const postVivienda = async (req: Request, res: Response) => {
    
    const {body}= req;
    try {
        const vivienda = Models.vivienda.build(body);
        await vivienda.save();
        res.json(vivienda);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Vivienda",
        })
    }
}
export const deleteVivienda = async (req: Request, res: Response) => {
    
    const {id}= req.params;
    const vivienda = await Models.vivienda.findByPk(id);
    try {
        vivienda ? vivienda.destroy().then(() => {
            res.json({
                msg: "Apartment deleted",
                id: id
            })
        })  : res.status(404).json({
            msg: "No existe vivienda con ID: "+ id
        })
    } catch (error) {
        console.log(error)
    }
}
