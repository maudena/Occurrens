import Evento from "../models/event.js";

export async function getHome(req, res){
    const eventos = await Evento.find().lean();
  
    res.send(eventos);
}