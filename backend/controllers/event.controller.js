import User from "../models/user.js";
import jwt from "jsonwebtoken";
import Evento from "../models/event.js";



export async function postNewEvento(req, res) {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return res.status(401).send({
        message: "Sin Autorización",
      });
    }


    const owner = await User.findOne({ _id: claims._id });


    const evento = new Evento({
      name: req.body.name,
      owner: owner.toJSON(),
      date: req.body.date,
      location: req.body.location,
      image: req.file ? req.file.filename : "", // Si hay archivo, asigna el nombre del archivo, de lo contrario, cadena vacía
      description: req.body.description,
      ticket: req.body.ticket,
      ticketPrice: req.body.ticketPrice,
      availableTickets: req.body.availableTickets,
      category: req.body.category,
      interaction: 0
    });
    const newEvento = await evento.save();
    owner.userEvents.push(newEvento);
    await owner.save();
    

    res.send({
      message: "success",
      evento: newEvento,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getEventos(req,res){
  try {
      const evento = await Evento.find().lean();

  res.send(evento);
  } catch (error) {
      console.log(error);
  }
  
}

export async function getEvento(req,res){
  const id = req.params.id
  try {
      const evento = await Evento.findOne({_id: id});
  res.send(evento);
  } catch (error) {
      console.log(error);
  }
  
}

export async function putEvento(req, res){
  try {
    const id = req.params.id
    
    const evento = {
      name: req.body.name,
      date: req.body.date,
      image: req.file ? req.file.filename : "",
      location: req.body.location,
      description: req.body.description,
      ticket: req.body.ticket,
      ticketPrice: req.body.ticketPrice,
      availableTickets: req.body.availableTickets,
      category: req.body.category,
    };
    if (req.file) {
      evento.image = req.file.filename;
    } else {
      // Si no hay una imagen cargada en la solicitud, mantiene la imagen actual sin cambios
      evento.image = eventoExistente.image;
    }
    const updatedEvento = await Evento.findByIdAndUpdate(id, evento, { new: true });
    res.send(updatedEvento)
  } catch (error) {
    console.log(error);
  }
 


}