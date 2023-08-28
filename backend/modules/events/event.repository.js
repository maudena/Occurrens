import Evento from "./event.model.js";

class EventRepository{
    async findAll (){
        return await Evento.find().populate("owner");
    }
    async findById(id){
        return await Evento.findById(id).populate("owner")
    }
    async findByCategory(category){
        return await Evento.find({category: category}).populate("owner")
    }
    async create(evento){
        return await Evento.create(evento)
    }
    async updateOne(id, evento){
        return await Evento.findOneAndUpdate({ _id: id }, evento, {new: true})
    }
    async delete(id){
        return await Evento.deleteOne({_id: id})
    }
}

export default new EventRepository()