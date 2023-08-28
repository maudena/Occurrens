import User from '../user/user.model.js';
import jwt from 'jsonwebtoken';
import EventService from "./event.service.js"
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EventController{
  
  async newEvent(req, res) {
    try {
      const cookie = req.cookies['jwt'];
      const claims = jwt.verify(cookie, 'secret');
  
      if (!claims) {
        return res.status(401).send({
          message: 'Sin Autorización',
        });
      }
  
      const ownerId = claims._id;
      const evento = {
        name: req.body.name,
        owner: ownerId,
        date: req.body.date,
        location: req.body.location,
        image: req.file ? req.file.filename : '',
        description: req.body.description,
        ticket: req.body.ticket,
        ticketPrice: req.body.ticketPrice,
        availableTickets: req.body.availableTickets,
        category: req.body.category,
        interaction: 0,
      };
  
      const newEvento = await EventService.create(evento);
      const owner = await User.findById(ownerId);
      owner.userEvents.push(newEvento._id);
      await owner.save();
  
      res.status(201).send(newEvento);
    } catch (error) {
      console.log(error);
    }
  }
  
  // READ
  async findAll(req, res) {
    try {
      const evento = await EventService.findAll();
      res.status(200).send(evento);
    } catch (error) {
      console.log(error);
    }
  }
  
  async findById(req, res) {
    const id = req.params.id;
    try {
      const evento = await EventService.findById(id);
      if (evento) {
        evento.interaction = evento.interaction ? evento.interaction + 1 : 1;
        await evento.save();
        res.status(200).send(evento);
      } else {
        res.status(404).send({ message: 'Evento no encontrado' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Error al obtener el evento' });
    }
  }
  
  async findOneForUpdate(req, res) {
    const id = req.params.id;
    try {
      const evento = await EventService.findById(id);
      if (evento) {
        await evento.save();
        res.status(200).send(evento);
      } else {
        res.status(404).send({ message: 'Evento no encontrado' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Error al obtener el evento' });
    }
  }
  
  // FILTRO DE CATEGORIAS
 async findByCategory(req, res){
    const category = req.params.category
    try {
      const eventos = await EventService.findByCategory(category)
      if(category != "music" && category != "learning" && category != "general" && category != "food"){
        res.send({message: "La categoría no existe"})
      }else{
        res.status(200).send(eventos)
      }
    } catch (error) {
      console.log(error);
      res.send({ message: 'No se pudo obtener la categoría' });
    }
  }
  
  // UPDATE
  async updateOne(req, res) {
    try {
      const id = req.params.id;
      const eventoExistente = await EventService.findById(id);
  
      const evento = {
        name: req.body.name,
        date: req.body.date,
        image: req.file ? req.file.filename : '',
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
      const updatedEvento = await EventService.update(id, evento);
  
      //Actualiza el evento correspondiente al usuario
      const owner = await User.findOne({ _id: eventoExistente.owner._id });
      const index = owner.userEvents.findIndex(
        event => event._id.toString() === id.toString()
      );
      if (index !== -1) {
        owner.userEvents[index] = updatedEvento._id;
        await owner.save();
      }
      res.send(updatedEvento);
    } catch (error) {
      console.log(error);
    }
  }
  
  // DELETE
  async deleteOne(req, res) {
    const id = req.params.id;
    try {
      const evento = await EventService.findById(id);
  
      if (!evento) {
        return res.status(404).send({ message: 'Evento no encontrado' });
      }
  
      if (evento.image) {
        const imagePath = path.join(__dirname, '../../public', evento.image);
        fs.unlinkSync(imagePath);
      }
  
      await EventService.delete(id);
  
      // Elimina el evento del array userEvents del usuario
      const owner = await User.findOne({ _id: evento.owner });
      owner.userEvents = owner.userEvents.filter(
        eventId => eventId.toString() !== id
      );
      await owner.save();
  
      res.send({ message: 'Evento eliminado correctamente' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Error al eliminar el evento' });
    }
  }

}

export default new EventController()


