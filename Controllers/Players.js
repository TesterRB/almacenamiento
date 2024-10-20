import { response } from "express";
import { PlayersModel } from "../Models/Players.js"
import { TeamsModel } from "../Models/Teams.js";

const GetAllPlayers = async(req, res=response) => {
    try {

        const [NumberOfPlayers, Players] = await Promise.all([
            PlayersModel.countDocuments(),
            PlayersModel.find({})
        ])

        res.json({
            ok: true,
            total: NumberOfPlayers,
            data: Players
        })
    }

    catch(error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Error',
            err: error
        })
    }
}

const GetPlayerId = async(req, res=response) => {
    
    const Id = req.params.Id

    try{
        const Player = await PlayersModel.findById(Id)

        if (!Player) {
            res.json({
                ok: false,
                msg: 'No se encontró jugador con este ID'
            })
        }

        else {
            res.json({
                ok: true,
                data: Player
            })
        }
    }

    catch(error){
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Error',
            err: error
        })
    }
}

const PlayersByName = async (req, res=response) => {

    const { Name } = req.params
    try {

        const Players = await PlayersModel.find({
            Name: {
                $regex: Name,
                $options: 'i'
            }
        })

        if (Players.length === 0) {
            res.json({
                msg: 'No se encontraron jugadores con este nombre'
            })
        }

        else {
            res.json({
                ok: true,
                data: Players
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


const GetTeams = async(req, res=response) => {
    const Name = req.params.Name
    const Select = req.params.Select
    
    try{
        let Team_Names = []
        
        const Teams = await TeamsModel.find({
            Name: {
                $regex: Name,
                $options: 'i'
            }
        })

        for (let Team of Teams) {
            Team_Names.push(Team.Name)
        }

        if (Team_Names.length === 0) {
            res.json({
                msg: 'No se encontraron equipos con este nombre'
            })
        }

        else if (Team_Names.length === 1){

            const Team = await TeamsModel.find({
                Name: {
                    $regex: Team_Names[0],
                    $options: 'i'}
            })
            
            const TeamID = Team[0]._id
            
            const Players = await PlayersModel.find({
                "Current Team": TeamID
            })

            res.json({
                ok: true,
                data: Players
            })
        }

        else {
            if (Select === undefined ) {
                res.json({
                    msg: 'Se encontraron varios equipos con este nombre, para elegir uno en especifico, ingrese uno de los nombres a continuación al final de esta ruta con un / previo',
                    equipos: Team_Names
            })}

            else {
                const Team = await TeamsModel.find({
                    Name: {
                        $regex: Select,
                        $options: 'i'}
                })
                
                const TeamID = Team[0]._id
                
                console.log(TeamID)
                
                const Players = await PlayersModel.find({
                    "Current Team": TeamID
                })
    
                res.json({
                    ok: true,
                    data: Players
                })
            }
        }
    }

    catch(error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Error',
            err: error
        })
    }
}


const InsertPlayer = async (req, res = response) => {

    const Body = req.body;
        
        try {
        
            const Player = await PlayersModel.findOne({ Name: Body.Name });
    
            if (Player) {
                return res.json({
                    Ok: false,
                    msg: `El jugador ${Body.Name}, ya existe en la BD`
                });
            }
        
        const New_Player = new PlayersModel(Body);
        await New_Player.save();
        
        res.json({ 
            Ok: true, 
            msg: 'Jugador Insertado', 
            resp: New_Player});
        } 
        
        catch (error) {
            console.log("ERROR:INSERTAR",error);
            res.json({ 
                Ok: false, 
                msg:'Error al Insertar Jugador', 
                resp: error });
            }
    };


const DeletePlayer = async (req, res= response) => {

    const Id = req.params.Id
    try {
        const Player = await PlayersModel.findByIdAndDelete(Id)

        if (!Player) {
            res.json({
                ok: false,
                msg: 'No se encontró el Jugador'
            })
        }

        else {
            res.json({
                ok: true,
                msg: "Jugador eliminado",
                team: Player.Name
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
    

export {GetAllPlayers, GetPlayerId, PlayersByName, GetTeams, InsertPlayer, DeletePlayer}