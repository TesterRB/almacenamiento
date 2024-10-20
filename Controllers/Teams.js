import { response } from "express";
import { TeamsModel } from "../Models/Teams.js";

const InsertTeam = async (req, res = response) => {

const Body = req.body;
    
    try {
    
        const Team = await TeamsModel.findOne({ Name: Body.Name });

        if (Team) {
            return res.json({
                Ok: false,
                msg: `El Equipo ${Body.Name}, ya existe en la BD`
            });
        }
    
    const New_Team = new TeamsModel(Body);
    await New_Team.save();
    
    res.json({ 
        Ok: true, 
        msg: 'Equipo Insertado', 
        resp: New_Team});
    } 
    
    catch (error) {
        console.log("ERROR:INSERTAR",error);
        res.json({ 
            Ok: false, 
            msg:'Error al Insertar Equipo', 
            resp: error });
        }
};


const GetTeams = async (req, res= response) => {
    
    try{
        const [NumberOfTeams, Teams] = await Promise.all([
            TeamsModel.countDocuments(),
            TeamsModel.find({})
        ])

        res.json({
            ok: true,
            total: NumberOfTeams,
            data: Teams
        })
    }

    catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Error',
            err: error
        })
    }
}


const TeamByName = async (req, res=response) => {

    const { Name } = req.params
    try {

        const Teams = await TeamsModel.find({
            Name: {
                $regex: Name,
                $options: 'i'
            }
        })

        if (Teams.length === 0) {
            res.json({
                msg: 'No se encontraron equipos con este nombre'
            })
        }

        else {
            res.json({
                ok: true,
                data: Teams
            })
        }
    }

    catch (error){
        console.log(error)
        res.json({
            ok: false,
            msg: 'Error',
            err: error
        })
    }
}


const DeleteTeam = async (req, res= response) => {

    const Id = req.params.Id
    try {
        const Team = await TeamsModel.findByIdAndDelete(Id)

        if (!Team) {
            res.json({
                ok: false,
                msg: 'No se encontró el Equipo'
            })
        }

        else {
            res.json({
                ok: true,
                msg: "Eqipo eliminado",
                team: Team.Name
            })
        }
    }

    catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Error',
            err: error
        })
    }
}

export {InsertTeam, GetTeams, TeamByName, DeleteTeam}