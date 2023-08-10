export interface Evento {
    _id?: string
    name: string;
    owner: {
        _id: string;
        username: string;
      };
    image: string;
    location: string;
    date: string;
    description: string;
    ticket: boolean;
    ticketPrice: number;
    availableTickets: number;
    category: string;
}