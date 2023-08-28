import eventRepository from "./event.repository.js";

class EventService {
  async findAll() {
    try {
      return await eventRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id) {
    try {
      return await eventRepository.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByCategory(category){
    try {
      return await eventRepository.findByCategory(category)
    } catch (error) {
      throw new Error(error)
    }
  }

  async create(evento) {
    try {
      return await eventRepository.create(evento);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, evento) {
    try {
      return await eventRepository.updateOne(id, evento, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await eventRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new EventService();