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
export const getAlcaldes = async (req: Request, res: Response) => {
    
    const alcaldes = await Models.alcalde.findAll({
        include: [
            {
                model: Models.municipio,
                include : [
                    {model: Models.departamento}
                ],
            },
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
    res.json({alcaldes});
}
export const getAlcalde = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const alcalde = await Models.alcalde.findByPk(id, {
        include: [
            {
                model: Models.municipio,
                include : [
                    {model: Models.departamento}
                ],
            },
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

    alcalde ? res.status(201).json(
        {
            msg: "Major found",
            data: alcalde
        }
    ) : res.status(404).json({
        errors: [{
            message: "No existe alcalde con ID: " +id,
            extensions: {
                code: "Conts.getAlcalde"
            }
        }]
    })
}
export const postAlcalde = async (req: Request, res: Response) => {
    
    const {body}= req;
    try {
        const alcalde = Models.alcalde.build(body);
        await alcalde.save();
        res.json(alcalde);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Alcalde",
        })
    }
}

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
export const putVivienda = async (req: Request, res: Response) => {
    const bod= req.body
    const {id} = req.params

    try {
        let result= await Funcs.updateVivienda(req, bod.capacidad, bod.estrato)
        console.log(bod)

        if (result instanceof TypeError=== false) {
            res.status(200).send({
                data: {
                    msg: "Succesfully updated vivienda:"+id
                }
            })
        } else {
            res.status(404).json({
                errors: [{
                    data: result,
                    message: "Could not update vivienda:"+id+" it was not found",
                    extensions: {
                        code: "Funcs.putVivienda"
                    }
                }]
            })
        }        
    } catch (error) {
        res.status(401).json({
            errors: [{
                data: error,
                message: "Could not update vivienda: "+id,
                extensions: {
                    code: "Funcs.putVivienda"
                }
            }]
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

//Class: Posesiones
export const getPosesiones = async (req: Request, res: Response) => {
    
    const posesiones= await Models.posesion.findAll({
        include: [
            {model: Models.persona},
            {model: Models.vivienda},
        ],
    });
    res.json({posesiones});
}
export const getPosesion = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const posesion= await Models.posesion.findByPk(id, {
        include: [
            {model: Models.persona},
            {model: Models.vivienda},
        ]
    });

    posesion ? res.status(201).json(
        {
            msg: "Posesion not found",
            data: posesion
        }
    ) : res.status(404).json({
        errors: [{
            message: "No existe posesion con ID: " +id,
            extensions: {
                code: "Conts.getPosesion"
            }
        }]
    })
}
export const postPosesion = async (req: Request, res: Response) => {
    
    const {body}= req;
    try {
        const posesion= Models.posesion.build(body);
        await posesion.save();
        res.json(posesion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Posesion",
        })
    }
}
export const putPosesion = async (req: Request, res: Response) => {
    const bod= req.body
    const {id} = req.params

    try {
        let result= await Funcs.updatePosesion(req, bod.id_persona)
        console.log(bod)

        if (result instanceof TypeError=== false) {
            res.status(200).send({
                data: {
                    msg: "Succesfully updated posesion:"+id
                }
            })
        } else {
            res.status(404).json({
                errors: [{
                    data: result,
                    message: "Could not update posesion:"+id+" it was not found",
                    extensions: {
                        code: "Funcs.putPosesion"
                    }
                }]
            })
        }        
    } catch (error) {
        res.status(401).json({
            errors: [{
                data: error,
                message: "Could not update posesion: "+id,
                extensions: {
                    code: "Funcs.putPosesion"
                }
            }]
        })
    }
    
}

//Class: Departamento
export const getDepartamentos = async (req: Request, res: Response) => {
    
    const departamento= await Models.departamento.findAll();
    res.json({departamento});
}
export const getDepartamento = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const departamento= await Models.departamento.findByPk(id);

    departamento ? res.status(201).json(
        {
            msg: "Departamento not found",
            data: departamento
        }
    ) : res.status(404).json({
        errors: [{
            message: "No existe departamento con ID: " +id,
            extensions: {
                code: "Conts.getDepartamento"
            }
        }]
    })
}
export const postDepartamento = async (req: Request, res: Response) => {
    
    const {body}= req;
    try {
        const departamento= Models.departamento.build(body);
        await departamento.save();
        res.json(departamento);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Departamento",
        })
    }
}
export const putDepartamento = async (req: Request, res: Response) => {
    const bod= req.body
    const {id} = req.params

    try {
        let result= await Funcs.updateDepartamento(req, bod.nombre)
        console.log(bod)

        if (result instanceof TypeError=== false) {
            res.status(200).send({
                data: {
                    msg: "Succesfully updated departmamento:"+id
                }
            })
        } else {
            res.status(404).json({
                errors: [{
                    data: result,
                    message: "Could not update departamento:"+id+" it was not found",
                    extensions: {
                        code: "Funcs.putDepartamento"
                    }
                }]
            })
        }        
    } catch (error) {
        res.status(401).json({
            errors: [{
                data: error,
                message: "Could not update departamento: "+id,
                extensions: {
                    code: "Funcs.putDepartamento"
                }
            }]
        })
    }
    
}
export const deleteDepartamento = async (req: Request, res: Response) => {
    
    const {id}= req.params;
    const departamento = await Models.departamento.findByPk(id);
    try {
        departamento ? departamento.destroy().then(() => {
            res.json({
                msg: "Departamento borrado",
                id: id
            })
        })  : res.status(404).json({
            msg: "No existe departamento con ID: "+ id
        })
    } catch (error) {
        console.log(error)
    }
}

//Class: Municipio
export const getMunicipios = async (req: Request, res: Response) => {
    
    const municipio= await Models.municipio.findAll();
    res.json({municipio});
}
export const getMunicipio = async (req: Request, res: Response) => {
    
    const {id} = req.params;

    const municipio= await Models.municipio.findByPk(id);

    municipio ? res.status(201).json(
        {
            msg: "Municipio not found",
            data: municipio
        }
    ) : res.status(404).json({
        errors: [{
            message: "No existe municipio con ID: " +id,
            extensions: {
                code: "Conts.getMunicipio"
            }
        }]
    })
}
export const postMunicipio = async (req: Request, res: Response) => {
    
    const {body}= req;
    try {
        const municipio= Models.municipio.build(body);
        await municipio.save();
        res.json(municipio);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear Municipio",
        })
    }
}
export const putMunicipio = async (req: Request, res: Response) => {
    const bod= req.body
    const {id} = req.params

    try {
        let result= await Funcs.updateMunicipio(req, bod.nombre)
        console.log(bod)

        if (result instanceof TypeError=== false) {
            res.status(200).send({
                data: {
                    msg: "Succesfully updated Municipio:"+id
                }
            })
        } else {
            res.status(404).json({
                errors: [{
                    data: result,
                    message: "Could not update municipio:"+id+" it was not found",
                    extensions: {
                        code: "Funcs.putMunicipio"
                    }
                }]
            })
        }        
    } catch (error) {
        res.status(401).json({
            errors: [{
                data: error,
                message: "Could not update Municipio: "+id,
                extensions: {
                    code: "Funcs.putMunicipio"
                }
            }]
        })
    }
    
}
export const deleteMunicipio = async (req: Request, res: Response) => {
    
    const {id}= req.params;
    const municipio = await Models.municipio.findByPk(id);
    try {
        municipio ? municipio.destroy().then(() => {
            res.json({
                msg: "Municipio borrado",
                id: id
            })
        })  : res.status(404).json({
            msg: "No existe Municipio con ID: "+ id
        })
    } catch (error) {
        console.log(error)
    }
}