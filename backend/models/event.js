import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image:{
    type: String
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ticket: {
    type: Boolean,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  availableTickets: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  interaction: {
    type: Number,
  }
});

const Evento = mongoose.model("Evento", eventSchema);

export default Evento;
