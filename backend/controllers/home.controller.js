import Evento from "../models/event.js";

export async function getHome(req, res){
    const eventos = await Evento.find().populate("owner").lean();
  
    res.send(eventos);
}