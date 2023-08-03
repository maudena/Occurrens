export interface Evento {
    _id?: string
    name: string;
    owner: string;
    image: string;
    location: string;
    date: string;
    description: string;
    ticket: boolean;
    ticketPrice: number;
    availableTickets: number;
    category: string;
}